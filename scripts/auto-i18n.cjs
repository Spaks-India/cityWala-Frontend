const fs = require("fs");
const glob = require("glob");

const files = glob.sync("src/**/*.{js,jsx}");

function makeKey(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, "")
    .trim()
    .replace(/\s+/g, "_");
}

function isCommentLine(line) {
  const trimmed = line.trim();
  return trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*");
}

function replaceJsxText(code) {
  let changed = false;

  // Only replace plain JSX text nodes, never arrow functions (=>) or comparisons (>=).
  const updated = code.replace(
    /(?<![=-])>\s*([A-Za-z][A-Za-z0-9\s.,!?'"()-]{2,}?)\s*<\//g,
    (match, text) => {
      const clean = text.trim();
      if (!clean || clean.includes("{") || clean.includes("}")) {
        return match;
      }

      changed = true;
      return `>{t("${makeKey(clean)}")}</`;
    }
  );

  return { code: updated, changed };
}

files.forEach((file) => {
  let code = fs.readFileSync(file, "utf8");

  if (code.includes("useTranslation")) {
    return;
  }

  const lines = code.split("\n");
  const safeLines = lines.map((line) =>
    isCommentLine(line) ? line.replace(/>/g, "\uFF1E") : line
  );
  code = safeLines.join("\n").replace(/\uFF1E/g, ">");

  let { code: updatedCode, changed } = replaceJsxText(code);

  if (!changed) {
    return;
  }

  updatedCode =
    `import { useTranslation } from "react-i18next";\n` + updatedCode;

  updatedCode = updatedCode.replace(
    /export default function\s+\w+\s*\([^)]*\)\s*{/,
    (match) => `${match}\n  const { t } = useTranslation();`
  );

  updatedCode = updatedCode.replace(
    /(?:const|function)\s+(\w+)\s*=\s*(?:\([^)]*\)|)\s*=>\s*{/,
    (match) => `${match}\n  const { t } = useTranslation();`
  );

  fs.writeFileSync(file, updatedCode);
  console.log(`✅ Updated: ${file}`);
});

console.log("🔥 Auto i18n completed");
