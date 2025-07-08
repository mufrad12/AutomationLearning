// tests/login.spec.ts

import { test, expect } from "@playwright/test";
import { getAuthenticatedPage } from "../utilities/authManager";

test.describe("Login with Persistent Auth", () => {
    test("Should open dashboard using saved session or login", async ({
        browser,
    }) => {
        const authParams = {
            username: "Admin",
            password: "admin123",
            loginUrl:
                "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
            dashboardUrl:
                "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
        };

        const page = await getAuthenticatedPage(browser, authParams);

        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page).toHaveURL(/dashboard/);
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(
            page.getByRole("heading", { name: "Dashboard" }),
        ).toBeVisible();
    });
});
