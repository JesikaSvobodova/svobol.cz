# svobol.cz

Statický web na doméně [svobol.cz](https://svobol.cz).

**Repozitář spravuje AI agent.** Změny se zadávají v přirozeném jazyce přes
Claude web klienta — agent je naprogramuje, otevře pull request a po zelené
kontrole se merge do `main` sám nasadí. Ručně se tu needituje nic.

|         |                                    |
| ------- | ---------------------------------- |
| Stack   | Astro 5 (static) + Tailwind CSS 3  |
| Hosting | GitHub Pages                       |
| Deploy  | GitHub Actions, push do `main`     |
| Backend | žádný — čisté statické HTML/CSS/JS |

---

## Jak zadat změnu (běžný postup)

1. Otevřít [claude.ai/code](https://claude.ai/code) a vybrat tento repozitář.
2. Napsat, co se má změnit. Česky, normální větou:
   > „Přidej stránku Kontakt s e-mailem a telefonem."
3. Agent vytvoří větev a pull request.
4. Zkontrolovat, že u PR svítí zelená (proběhly všechny kontroly).
5. Stisknout **Merge**.
6. Za ~2 minuty je změna na webu.

Když je něco špatně, řekni to agentovi v tom samém vlákně. Když je potřeba
vrátit už nasazenou změnu: `git revert` — nebo prostě požádat agenta.

---

## Lokální vývoj

```bash
npm ci            # instalace závislostí
npm run dev       # dev server → http://localhost:4321
npm run build     # produkční build → dist/
npm run preview   # náhled produkčního buildu
npm run verify    # všechny kontroly (musí projít před commitem)
```

Potřebuje Node.js 22+ (verze je v `.nvmrc`).

---

## Kontroly (gates)

Nic se nedostane na produkci, dokud tohle všechno neprojde. Běží lokálně přes
`npm run verify` i automaticky v CI u každého pull requestu:

| Kontrola                    | Co hlídá                                                                                            |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| **Secret scan** (gitleaks)  | klíče, tokeny a hesla v souborech i v historii commitů                                              |
| **Repo hygiene**            | `.env`, privátní klíče, databáze, archivy, soubory nad 5 MB, generovaný obsah v gitu                |
| **Format check** (Prettier) | jednotné formátování                                                                                |
| **Astro check**             | typové chyby a chyby v šablonách                                                                    |
| **Build**                   | že se web vůbec sestaví                                                                             |
| **Build output check**      | rozbité interní odkazy, chybějící `<title>` / meta description / canonical, zapomenuté placeholdery |

Deploy job má `needs: [secrets, verify]` — červená kontrola znamená,
že se nenasadí vůbec nic.

---

## Struktura

```
├── CLAUDE.md               # instrukce pro AI agenta (zdroj pravdy)
├── docs/                   # architektura, deploy, DNS, práce s obsahem
├── public/                 # statické soubory (favicon, CNAME, robots.txt)
├── scripts/                # kontrolní skripty pro gates
├── src/
│   ├── components/         # Header, Footer
│   ├── data/site.ts        # ⬅ veškerý editovatelný obsah a nastavení
│   ├── layouts/            # BaseLayout (<head>, meta tagy)
│   ├── pages/              # stránky = routy
│   └── styles/global.css   # barvy a typografie (CSS proměnné)
└── .github/workflows/      # CI a deploy
```

Texty se mění v `src/data/site.ts`, ne v šablonách.

---

## Dokumentace

| Dokument                                     | Popis                                       |
| -------------------------------------------- | ------------------------------------------- |
| [CLAUDE.md](CLAUDE.md)                       | Pravidla pro AI agenta — co smí a nesmí     |
| [docs/architektura.md](docs/architektura.md) | Jak je web postavený a proč                 |
| [docs/deploy-a-dns.md](docs/deploy-a-dns.md) | GitHub Pages, DNS na Wedosu, HTTPS          |
| [docs/obsah.md](docs/obsah.md)               | Jak přidat stránku, text, obrázek nebo blog |

---

## Bezpečnost

Repozitář neobsahuje a nesmí obsahovat žádné tajemství — deploy na GitHub Pages
funguje na vestavěném `GITHUB_TOKEN` a nepotřebuje ani jeden nastavený secret.
Kdyby se v budoucnu objevil požadavek přidat službu vyžadující API klíč, je to
signál k zastavení a rozmyšlení, ne k jeho nahrání do repa.
