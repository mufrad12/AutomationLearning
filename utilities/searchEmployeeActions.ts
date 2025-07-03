// utils/searchEmployeeActions.ts
import { Page, expect } from "@playwright/test";

export async function searchEmployeeByIdAndEdit(
    page: Page,
    employeeId: string,
) {
    await page.getByRole("link", { name: "PIM" }).click();
    await page.getByRole("link", { name: "Employee List" }).click();
    await page.getByRole("textbox").nth(2).fill(employeeId);
    // eslint-disable-next-line playwright/no-force-option
    await page.getByRole("button", { name: "Search" }).click({ force: true });

    // eslint-disable-next-line playwright/require-soft-assertions
    await expect(page.getByText("Record Found")).toBeVisible();
    // eslint-disable-next-line playwright/no-force-option
    await page.locator(".oxd-icon.bi-pencil-fill").click({ force: true });
}

export async function searchEmployeeByIdAndDelete(
    page: Page,
    employeeId: string,
) {
    await page.getByRole("link", { name: "PIM" }).click();
    await page.getByRole("link", { name: "Employee List" }).click();
    await page.getByRole("textbox").nth(2).fill(employeeId);
    // eslint-disable-next-line playwright/no-force-option
    await page.getByRole("button", { name: "Search" }).click({ force: true });

    // eslint-disable-next-line playwright/require-soft-assertions
    await expect(page.getByText("Record Found")).toBeVisible();
    // eslint-disable-next-line playwright/no-force-option
    await page.getByRole("button", { name: "" }).click({ force: true });
    await page.getByRole("button", { name: "Yes, Delete" }).click();
}
