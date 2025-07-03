import { Page } from "@playwright/test";
import { navigateTo } from "./playwright_utilities/goto";
import { fillInput } from "./playwright_utilities/fill";
import { clickElement } from "./playwright_utilities/click";

export async function login(page: Page) {
    await navigateTo(
        page,
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        "Login Page",
    );
    await fillInput(page.getByPlaceholder("Username"), "Admin", "Username");
    await fillInput(page.getByPlaceholder("Password"), "admin123", "Password");
    await clickElement(
        page.getByRole("button", { name: "Login" }),
        page,
        "Login Button",
    );
    console.log("✅ Login Complete");
}
