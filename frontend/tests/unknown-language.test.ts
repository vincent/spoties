import { test, expect } from "@playwright/test";

test.use({
  locale: "de-DE",
  timezoneId: "Europe/Berlin",
});

test("the frontpage should load in unknown language", async ({ page }) => {
  await page.goto("/");
  const home = await page.locator(".frontpage").innerHTML();
  expect(home.length).toBeGreaterThan(100);
});
