import { Page } from "@playwright/test";
import { clickElement } from "./playwright_utilities/click";
import { fillInput } from "./playwright_utilities/fill";
import { assertVisible } from "./playwright_utilities/assert";
import { EmployeePage } from "page_objects/EmployeePage";

/**
 * Searches for an employee by their employee ID and navigates to the edit page.
 *
 * Workflow:
 * 1. Navigates to the PIM > Employee List page.
 * 2. Searches for the employee by ID.
 * 3. Asserts that the record is found.
 * 4. Clicks the edit icon to open the employee's profile for editing.
 *
 * @param {Page} page - The Playwright page object representing the browser page.
 * @param {string} employeeId - The ID of the employee to search for.
 * @returns {Promise<void>}
 */
export async function searchEmployeeByIdAndEdit(
    page: Page,
    employeeId: string,
): Promise<void> {
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

/**
 * Searches for an employee by their employee ID and deletes the employee record.
 *
 * Workflow:
 * 1. Navigates to the PIM > Employee List page.
 * 2. Searches for the employee by ID.
 * 3. Asserts that the record is found.
 * 4. Clicks the delete icon and confirms deletion.
 *
 * @param {Page} page - The Playwright page object representing the browser page.
 * @param {string} employeeId - The ID of the employee to search for and delete.
 * @returns {Promise<void>}
 */
export async function searchEmployeeByIdAndDelete(
    page: Page,
    employeeId: string,
): Promise<void> {
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
