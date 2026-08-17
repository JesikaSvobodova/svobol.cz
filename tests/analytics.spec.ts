import { ANALYTICS_ORIGIN, expect, test } from "./fixtures";
import { site } from "../src/data/site";

/**
 * Analytika je jediná externí závislost webu. Tyhle testy hlídají dvě věci:
 * že měřicí skript je na každé stránce a správně nakonfigurovaný, a že se
 * k němu časem nepřidá nic dalšího.
 *
 * Reálná odpověď měřicí instance se tu netestuje — požadavky jsou odchycené
 * (viz fixtures.ts). Že sběr opravdu funguje, se ověřuje na produkci po
 * deployi, ne v gate, která nesmí záviset na cizím serveru.
 */

const routes = [
  "/",
  "/rizeni-energie",
  "/nabijeni-elektromobilu",
  "/fotovoltaika-baterie",
  "/victron",
  "/realizace",
  "/kontakt",
  "/404.html",
];

for (const route of routes) {
  test(`${route} má měřicí skript se správnou konfigurací`, async ({ page }) => {
    await page.goto(route);

    const tracker = page.locator(`script[src="${site.analytics.scriptUrl}"]`);
    await expect(tracker).toHaveCount(1);
    await expect(tracker).toHaveAttribute("data-website-id", site.analytics.websiteId);
    await expect(tracker).toHaveAttribute("data-domains", site.analytics.domains);

    // defer, ať skript neblokuje parsování dokumentu.
    await expect(tracker).toHaveAttribute("defer", "");

    // Dvojité lomítko v cestě = 308 redirect navíc při každém načtení stránky.
    expect(await tracker.getAttribute("src")).not.toMatch(/[^:]\/\//);
  });
}

test("měřicí skript se opravdu stahuje", async ({ page }) => {
  const requested: string[] = [];
  page.on("request", (request) => {
    if (request.url().startsWith(ANALYTICS_ORIGIN)) requested.push(request.url());
  });

  await page.goto("/", { waitUntil: "load" });

  expect(requested).toEqual([site.analytics.scriptUrl]);
});

test("analytika je jediný cizí origin, na který web sahá", async ({ page, baseURL }) => {
  const own = new URL(baseURL!).origin;
  const foreign = new Set<string>();
  page.on("request", (request) => {
    const { origin } = new URL(request.url());
    if (origin !== own) foreign.add(origin);
  });

  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
  }

  expect([...foreign]).toEqual([ANALYTICS_ORIGIN]);
});
