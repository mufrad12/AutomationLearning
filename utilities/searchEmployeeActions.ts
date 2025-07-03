import { Page } from "@playwright/test";
import { clickElement } from "./playwright_utilities/click";
import { fillInput } from "./playwright_utilities/fill";
import { assertVisible } from "./playwright_utilities/assert";
import { EmployeePage } from "page_objects/EmployeePage";

export async function searchEmployeeByIdAndEdit(
    page: Page,
    employeeId: string,
) {
    const employeePage = new EmployeePage(page);

    await clickElement(employeePage.getPimMenu(), page, "PIM Menu");
    await clickElement(
        employeePage.getEmployeeListMenu(),
        page,
        "Employee List Menu",
    );

    const searchField = employeePage.getSearchTextboxByIndex(2);
    await fillInput(searchField, employeeId, "Employee Search Field");

    const searchButton = employeePage.getSearchButton();
    await clickElement(searchButton, page, "Search Button");

    await assertVisible(page.getByText("Record Found"), "Record Found Text");

    const editIcon = employeePage.getEditIcon();
    await clickElement(editIcon, page, "Edit Icon");
}

export async function searchEmployeeByIdAndDelete(
    page: Page,
    employeeId: string,
) {
    const employeePage = new EmployeePage(page);

    await clickElement(employeePage.getPimMenu(), page, "PIM Menu");
    await clickElement(
        employeePage.getEmployeeListMenu(),
        page,
        "Employee List Menu",
    );

    const searchField = employeePage.getSearchTextboxByIndex(2);
    await fillInput(searchField, employeeId, "Employee Search Field");

    const searchButton = employeePage.getSearchButton();
    await clickElement(searchButton, page, "Search Button");

    await assertVisible(page.getByText("Record Found"), "Record Found Text");

    const deleteIcon = employeePage.getDeleteButton();
    await clickElement(deleteIcon, page, "Delete Icon");

    const confirmDelete = employeePage.getConfirmDeleteButton();
    await clickElement(confirmDelete, page, "Confirm Delete Button");
}
