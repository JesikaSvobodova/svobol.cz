/**
 * Centrální konfigurace webu svobol.cz.
 *
 * Tohle je jediné místo, kde se mění texty, kontakty a navigace.
 * Šablony v src/pages a src/components z toho jen čtou — needituj texty tam.
 *
 * `as const` je záměrné: drží typy úzké, takže překlep v názvu pole
 * spadne už při `npm run check`, ne až na produkci.
 */

export const site = {
  /** Krátký název, používá se v hlavičce a v OG tagu og:site_name. */
  name: "svobol.cz",

  /** Výchozí <title>. Jednotlivé stránky si ho můžou přebít. */
  title: "svobol.cz",

  /** Výchozí meta description. Ideálně 120–160 znaků. */
  description: "Připravujeme nový web svobol.cz.",

  /**
   * Kanonická adresa webu. Musí sedět s `site` v astro.config.mjs
   * a s obsahem public/CNAME — jinak se rozbijí odkazy, sitemap i HTTPS.
   */
  url: "https://svobol.cz",

  locale: "cs_CZ",

  /**
   * Kontakty. Vyplň skutečnými údaji, nebo pole nech prázdné —
   * prázdné se na webu nevykreslí. Nikdy sem nepiš vymyšlené hodnoty.
   *
   * `as string` je nutné: bez něj by `as const` zúžilo prázdnou hodnotu
   * na literál `""` a podmínka `{phone && …}` v patičce by měla typ `never`.
   */
  contact: {
    email: "" as string,
    phone: "" as string,
  },

  /** Položky hlavní navigace. Cesta musí odpovídat souboru v src/pages/. */
  nav: [] as ReadonlyArray<{ label: string; href: string }>,

  /** Obsah homepage. */
  home: {
    headline: "svobol.cz",
    subheadline: "Web se připravuje.",
  },
} as const;
