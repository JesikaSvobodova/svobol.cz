import { expect, test } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/rizeni-energie",
  "/nabijeni-elektromobilu",
  "/fotovoltaika-baterie",
  "/victron",
  "/realizace",
  "/kontakt",
];

for (const route of routes) {
  test(`${route} má úplná metadata, jeden H1 a nepřetéká`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.ok()).toBeTruthy();

    expect(await page.title()).not.toBe("");
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.trim().length).toBeGreaterThanOrEqual(40);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`^https://svobol\\.cz${route === "/" ? "/?$" : `${route}/?$`}`),
    );
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);

    const overflow = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      body: document.body.scrollWidth - document.body.clientWidth,
    }));
    expect(overflow.document, `document přetéká o ${overflow.document}px`).toBeLessThanOrEqual(1);
    expect(overflow.body, `body přetéká o ${overflow.body}px`).toBeLessThanOrEqual(1);

    const invalidImages = await page.locator("img:not([alt])").count();
    expect(invalidImages).toBe(0);
  });
}

test("hlavní CTA a navigace vedou na správná místa", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("FVE.");
  await expect(page.getByRole("link", { name: "Popsat projekt" }).first()).toHaveAttribute(
    "href",
    "/kontakt",
  );
  await expect(page.getByRole("link", { name: "svolbox.com", exact: true })).toHaveAttribute(
    "href",
    "https://www.svolbox.com/",
  );

  for (const href of [
    "/rizeni-energie",
    "/nabijeni-elektromobilu",
    "/fotovoltaika-baterie",
    "/victron",
    "/realizace",
    "/kontakt",
  ]) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeAttached();
  }
});

test("mobilní menu funguje dotykem i klávesnicí", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Test patří mobilním viewportům");
  await page.goto("/");

  const menu = page.locator("details.mobile-menu");
  const toggle = menu.locator("summary");
  await expect(toggle).toBeVisible();
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await expect(menu.getByRole("link", { name: "Řízení energie" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Popsat projekt" })).toBeVisible();
});

test("kontakt má funkční e-mailový a telefonní odkaz", async ({ page }) => {
  await page.goto("/kontakt");
  await expect(page.locator('a[href^="mailto:info@svolbox.com"]').first()).toBeVisible();
  await expect(page.locator('a[href="tel:+420773227929"]').first()).toBeVisible();
});

test("všechny interní odkazy z hlavních stránek odpovídají", async ({ page, request }) => {
  const links = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
      )) {
      links.add(href!.split("#")[0] || "/");
    }
  }

  for (const href of links) {
    const response = await request.get(href);
    expect(response.status(), `${href} vrací ${response.status()}`).toBeLessThan(400);
  }
});

test("404 vrací vlastní chybovou stránku a stav 404", async ({ page }) => {
  const response = await page.goto("/neexistujici-technologie");
  expect(response?.status()).toBe(404);
  const customPage = await page.goto("/404.html");
  expect(customPage?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("cesta nikam nevede");
});

test("robots a sitemap jsou dostupné", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("https://svobol.cz/sitemap-index.xml");

  const sitemap = await request.get("/sitemap-index.xml");
  expect(sitemap.ok()).toBeTruthy();
});

test("hlavní stránky nemají závažná WCAG porušení", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440", "Jeden reprezentativní accessibility běh");

  for (const route of routes) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const seriousViolations = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );
    expect(
      seriousViolations,
      `${route}: ${seriousViolations.map((item) => item.id).join(", ")}`,
    ).toEqual([]);
  }
});
