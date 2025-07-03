import { test, expect } from "@playwright/test";
import { login } from "../utilities/login";

test.describe("Login Test", () => {
    test("Login to OrangeHRM", async ({ page }) => {
        await login(page);

        await expect.soft(page).toHaveURL(/dashboard/); // Adjust based on actual landing page
    });
});
