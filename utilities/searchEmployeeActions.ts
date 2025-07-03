import { Page } from "@playwright/test";
import { clickElement } from "./playwright_utilities/click";
import { fillInput } from "./playwright_utilities/fill";
import { assertVisible } from "./playwright_utilities/assert";
//import { waitForElement } from "./playwright_utilities/waitForElement";

export async function searchEmployeeByIdAndEdit(
    page: Page,
    employeeId: string,
) {
    await clickElement(
        page.getByRole("link", { name: "PIM" }),
        page,
        "PIM Menu",
    );
    await clickElement(
        page.getByRole("link", { name: "Employee List" }),
        page,
        "Employee List Menu",
    );

    const searchField = page.getByRole("textbox").nth(2);
    await fillInput(searchField, employeeId, "Employee Search Field");

    const searchButton = page.getByRole("button", { name: "Search" });
    await clickElement(searchButton, page, "Search Button");

    await assertVisible(page.getByText("Record Found"), "Record Found Text");

    const editIcon = page.locator(".oxd-icon.bi-pencil-fill");
    await clickElement(editIcon, page, "Edit Icon");
}

export async function searchEmployeeByIdAndDelete(
    page: Page,
    employeeId: string,
) {
    await clickElement(
        page.getByRole("link", { name: "PIM" }),
        page,
        "PIM Menu",
    );
    await clickElement(
        page.getByRole("link", { name: "Employee List" }),
        page,
        "Employee List Menu",
    );

    const searchField = page.getByRole("textbox").nth(2);
    await fillInput(searchField, employeeId, "Employee Search Field");

    const searchButton = page.getByRole("button", { name: "Search" });
    await clickElement(searchButton, page, "Search Button");

    await assertVisible(page.getByText("Record Found"), "Record Found Text");

    const deleteIcon = page.getByRole("button", { name: "" });
    await clickElement(deleteIcon, page, "Delete Icon");

    const confirmDelete = page.getByRole("button", { name: "Yes, Delete" });
    await clickElement(confirmDelete, page, "Confirm Delete Button");
}
