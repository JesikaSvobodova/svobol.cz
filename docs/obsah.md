# Práce s obsahem

Určeno agentovi. Zadavatel obsah nepíše do souborů — popíše ho větou
a agent podle téhle stránky provede změnu.

## Zlaté pravidlo

**Texty patří do `src/data/site.ts`, ne do šablon.** Když se text objeví
natvrdo v `.astro` souboru, příště ho tam nikdo nenajde.

Výjimka: delší souvislý text konkrétní stránky (odstavce článku) může být
přímo ve své `.astro` stránce. Krátké texty, které se opakují nebo se mění
často — název, kontakty, nadpisy, popisky — vždy do `site.ts`.

---

## Změna textu

Otevřít `src/data/site.ts`, najít pole, změnit hodnotu, `npm run verify`.

Pole `contact.email` a `contact.phone` mohou zůstat prázdná — patička
prázdné hodnoty nevykreslí. **Nikdy je nevyplňuj vymyšleným údajem.**

---

## Nová stránka

1. Vytvořit `src/pages/nazev.astro`:

   ```astro
   ---
   import BaseLayout from "@/layouts/BaseLayout.astro";
   ---

   <BaseLayout
     title="Kontakt — svobol.cz"
     description="Kontaktní údaje. Zobrazí se ve výsledcích vyhledávání."
   >
     <section class="container-narrow py-16">
       <h1 class="mb-6 text-4xl">Kontakt</h1>
       <p class="text-text-muted">Text stránky.</p>
     </section>
   </BaseLayout>
   ```

2. Přidat do navigace v `src/data/site.ts`:

   ```ts
   nav: [{ label: "Kontakt", href: "/kontakt" }],
   ```

3. `npm run verify`

Název souboru = adresa. `kontakt.astro` → `svobol.cz/kontakt`.

`title` i `description` jsou povinné — bez nich `check:build` shodí build.
Description piš jako větu pro člověka ve vyhledávači, ideálně 120–160 znaků.

---

## Hotové třídy

Definované v `src/styles/global.css`, používej je místo vymýšlení nových:

| Třída              | K čemu                          |
| ------------------ | ------------------------------- |
| `container-narrow` | úzký sloupec textu (max 768 px) |
| `container-wide`   | široký obsah (max 1152 px)      |
| `btn-primary`      | hlavní tlačítko                 |
| `btn-outline`      | vedlejší tlačítko               |

Barvy přes Tailwind třídy `text-brand`, `bg-brand-dark`, `text-text-muted`,
`border-surface-border` atd. **Nepiš hex kódy do šablon** — barvy jsou CSS
proměnné v `global.css` a mění se na jednom místě.

---

## Obrázky

1. Soubor do `public/images/`.
2. V šabloně `<img src="/images/nazev.webp" alt="Popis" width="800" height="600" />`.

Pravidla:

- **WebP**, ne JPG/PNG, pokud není důvod. Menší při stejné kvalitě.
- **Limit 5 MB** na soubor hlídá `check:repo`. Reálně by fotka na web měla mít
  spíš stovky kilobajtů — před nahráním zmenšit.
- **`alt` je povinný** pro čtečky i pro vyhledávače. Popisuj, co na obrázku je.
- **`width` a `height`** vždy, jinak stránka při načítání poskakuje.

---

## Blog (zatím není)

Web zatím žádný blog nemá. Až bude potřeba, přidávají se Astro content
collections — Markdown soubory s frontmatterem validovaným schématem:

1. `src/content.config.ts` se schématem článku (zod)
2. `src/content/blog/*.md` — jednotlivé články
3. `src/pages/blog/index.astro` — výpis
4. `src/pages/blog/[...slug].astro` — detail článku

Výhoda schématu: článek s chybějícím nadpisem nebo špatným datem shodí build,
místo aby se rozbil na webu. Nezakládej to dopředu — až bude první článek.

---

## Čeho se držet u textů

- Česky, s diakritikou. České uvozovky „takhle".
- Krátké věty. Zadavatelův obor, ne marketingová vata.
- Žádná tvrzení, která nemáš od zadavatele: certifikace, počty zakázek,
  reference, záruky, IČO, adresy. Když údaj chybí, **zeptej se**.
  Vymyšlený údaj na webu firmy je horší než chybějící údaj.
