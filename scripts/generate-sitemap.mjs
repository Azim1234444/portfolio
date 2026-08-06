/**
 * Writes public/sitemap.xml and public/robots.txt for a given site URL.
 *
 *   node scripts/generate-sitemap.mjs https://your-domain.com
 *
 * Both files need absolute URLs — a sitemap with relative paths is rejected,
 * and a relative `Sitemap:` line in robots.txt is silently ignored. That is why
 * this is a script run at deploy time rather than a file checked in with a
 * guessed domain baked into it.
 *
 * Routes are read from src/data/projects.ts so new projects can't be forgotten.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const raw = process.argv[2];
if (!raw) {
  console.error("Usage: node scripts/generate-sitemap.mjs https://your-domain.com");
  process.exit(1);
}
if (!/^https?:\/\//.test(raw)) {
  console.error(`Site URL must include the scheme, e.g. https://${raw}`);
  process.exit(1);
}
// Trailing slashes would produce "//projects/..." in every entry.
const site = raw.replace(/\/+$/, "");

const source = readFileSync(resolve(root, "src/data/projects.ts"), "utf8");
const slugs = [...source.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

if (slugs.length === 0) {
  console.error("No project slugs found — has the shape of projects.ts changed?");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${site}/`, priority: "1.0", changefreq: "monthly" },
  ...slugs.map((slug) => ({
    loc: `${site}/projects/${slug}`,
    priority: "0.8",
    changefreq: "yearly",
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`;

writeFileSync(resolve(root, "public/sitemap.xml"), sitemap);
writeFileSync(resolve(root, "public/robots.txt"), robots);

console.log(`sitemap.xml — ${urls.length} URLs (1 home + ${slugs.length} projects)`);
urls.forEach((u) => console.log(`  ${u.loc}`));
console.log(`robots.txt  — Sitemap: ${site}/sitemap.xml`);
