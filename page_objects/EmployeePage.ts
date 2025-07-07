import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class EmployeePage extends BasePage {
    private page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
    }

    getPimMenu(): Locator {
        return this.page.getByRole("link", { name: "PIM" });
    }

    getAddButton(): Locator {
        return this.page.getByRole("button", { name: " Add" });
    }

    getFirstNameInput(): Locator {
        return this.page.getByPlaceholder("First Name");
    }

    getLastNameInput(): Locator {
        return this.page.getByPlaceholder("Last Name");
    }

    getEmployeeIdInput(): Locator {
        return this.page.locator(
            "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/input",
        );
    }

    getSaveButton(): Locator {
        return this.page.getByRole("button", { name: "Save" });
    }

    getEmployeeListMenu(): Locator {
        return this.page.getByRole("link", { name: "Employee List" });
    }

    getSearchTextboxByIndex(index: number = 2): Locator {
        return this.page.getByRole("textbox").nth(index);
    }

    getSearchButton(): Locator {
        return this.page.getByRole("button", { name: "Search" });
    }

    getEditIcon(): Locator {
        return this.page.locator(".oxd-icon.bi-pencil-fill");
    }

    getDeleteButton(): Locator {
        return this.page.getByRole("button", { name: "" });
    }

    getConfirmDeleteButton(): Locator {
        return this.page.getByRole("button", { name: "Yes, Delete" });
    }
}
