import { test, expect } from "@playwright/test";
import { login } from "../utils/login";

test.describe("Login Test", () => {
    test("Login to OrangeHRM", async ({ page }) => {
        await login(page);
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page).toHaveURL(/dashboard/); // Adjust based on actual landing page
    });
});
