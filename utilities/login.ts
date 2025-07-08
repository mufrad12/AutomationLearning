import { Page } from "@playwright/test";
import { navigateTo } from "./playwright_utilities/goto";
import { fillInput } from "./playwright_utilities/fill";
import { clickElement } from "./playwright_utilities/click";
import { LoginPage } from "../page_objects/LoginPage";

/**
 * Logs into OrangeHRM with given credentials.
 * @param {Page} page - Playwright page instance.
 * @param {string} username - Username to login.
 * @param {string} password - Password to login.
 * @param {string} loginUrl - URL of the login page.
 */
export async function login(
    page: Page,
    username: string,
    password: string,
    loginUrl: string,
): Promise<void> {
    await navigateTo(page, loginUrl, "Login Page");

    const loginPage = new LoginPage(page);

    await fillInput(loginPage.getUsernameField(), username, "Username Field");
    await fillInput(loginPage.getPasswordField(), password, "Password Field");
    await clickElement(loginPage.getLoginButton(), page, "Login Button");

    // await page.waitForURL("**/dashboard");
}
