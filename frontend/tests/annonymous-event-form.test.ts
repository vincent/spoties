import { test, expect } from "@playwright/test";

test("the form should load", async ({ page }) => {
  await page.goto("/admin/events/create/");
  expect(await page.locator("form")).toBeTruthy();
});

test("the form should navigate to /login with a correct redirect_uri", async ({
  page,
}) => {
  await page.goto("/admin/events/create/");
  const data = {
    title: "a title",
    description: "a description",
  };

  await page.locator(".field-title").fill(data.title);
  await page.locator(".accordion-description").click();
  await page.locator(".field-description .tiptap").fill(data.description);
  await page.locator(".form-submit").click();

  await page.waitForURL("**/login/?return_url=/admin/events/stored");

  // once returned, the form should contain original values
  await page.goto("/admin/events/stored");
  expect(await page.locator(".field-title").inputValue()).toContain(data.title);
  await page.locator(".accordion-description").click();
  expect(
    await page.locator(".field-description .tiptap").innerHTML()
  ).toContain(data.description);
});

test("the form should add a question", async ({ page }) => {
  await page.goto("/admin/events/create/");
  const data = {
    title: "a title",
    description: "a description",
    questions: [
      { label: "Question 1", desc: "Question description 1" },
      { label: "Question 2", desc: "Question description 2" },
    ],
    locations: [
      { label: "Location 1", desc: "Location description 1" },
      { label: "Location 2", desc: "Location description 2" },
    ],
  };

  // title
  await page.locator(".field-title").fill(data.title);

  // description
  await page.locator(".accordion-description").click();

  await page.locator(".field-description .tiptap").fill(data.description);

  // questions
  await page.locator(".accordion-questions").click();

  await page.locator(".append-question").click();
  expect(await page.locator(".question-form").count()).toBe(1);
  const qt1 = page.locator(".question-type-0");
  await qt1.click();
  await qt1.locator(".question-type-just_text").click();
  await page.locator(".question-label-0").click();
  await page
    .locator(".question-label-0")
    .locator(".tiptap")
    .fill(data.questions[0].label);
  await page.locator(".question-description-0").click();
  await page
    .locator(".question-description-0")
    .locator(".tiptap")
    .fill(data.questions[0].desc);

  await page.locator(".append-question").click();
  expect(await page.locator(".question-form").count()).toBe(2);
  const qt2 = page.locator(".question-type-1");
  await qt2.click();
  await qt2.locator(".question-type-just_text").click();
  await page.locator(".question-label-1").click();
  await page
    .locator(".question-label-1")
    .locator(".tiptap")
    .fill(data.questions[1].label);
  await page.locator(".question-description-1").click();
  await page
    .locator(".question-description-1")
    .locator(".tiptap")
    .fill(data.questions[1].desc);

  // locations
  await page.locator(".accordion-locations").click();

  await page.locator(".append-location").click();

  expect(await page.locator(".location-form").count()).toBe(1);
  const loc1 = page.locator(".location-form-1");
});
