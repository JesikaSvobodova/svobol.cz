# CLAUDE.md — instrukce pro AI agenta

Tento repozitář spravuje **výhradně AI agent**. Člověk zadává změny v přirozeném
jazyce přes Claude web klienta; agent je implementuje, otevře PR a po zelené CI
se merge do `main` automaticky nasadí. Tento soubor je zdroj pravdy o tom,
co smíš a nesmíš.

---

## 1. Co to je

|                  |                                                |
| ---------------- | ---------------------------------------------- |
| **Web**          | https://svobol.cz                              |
| **Stack**        | Astro 7 (static) + Tailwind CSS 4              |
| **Hosting**      | GitHub Pages, deploy přes GitHub Actions       |
| **Backend**      | žádný — výstupem je čisté statické HTML/CSS/JS |
| **Jazyk obsahu** | čeština (`lang="cs"`)                          |

Repozitář nemá databázi, server, runtime ani žádné tajemství. Pokud tě nějaké
zadání tlačí k tomu, abys některou z těchto věcí přidal, **nedělej to a zeptej se.**

---

## 2. Příkazy

```bash
npm ci            # instalace přesně podle package-lock.json
npm run dev       # dev server na http://localhost:4321
npm run build     # produkční build → dist/
npm run preview   # náhled produkčního buildu
npm run verify    # ⬅ VŠECHNY GATES. Musí projít před každým commitem.
```

`npm run verify` spouští v tomto pořadí:

1. `format:check` — Prettier
2. `check` — `astro check` (typy, nepoužité importy, chyby v šablonách)
3. `build` — produkční build
4. `check:build` — kontrola výstupu (rozbité odkazy, chybějící meta tagy, placeholdery)
5. `check:repo` — hygiena repa (žádné secrets, žádné velké soubory, nic nechtěného v gitu)

**Definice hotového: `npm run verify` skončí s exit code 0.** Nic jiného
neplatí za hotové. Nehlas úspěch, dokud jsi verify neviděl projít.

---

## 3. Tvrdá pravidla

**NIKDY:**

- Necommituj secrets — API klíče, tokeny, hesla, privátní klíče, `.env` soubory,
  přístupové údaje, interní e-maily, osobní údaje třetích stran. CI to zachytí
  (gitleaks + `check:repo`), ale spoléhat se na to není omluva.
- Needituj `dist/` ani `.astro/` — jsou generované a v `.gitignore`.
- Nepřidávej žádnou službu, která potřebuje secret v repu nebo v GitHub Secrets.
  Když deploy potřebuje token, je to špatný deploy — tenhle web ho nepotřebuje.
- Nepřidávej externí skripty, fonty, CDN ani trackery bez výslovného zadání.
  Web sahá na **jedinou** cizí doménu — vlastní Umami na
  `analytics.svobol.com` (konfigurace v `src/data/site.ts` → `analytics`,
  vloženo v `BaseLayout.astro`). Nic dalšího tam přibýt nesmí; test
  `tests/analytics.spec.ts` to hlídá a spadne, když přibude druhý origin.
  Umami nepoužívá cookies ani nic nezapisuje do zařízení návštěvníka, proto
  web nemá a nepotřebuje cookie lištu. Nepřidávej ji.
- Nevymýšlej si fakta o firmě — IČO, adresy, telefony, certifikace, reference,
  počty zakázek. Když údaj nemáš, nech placeholder a **zeptej se**. Vymyšlený
  údaj na živém webu je horší než chybějící.
- Neměň `public/CNAME`, `astro.config.mjs → site` ani DNS bez zadání. Rozbije to
  doménu i HTTPS certifikát.

**VŽDY:**

- Obsah patří do `src/data/*.ts`, ne do šablon. Když měníš text, hledej ho
  nejdřív tam.
- Před commitem `npm run verify`.
- Pracuj na větvi. Push do `main` je povolený (viz `.claude/settings.json`),
  ale až po zeleném `npm run verify` — v `main` končí jen ověřená práce.
  Force push a mazání větví povolené nejsou.
- Česky, s diakritikou, ve výstupním obsahu i v commit zprávách.

---

## 4. Kde co je

| Chci změnit                           | Soubor                                                         |
| ------------------------------------- | -------------------------------------------------------------- |
| Název webu, popis, kontakty, navigace | `src/data/site.ts`                                             |
| Texty na homepage                     | `src/data/site.ts` → sekce `home`                              |
| Strukturu homepage                    | `src/pages/index.astro`                                        |
| Novou stránku                         | nový soubor `src/pages/nazev.astro` + položka v `site.nav`     |
| Hlavičku / patičku                    | `src/components/Header.astro`, `Footer.astro`                  |
| Barvy, typografii                     | `src/styles/global.css` (CSS proměnné) + `tailwind.config.mjs` |
| `<head>`, meta tagy, OG               | `src/layouts/BaseLayout.astro`                                 |
| Statické soubory (obrázky, favicon)   | `public/`                                                      |
| Analytiku (Umami)                     | `src/data/site.ts` → `analytics`                               |
| CI a deploy                           | `.github/workflows/deploy.yml`                                 |

Barvy se definují **jednou** jako CSS proměnné v `src/styles/global.css` a
Tailwind na ně jen odkazuje. Needituj hex kódy v šablonách.

---

## 5. Jak přidat stránku

1. `src/pages/nazev.astro`:
   ```astro
   ---
   import BaseLayout from "@/layouts/BaseLayout.astro";
   ---

   <BaseLayout title="Název — svobol.cz" description="Popis pro vyhledávače.">
     <section class="container-narrow py-16">
       <h1>Nadpis</h1>
     </section>
   </BaseLayout>
   ```
2. Přidej do `site.nav` v `src/data/site.ts`, ať je stránka dostupná z menu.
3. `npm run verify`.

`title` i `description` jsou povinné — `check:build` build shodí, když chybí.

---

## 6. Deploy

Push do `main` → GitHub Actions → gates → GitHub Pages. Trvá ~2 minuty.
Rollback = `git revert` a push; jiná cesta zpět není a není potřeba.

Detaily včetně DNS: [docs/deploy-a-dns.md](docs/deploy-a-dns.md).

---

## 7. Když si nejsi jistý

Zeptej se. Zadavatel není programátor — očekává, že technická rozhodnutí
uděláš ty, ale **fakta o firmě a obsahové rozhodnutí patří jemu.** Raději jedna
otázka navíc než vymyšlený údaj na produkci.
