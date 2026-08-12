# Deploy, DNS a HTTPS

## Jak deploy funguje

Push do `main` → GitHub Actions → gates → GitHub Pages. Trvá ~2 minuty.
Žádný secret, žádný token, žádná externí služba — Actions používá vestavěný
`GITHUB_TOKEN`, který GitHub vydává automaticky pro každý běh.

Průběh se dá sledovat v repozitáři v záložce **Actions**.

Rollback: `git revert <commit>` a push. Historie repa je historie webu.

---

## Jednorázové nastavení

Tyhle kroky se dělají **jednou** a klikají se ručně — přes API je nastavit nejde
bez osobního tokenu, který v tomhle projektu záměrně žádný není.

### 1. GitHub Pages zapnout

Repozitář → **Settings** → **Pages**:

- **Source:** `GitHub Actions` (ne „Deploy from a branch")

Dokud tohle není nastavené, build projde, ale deploy job spadne
s chybou o nepovolených Pages.

### 2. DNS na Wedosu

Doména `svobol.cz` běží na nameserverech Wedosu (`ns.wedos.com` a spol.).
V administraci Wedosu → DNS → záznamy pro `svobol.cz`:

| Typ   | Název | Hodnota                      | TTL  |
| ----- | ----- | ---------------------------- | ---- |
| A     | `@`   | `185.199.108.153`            | 3600 |
| A     | `@`   | `185.199.109.153`            | 3600 |
| A     | `@`   | `185.199.110.153`            | 3600 |
| A     | `@`   | `185.199.111.153`            | 3600 |
| AAAA  | `@`   | `2606:50c0:8000::153`        | 3600 |
| AAAA  | `@`   | `2606:50c0:8001::153`        | 3600 |
| AAAA  | `@`   | `2606:50c0:8002::153`        | 3600 |
| AAAA  | `@`   | `2606:50c0:8003::153`        | 3600 |
| CNAME | `www` | `jesikasvobodova.github.io.` | 3600 |

Všechny čtyři A záznamy (i AAAA) tam patří — GitHub tak dělá load balancing.
U CNAME nesmí chybět koncová tečka, pokud ji Wedos vyžaduje.

Ověření z příkazové řádky:

```bash
dig +short svobol.cz A
dig +short www.svobol.cz CNAME
```

### 3. Custom doména v GitHubu

Repozitář → **Settings** → **Pages** → **Custom domain**: `svobol.cz` → **Save**.

GitHub ověří DNS (může trvat pár minut) a pak sám vystaví Let's Encrypt
certifikát. Až se objeví zaškrtávátko **Enforce HTTPS**, zapnout ho.

> `public/CNAME` v repu obsahuje `svobol.cz` a při každém buildu se kopíruje
> do `dist/`. Kdyby se smazal, GitHub by custom doménu při dalším deployi
> zahodil. Proto se needituje.

**Apex vs. www:** kanonická je `svobol.cz` (bez www). Když je `www` CNAME
nastavené podle tabulky výše, GitHub Pages přesměruje `www.svobol.cz` →
`svobol.cz` automaticky. Nic dalšího se nenastavuje.

### 4. Ochrana větve `main` (doporučeno)

Repozitář → **Settings** → **Rules** → **Rulesets** → **New branch ruleset**:

- Target: `main`
- ✅ **Require a pull request before merging**
- ✅ **Require status checks to pass** → přidat `Secret scan`
  a `Verify (format, types, build, checks)`

Tím se z gates stane skutečná zeď — bez zelené CI nejde merge zmáčknout.
Bez tohohle kroku kontroly běží a svítí, ale merge se dá protlačit i červený.

---

## Co GitHub Pages neumí

Poctivě, ať to nepřekvapí později:

- **Vlastní HTTP hlavičky.** `Content-Security-Policy`, `X-Frame-Options`
  a spol. nastavit nejdou. Soubor `public/_headers` v repu je proto na GitHub
  Pages **neúčinný** — leží tam připravený pro případný přesun na Cloudflare
  Pages nebo Netlify, kde by fungoval.
- **Náhledy pull requestů.** Nasazuje se jen `main`. Build z PR se dá stáhnout
  v Actions → poslední run → artifact `dist-…`, rozbalit a otevřít lokálně.
- **Serverová logika.** Formuláře, které někam posílají data, potřebují externí
  službu. Než se nějaká přidá, stojí za to zvážit prostý `mailto:` odkaz —
  nemá závislost, nemá secret a nemá GDPR agendu.

---

## Když se něco pokazí

| Příznak                            | Příčina                                             | Řešení                                                     |
| ---------------------------------- | --------------------------------------------------- | ---------------------------------------------------------- |
| Deploy job: „Pages is not enabled" | nedokončený krok 1                                  | Settings → Pages → Source: GitHub Actions                  |
| Web hlásí neplatný certifikát      | GitHub ještě nevydal cert                           | počkat (i desítky minut), pak zapnout Enforce HTTPS        |
| Nekonečné přesměrování             | custom doména v GitHubu nesouhlasí s `public/CNAME` | srovnat obě hodnoty na `svobol.cz`                         |
| 404 na celém webu                  | chybí custom doména nebo špatné DNS                 | zkontrolovat krok 2 a 3                                    |
| CI červená na „Secret scan"        | v souborech nebo historii je klíč                   | secret **zneplatnit u vydavatele**, pak teprve čistit repo |
| CI červená na „Repo hygiene"       | do gitu se dostal soubor, co tam nepatří            | `git rm --cached <soubor>` a doplnit `.gitignore`          |
