import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    private page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
    }

    getUsernameField(): Locator {
        // eslint-disable-next-line quotes
        return this.page.locator('input[name="username"]');
    }

    getPasswordField(): Locator {
        // eslint-disable-next-line quotes
        return this.page.locator('input[name="password"]');
    }

    getLoginButton(): Locator {
        // eslint-disable-next-line quotes
        return this.page.locator('button[type="submit"]');
    }
}
