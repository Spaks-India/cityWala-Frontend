const fs = require("fs-extra");
const glob = require("glob");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const translations = {};

function createKey(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 50);
}

const files = glob.sync("src/**/*.{js,jsx,ts,tsx}");

files.forEach((file) => {
  const code = fs.readFileSync(file, "utf8");

  let ast;

  try {
    ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
    });
  } catch (err) {
    console.log("Parse error:", file);
    return;
  }

  traverse(ast, {
    JSXText(path) {
      const text = path.node.value.trim();

      if (
        text &&
        text.length > 2 &&
        /[a-zA-Z]/.test(text)
      ) {
        const key = createKey(text);

        if (!translations[key]) {
          translations[key] = text;
        }
      }
    },
  });
});

fs.writeJsonSync(
  "./src/i18n/en.json",
  translations,
  { spaces: 2 }
);

console.log("✅ en.json generated successfully");