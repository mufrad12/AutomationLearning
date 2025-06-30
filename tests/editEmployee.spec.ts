import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "./utils/login";
import { createEmployee } from "./utils/createEmployee";

const editFilePath = path.join(__dirname, "data", "edit_employee.json");

test.describe("Edit Employee", () => {
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await login(page);
        await createEmployee(page, "edit_employee.json", "Mike", "Ross");
    });

    test("Should edit the employee using saved ID", async ({ page }) => {
        await login(page);

        const employeeData = JSON.parse(fs.readFileSync(editFilePath, "utf8"));
        const employeeId = employeeData.employeeId;

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("textbox").nth(2).fill(employeeId);
        await page.getByRole("button", { name: "Search" }).click();

        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Record Found")).toBeVisible();
        // eslint-disable-next-line playwright/no-force-option
        await page.locator(".oxd-icon.bi-pencil-fill").click({ force: true });
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Contact Details")).toBeVisible();

        await page
            .locator("form")
            .filter({ hasText: "Blood Type-- Select --" })
            .locator("i")
            .click();
        await page.getByRole("option", { name: "A+" }).click();

        await page
            .locator("form")
            .filter({ hasText: "Blood TypeA+Test_Field Save" })
            .getByRole("button")
            .click();

        console.log(`✅ Employee with ID ${employeeId} updated successfully`);
    });
});
