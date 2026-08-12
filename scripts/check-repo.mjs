#!/usr/bin/env node
/**
 * Hygiena repozitáře — kontroluje, co je *zaverzované v gitu*.
 *
 * Doplňuje gitleaks: ten hledá secrets podle obsahu, tohle hlídá, že se do
 * repa nedostal soubor, který tam nepatří, ať už uvnitř něco je nebo ne
 * (soukromé klíče, .env, build artefakty, obří binárky).
 *
 * Spouští se přes `npm run check:repo`. Bez závislostí.
 */

import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB — nad tím patří soubor jinam než do gitu

/** Cesty, které v repu nemají co dělat. */
const FORBIDDEN = [
  { re: /(^|\/)\.env($|\.)(?!example)/i, why: "soubor s proměnnými prostředí" },
  { re: /(^|\/)(id_rsa|id_ed25519|id_ecdsa|id_dsa)(\.pub)?$/i, why: "SSH klíč" },
  { re: /\.(pem|key|p12|pfx|jks|keystore|ppk)$/i, why: "privátní klíč nebo certifikát" },
  { re: /(^|\/)(credentials|secrets?)(\.|\/|$)/i, why: "soubor s přístupovými údaji" },
  { re: /\.(sqlite3?|db|mdb)$/i, why: "databázový soubor" },
  { re: /(^|\/)(node_modules|dist|\.astro)\//, why: "generovaný obsah (patří do .gitignore)" },
  { re: /(^|\/)\.DS_Store$/, why: "systémový smetí soubor" },
  { re: /(^|\/)(private|soukrome)\//i, why: "soukromá složka" },
  { re: /\.(zip|tar|tar\.gz|tgz|rar|7z)$/i, why: "archiv" },
];

const errors = [];

let tracked;
try {
  tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
    .split("\0")
    .filter(Boolean);
} catch {
  console.error("✖ Nepodařilo se přečíst seznam souborů z gitu (jsi v git repu?).");
  process.exit(1);
}

for (const file of tracked) {
  for (const { re, why } of FORBIDDEN) {
    if (re.test(file)) errors.push(`${file} — ${why}`);
  }

  // Soubor může být v indexu, ale chybět na disku (např. při rebase). Přeskoč.
  let size;
  try {
    size = statSync(file).size;
  } catch {
    continue;
  }
  if (size > MAX_FILE_BYTES) {
    const mb = (size / 1024 / 1024).toFixed(1);
    errors.push(`${file} — ${mb} MB, překračuje limit 5 MB`);
  }
}

// .gitignore musí pokrývat základ, jinak je jen otázka času, kdy něco proteče.
const REQUIRED_IGNORES = ["node_modules", "dist", ".env"];
try {
  const gitignore = readFileSync(".gitignore", "utf8");
  for (const entry of REQUIRED_IGNORES) {
    if (!gitignore.includes(entry)) {
      errors.push(`.gitignore — chybí pravidlo pro ${entry}`);
    }
  }
} catch {
  errors.push(".gitignore — chybí");
}

if (errors.length > 0) {
  console.error("✖ Kontrola repozitáře selhala:\n");
  for (const e of errors) console.error(`  • ${e}`);
  console.error("\nTyhle soubory se nesmí dostat do gitu. Odstraň je z indexu");
  console.error("(`git rm --cached <soubor>`) a přidej je do .gitignore.");
  process.exit(1);
}

console.log(`✓ Repozitář čistý — ${tracked.length} souborů, nic podezřelého.`);
