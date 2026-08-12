import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const captures = [
  { name: "home-360", route: "/", width: 360, height: 800 },
  { name: "home-375", route: "/", width: 375, height: 812 },
  { name: "home-390", route: "/", width: 390, height: 844 },
  { name: "home-412", route: "/", width: 412, height: 915 },
  { name: "home-768", route: "/", width: 768, height: 1024 },
  { name: "home-1440", route: "/", width: 1440, height: 1000 },
  { name: "home-1920", route: "/", width: 1920, height: 1080 },
  { name: "rizeni-390", route: "/rizeni-energie", width: 390, height: 844 },
  { name: "nabijeni-390", route: "/nabijeni-elektromobilu", width: 390, height: 844 },
  { name: "fve-390", route: "/fotovoltaika-baterie", width: 390, height: 844 },
  { name: "victron-390", route: "/victron", width: 390, height: 844 },
  { name: "realizace-390", route: "/realizace", width: 390, height: 844 },
  { name: "kontakt-390", route: "/kontakt", width: 390, height: 844 },
];

test("pořídí kompletní sadu screenshotů pro vizuální QA", async ({ page }) => {
  test.skip(!process.env.VISUAL_QA, "Spouští se samostatně přes npm run test:visual");
  const outputDir = process.env.SCREENSHOT_DIR || "screenshots/current";
  await mkdir(outputDir, { recursive: true });

  for (const capture of captures) {
    await page.setViewportSize({ width: capture.width, height: capture.height });
    const response = await page.goto(capture.route, { waitUntil: "networkidle" });
    expect(response?.ok()).toBeTruthy();
    await page.screenshot({ path: `${outputDir}/${capture.name}.png`, fullPage: true });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("details.mobile-menu summary").click();
  await page.screenshot({ path: `${outputDir}/menu-390.png`, fullPage: false });
});
