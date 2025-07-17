import { Page } from "@playwright/test";
import { navigateTo } from "./playwright_utilities/goto";
import { fillInput } from "./playwright_utilities/fill";
import { clickElement } from "./playwright_utilities/click";
import { LoginPage } from "../page_objects/LoginPage";

export async function login(page: Page): Promise<void> {
    console.log("🔄 Navigating to Login Page...");
    await navigateTo(
        page,
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        "OrangeHRM Login Page",
    );

    const loginPage = new LoginPage(page);

    // ✅ Wait for username field to appear before proceeding
    console.log("👀 Waiting for username field...");
    await loginPage
        .getUsernameField()
        .waitFor({ state: "visible", timeout: 5000 });

    console.log("⌨️ Typing Username...");
    await fillInput(loginPage.getUsernameField(), "Admin", "Username Field");

    console.log("⌨️ Typing Password...");
    await fillInput(loginPage.getPasswordField(), "admin123", "Password Field");

    console.log("🖱️ Clicking Login...");
    await clickElement(loginPage.getLoginButton(), page, "Login Button");

    console.log("⏳ Waiting for dashboard...");
    await page.waitForURL(/dashboard/, { timeout: 10000 });

    console.log("✅ Login Complete");
}
