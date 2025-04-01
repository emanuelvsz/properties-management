import { Browser, chromium, expect, test } from "@playwright/test";

let browser: Browser;

test.beforeAll(async () => {
	browser = await chromium.launch();
});

test.afterAll(async () => {
	await browser.close();
});

test("test base structure", async ({ page }) => {
	await page.goto("/entrar");
	await expect(page).toHaveTitle("Project Template - Entrar");
	const titleCount = await page
		.getByRole("heading", { name: "Entrar" })
		.count();
	const titleExists = titleCount === 1;
	const emailInputCount = await page.getByLabel("Email").count();
	const passwordInputCount = await page.getByLabel("Senha").count();
	expect(titleExists).toBeTruthy();
	expect(emailInputCount).toBe(1);
	expect(passwordInputCount).toBe(1);
});
