import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "../utilities/login";
import { createEmployee } from "../utilities/createEmployee";
import { searchEmployeeByIdAndEdit } from "../utilities/searchEmployeeActions";

const jsonFilename = "edit_employee.json";
const editFilePath = path.resolve(process.cwd(), "tests", "data", jsonFilename);

test.describe("Edit Employee", () => {
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await login(page);
        // Create a fresh employee and write to tests/data/edit_employee.json
        await createEmployee(page, jsonFilename);
    });

    test("Should edit the employee using saved ID", async ({ page }) => {
        await login(page);

        // Read the ID back from tests/data/edit_employee.json
        const employeeData = JSON.parse(fs.readFileSync(editFilePath, "utf8"));
        const employeeId = employeeData.employeeId;

        // Search + open edit
        await searchEmployeeByIdAndEdit(page, employeeId);

        // Perform the edit steps
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
