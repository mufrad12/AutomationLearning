import { test, expect } from "@playwright/test";
import { getAuthenticatedState } from "../utilities/fixtures/auth";
import { login } from "../utilities/login";

test.describe("Login Tests", () => {
    test("Login using basic login() method", async ({ page }) => {
        await login(page);
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page).toHaveURL(/dashboard/);
    });

    test("Login using Auth Fixture", async ({ browser }) => {
        const page = await getAuthenticatedState(browser);
        await expect.soft(page).toHaveURL(/dashboard/);
    });

    test("Login using Global StorageState", async ({ page }) => {
        await page.goto("/web/index.php/dashboard/index");
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page).toHaveURL(/dashboard/);
    });
});
