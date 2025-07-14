import { test, expect } from "@playwright/test";
import { getAuthenticatedState } from "../utilities/fixtures/auth";
import { login } from "../utilities/login";

test.describe("Login Test with Fixture", () => {
    test("Login using Auth Fixture", async ({ page }) => {
        await login(page);
    });

    test("Login to OrangeHRM with Login Fixture", async ({ browser }) => {
        //await login(page);

        const page = await getAuthenticatedState(browser);
        await expect.soft(page).toHaveURL(/dashboard/);
    });
});
