#!/usr/bin/env node
/**
 * Kontrola produkčního buildu ve složce dist/.
 *
 * Chytá chyby, které Astro build sám nezachytí, ale na živém webu vypadají
 * špatně: rozbité interní odkazy, chybějící meta tagy, zapomenuté placeholdery.
 *
 * Spouští se přes `npm run check:build`, v CI je to poslední gate před deployem.
 * Bez závislostí — schválně, ať není co udržovat.
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname, posix } from "node:path";

const DIST = "dist";
const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

/** Soubory, které v buildu musí být — jejich absence znamená rozbitou konfiguraci. */
const REQUIRED = [
  "index.html",
  "CNAME", // custom doména pro GitHub Pages
  "robots.txt",
  "sitemap-index.xml",
];

/**
 * Text, který se nikdy nesmí dostat na produkci. Typicky ho tam nechá
 * agent nebo člověk, který nedodal skutečný údaj.
 */
const PLACEHOLDERS = [
  { re: /lorem ipsum/i, label: "lorem ipsum" },
  { re: /\bTODO\b/, label: "TODO" },
  { re: /\bFIXME\b/, label: "FIXME" },
  { re: /\+?420[\s-]?000[\s-]?000[\s-]?000/, label: "placeholder telefon" },
  { re: /\bDOPLNIT\b/i, label: "DOPLNIT" },
  { re: /\bXXXX+\b/, label: "XXXX" },
];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

if (!existsSync(DIST)) {
  console.error(`✖ Složka ${DIST}/ neexistuje — spusť nejdřív \`npm run build\`.`);
  process.exit(1);
}

const allFiles = walk(DIST);
const relative = new Set(
  allFiles.map((f) =>
    f
      .slice(DIST.length + 1)
      .split(/[\\/]/)
      .join("/"),
  ),
);

for (const required of REQUIRED) {
  if (!relative.has(required)) fail(DIST, `chybí povinný soubor ${required}`);
}

/**
 * Přeloží odkaz z HTML na cestu v dist/ a řekne, jestli cíl existuje.
 * Astro generuje adresářové URL (/kontakt/ → kontakt/index.html).
 */
function resolves(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "" || clean === "/") return relative.has("index.html");

  const path = posix.normalize(clean).replace(/^\//, "").replace(/\/$/, "");
  if (path === "" || path.startsWith("..")) return relative.has("index.html");

  return (
    relative.has(path) || // /favicon.svg
    relative.has(`${path}/index.html`) || // /kontakt/
    relative.has(`${path}.html`) // /kontakt
  );
}

const htmlFiles = allFiles.filter((f) => extname(f) === ".html");
if (htmlFiles.length === 0) fail(DIST, "build neobsahuje žádné HTML stránky");

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");

  // --- povinné meta tagy -------------------------------------------------
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) fail(file, "chybí <title>");

  const description = html
    .match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1]
    ?.trim();
  if (!description) fail(file, 'chybí <meta name="description">');

  if (!/<link\s+rel=["']canonical["']/i.test(html)) fail(file, "chybí canonical odkaz");
  if (!/<html[^>]+lang=["']cs["']/i.test(html)) fail(file, 'chybí lang="cs" na <html>');

  // --- interní odkazy ----------------------------------------------------
  // Jen absolutní cesty od kořene; externí, mailto:, tel: a # se přeskakují.
  const refs = [...html.matchAll(/(?:href|src)=["'](\/[^"']*)["']/gi)].map((m) => m[1]);
  for (const ref of new Set(refs)) {
    if (ref.startsWith("//")) continue; // protocol-relative = externí
    if (!resolves(ref)) fail(file, `rozbitý interní odkaz → ${ref}`);
  }

  // --- placeholdery ve viditelném textu ----------------------------------
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
  for (const { re, label } of PLACEHOLDERS) {
    if (re.test(visible)) fail(file, `zapomenutý placeholder: ${label}`);
  }
}

if (errors.length > 0) {
  console.error("✖ Kontrola buildu selhala:\n");
  for (const e of errors) console.error(`  • ${e}`);
  console.error(`\n${errors.length} ${errors.length === 1 ? "problém" : "problémů"}.`);
  process.exit(1);
}

console.log(`✓ Build v pořádku — ${htmlFiles.length} stránek, žádné rozbité odkazy.`);
