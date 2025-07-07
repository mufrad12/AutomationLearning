import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    private page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
    }

    getUsernameField(): Locator {
        return this.page.getByPlaceholder("Username");
    }

    getPasswordField(): Locator {
        return this.page.getByPlaceholder("Password");
    }

    getLoginButton(): Locator {
        return this.page.getByRole("button", { name: "Login" });
    }
}
