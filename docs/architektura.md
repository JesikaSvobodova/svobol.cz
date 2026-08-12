# Architektura

## Princip

Web je **statický**. Build vyrobí složku `dist/` s hotovým HTML, CSS a pár
kilobajty JS — a to je celý produkt. Žádný server, žádná databáze, žádný
runtime, který by mohl spadnout nebo se dal hacknout.

Tohle je záměrná volba, ne úspora. Plyne z ní všechno ostatní:

- **Není co provozovat.** Nic se neaktualizuje, nic nemá bezpečnostní záplaty,
  nic neběží 24/7. Statické soubory na CDN prostě fungují.
- **Není co ukrást.** V repu ani v běhu nejsou žádná tajemství, protože žádná
  nejsou potřeba. Deploy jede na vestavěném `GITHUB_TOKEN` GitHub Actions.
- **Rollback je `git revert`.** Historie repa = historie webu, 1:1.
- **Je to zdarma.** GitHub Pages pro veřejný repozitář nic nestojí.

## Tok změny

```
Claude web klient  →  větev + pull request
                          ↓
                   GitHub Actions
                   ├─ Secret scan (gitleaks)
                   └─ Verify (format → types → build → checks)
                          ↓
                    merge do main
                          ↓
                   GitHub Pages  →  https://svobol.cz
```

Deploy job má `needs: [secrets, verify]`. Když kterákoli gate spadne,
nenasadí se nic — nejde to obejít jinak než úpravou workflow.

## Vrstvy

| Vrstva    | Nástroj             | Proč zrovna tenhle                                                                                                |
| --------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Generátor | Astro 5             | Ve výchozím stavu posílá **nula JS**. Komponenty jsou obyčejné HTML se skriptovací částí.                         |
| Styly     | Tailwind CSS 3      | Utility třídy přímo v šabloně; agent nemusí skákat mezi soubory a vymýšlet názvy tříd.                            |
| Barvy     | CSS proměnné        | Definované jednou v `src/styles/global.css`, Tailwind na ně jen odkazuje. Přebarvení webu = změna několika řádků. |
| Obsah     | `src/data/site.ts`  | Texty odděleně od šablon. `as const` dělá z překlepu chybu při `npm run check`.                                   |
| Typy      | TypeScript (strict) | Chyba spadne v CI, ne na produkci.                                                                                |

## Proč obsah v `.ts` a ne v CMS

CMS by znamenal účet, přihlášení, databázi, zálohy a další věc, která umí
rozbít se. Zadavatel obsah needituje ručně — píše ho agentovi větou a agent
sáhne do `site.ts`. Textový soubor v gitu má navíc verzování a review zdarma.

Až bude potřeba blog nebo delší texty, přijdou Astro content collections
(Markdown + validace schématem). Viz [obsah.md](obsah.md).

## Co v repu záměrně není

- **Žádné secrets ani GitHub Secrets.** Deploy je nepotřebuje. Kdyby je někdy
  potřeboval, je něco špatně v návrhu, ne v konfiguraci.
- **Žádné externí volání.** Web nenačítá cizí fonty, CDN, analytiku ani
  trackery. Nula požadavků na cizí doménu znamená rychlé načtení, žádnou
  cookie lištu a žádný GDPR problém.
- **Žádný build cache trik ani generovaný obsah v gitu.** `dist/` a `.astro/`
  jsou v `.gitignore` a `check:repo` hlídá, že se tam nedostanou.

## Kontrolní skripty

Oba jsou v `scripts/`, bez závislostí, čistý Node.

- `check-build.mjs` — projde vygenerované HTML: rozbité interní odkazy,
  chybějící `<title>` / meta description / canonical / `lang="cs"`,
  zapomenuté placeholdery (`TODO`, `lorem ipsum`, fiktivní telefon).
- `check-repo.mjs` — projde `git ls-files`: soubory, které do repa nepatří
  (`.env`, klíče, databáze, archivy), soubory nad 5 MB, generovaný obsah,
  chybějící pravidla v `.gitignore`.

Záměrně bez npm balíčků — jsou to gates, mají být nudné a nerozbitné.
