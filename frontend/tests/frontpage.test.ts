import { test, expect } from "@playwright/test";

test("the frontpage should load", async ({ page }) => {
  await page.goto("/");
  expect(await page.getByAltText("Spoties")).toBeTruthy();
});

test("the dark mode toggle should change body class", async ({ page }) => {
  await page.goto("/");

  const body = await page.locator("html");
  expect(body.getAttribute("class")).not.toContain("dark");

  await page.locator('button[aria-label="Dark mode"]').click();
  expect(await body.getAttribute("class")).toContain("dark");
});

test("the lang selector should change hero text", async ({ page }) => {
  await page.goto("/");

  const menu = await page.locator(".lang-menu");
  const hero = await page.locator(".hero-headline");
  const dropdown = await page.locator(".lang-dropdown");

  await menu.click();
  await dropdown.locator(".to-en").click();
  expect(await hero.innerHTML()).toContain("event staffing");

  await menu.click();
  await dropdown.locator(".to-fr").click();
  expect(await hero.innerHTML()).toContain("événements");

  await menu.click();
  await dropdown.locator(".to-es").click();
  expect(await hero.innerHTML()).toContain("eventos");
});
