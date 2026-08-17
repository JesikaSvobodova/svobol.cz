import { test as base, expect } from "@playwright/test";

/** Origin měřicí instance. Musí sedět se `site.analytics.scriptUrl`. */
export const ANALYTICS_ORIGIN = "https://analytics.svobol.com";

/**
 * Sdílený `test` pro celou sadu.
 *
 * Testy běží proti lokálnímu `dist/` a nesmí záviset na dostupnosti měřicí
 * domény — výpadek analytiky by jinak shodil CI a zablokoval deploy webu,
 * který na ní nijak nestojí. Požadavky na `analytics.svobol.com` se proto
 * odchytávají a odpovídá se na ně prázdným skriptem.
 *
 * Odchycený požadavek je pořád vidět v `page.on("request")`, takže se dá
 * asertovat, že se měřicí skript opravdu žádá (viz analytics.spec.ts).
 *
 * Fixture je `auto` — platí pro každý test, který importuje tenhle `test`,
 * aniž by si o ni musel říct.
 */
export const test = base.extend<{ stubAnalytics: void }>({
  stubAnalytics: [
    async ({ page }, use) => {
      await page.route(`${ANALYTICS_ORIGIN}/**`, (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/javascript",
          body: "/* stub pro testy */",
        }),
      );
      await use();
    },
    { auto: true },
  ],
});

export { expect };
