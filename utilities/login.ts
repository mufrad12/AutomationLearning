import { Page } from "@playwright/test";
import { navigateTo } from "./playwright_utilities/goto";
import { fillInput } from "./playwright_utilities/fill";
import { clickElement } from "./playwright_utilities/click";

export async function login(page: Page) {
    await navigateTo(
        page,
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        "OrangeHRM Login Page",
    );

    const usernameField = page.getByPlaceholder("Username");
    const passwordField = page.getByPlaceholder("Password");
    const loginButton = page.getByRole("button", { name: "Login" });

    await fillInput(usernameField, "Admin", "Username Field");
    await fillInput(passwordField, "admin123", "Password Field");
    await clickElement(loginButton, page, "Login Button");

    console.log("✅ Login Complete");
}
