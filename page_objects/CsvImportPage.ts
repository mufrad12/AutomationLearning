import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CsvImportPage extends BasePage {
    private page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
    }

    getFileInput(): Locator {
        // eslint-disable-next-line quotes
        return this.page.locator('input[type="file"]');
    }

    getUploadButton(): Locator {
        return this.page.getByRole("button", { name: "Upload" });
    }

    getConfirmationOkButton(): Locator {
        return this.page.getByRole("button", { name: "Ok" });
    }
}
