import { Page } from "@playwright/test";
import { navigateTo } from "./playwright_utilities/goto";
import { fillInput } from "./playwright_utilities/fill";
import { clickElement } from "./playwright_utilities/click";
import { LoginPage } from "page_objects/LoginPage";

/**
 * Logs into the OrangeHRM demo application using default admin credentials.
 *
 * Steps:
 * 1. Navigates to the OrangeHRM login page.
 * 2. Fills in the username and password fields.
 * 3. Clicks the login button.
 *
 * @param {Page} page - The Playwright page object representing the browser page.
 * @returns {Promise<void>}
 */
export async function login(page: Page): Promise<void> {
    await navigateTo(
        page,
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        "OrangeHRM Login Page",
    );

    const loginPage = new LoginPage(page);

    await fillInput(loginPage.getUsernameField(), "Admin", "Username Field");
    await fillInput(loginPage.getPasswordField(), "admin123", "Password Field");
    await clickElement(loginPage.getLoginButton(), page, "Login Button");

    console.log("✅ Login Complete");
}
