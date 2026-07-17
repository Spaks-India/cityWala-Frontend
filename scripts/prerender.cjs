// Prerenders a bounded set of high-value crawlable routes (static pages +
// category pages) to static HTML snapshots after the SPA build, so
// non-JS crawlers and social-link-preview scrapers (which don't execute
// client-side JS) see real per-page <title>/meta/OG/JSON-LD instead of the
// generic index.html shell.
//
// Deliberately scoped to static + category pages only (not the full business
// catalog) to keep build time/size bounded on Vercel — see project SEO
// implementation notes. Business detail pages remain client-rendered only;
// Google's own crawler still indexes them via JS rendering, but link
// previews on those specific URLs stay generic until a real SSR migration.
//
// How it works: serves the built dist/ with `vite preview`, visits each
// route with headless Chromium, waits for react-helmet-async's tags to
// commit to <head>, then writes the fully-rendered HTML to
// dist/<route>/index.html. Vercel's static file serving resolves an exact
// path match (e.g. /about-us/index.html) before falling back to the SPA
// rewrite, so crawlers get the snapshot while real users still get the
// normal SPA (React hydrates on top of the prerendered markup transparently).

const fs = require("fs-extra");
const path = require("path");
const { preview } = require("vite");
const axios = require("axios");

const DIST_DIR = path.resolve(__dirname, "../dist");
const API_BASE =
  process.env.VITE_API_URL?.replace(/\/+$/, "").replace(/\/api$/, "") ||
  "http://localhost:5000";
const API_URL = `${API_BASE}/api`;

const STATIC_ROUTES = [
  "/",
  "/about-us",
  "/contact-us",
  "/privacy-policy",
  "/terms-and-conditions",
];

async function fetchCategoryRoutes() {
  try {
    const res = await axios.get(`${API_URL}/categories`, { timeout: 10000 });
    const categories = res.data?.categories || res.data || [];
    if (!Array.isArray(categories) || categories.length === 0) return [];

    const byId = new Map(categories.map((c) => [String(c._id), c]));
    const pathFor = (cat, seen = new Set()) => {
      const id = String(cat._id);
      if (seen.has(id)) return [cat.slug];
      seen.add(id);
      const parentId = cat.parentId ? String(cat.parentId?._id || cat.parentId) : null;
      const parent = parentId ? byId.get(parentId) : null;
      if (!parent) return [cat.slug];
      return [...pathFor(parent, seen), cat.slug];
    };

    return categories
      .filter((c) => c.slug)
      .map((cat) => `/categories/${pathFor(cat).filter(Boolean).join("/")}`);
  } catch (err) {
    console.warn(
      `[prerender] Could not fetch categories (${err.message}). Skipping category page prerendering.`
    );
    return [];
  }
}

async function writeSnapshot(route, html) {
  const routePath = route === "/" ? "/" : route.replace(/\/+$/, "");
  const outDir =
    routePath === "/" ? DIST_DIR : path.join(DIST_DIR, routePath);
  await fs.ensureDir(outDir);
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
}

async function main() {
  if (!(await fs.pathExists(DIST_DIR))) {
    console.warn("[prerender] dist/ not found — run `vite build` first. Skipping.");
    return;
  }

  // puppeteer is ESM-only (no CJS export); load it dynamically since this
  // script must stay .cjs to opt out of the package's "type": "module".
  const { default: puppeteer } = await import("puppeteer");

  const categoryRoutes = await fetchCategoryRoutes();
  const routes = [...STATIC_ROUTES, ...categoryRoutes];

  const server = await preview({ preview: { port: 4174, host: "127.0.0.1" } });
  const baseUrl = server.resolvedUrls.local[0].replace(/\/+$/, "");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let succeeded = 0;
  try {
    const page = await browser.newPage();
    for (const route of routes) {
      try {
        await page.goto(`${baseUrl}${route}`, {
          waitUntil: "networkidle0",
          timeout: 30000,
        });
        // react-helmet-async commits head tags synchronously on render, but
        // give in-flight data fetches (category name/description) a beat to
        // resolve so the snapshot has real content, not just the loading state.
        await new Promise((resolve) => setTimeout(resolve, 800));
        const html = await page.content();
        await writeSnapshot(route, html);
        succeeded++;
      } catch (err) {
        console.warn(`[prerender] Failed to prerender ${route}: ${err.message}`);
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }

  console.log(`[prerender] Prerendered ${succeeded}/${routes.length} routes.`);
}

main().catch((err) => {
  console.error("[prerender] Unexpected failure:", err);
  // A missing prerender snapshot degrades gracefully to the normal SPA
  // shell — never worth failing the whole deploy over.
  process.exit(0);
});
