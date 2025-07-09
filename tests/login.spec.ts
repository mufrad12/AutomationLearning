import { test, expect } from "@playwright/test";
import { getAuthenticatedState } from "../utilities/auth";

test.describe("Login Test with Fixture", () => {
    test("Login using Auth Fixture", async ({ browser }) => {
        const page = await getAuthenticatedState(browser);
        await expect.soft(page).toHaveURL(/dashboard/);
    });
});
