import { test } from "@playwright/test";
import path from "path";
import { login } from "../utilities/login";
import { createEmployee } from "../utilities/createEmployee";
import { searchEmployeeByIdAndEdit } from "../utilities/searchEmployeeActions";
import { readJsonFile } from "../utilities/playwright_utilities/fileUtils";
import { clickElement } from "../utilities/playwright_utilities/click";
import { assertVisible } from "../utilities/playwright_utilities/assert";

const jsonFilename = "edit_employee.json";
const editFilePath = path.resolve(process.cwd(), "tests", "data", jsonFilename);

test.describe("Edit Employee", () => {
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await login(page);

        // Create a fresh employee and save to JSON
        await createEmployee(page, jsonFilename);
    });

    test("Should edit the employee using saved ID", async ({ page }) => {
        await login(page);

        // Read employeeId from JSON
        const employeeData = readJsonFile(editFilePath);
        const employeeId = employeeData.employeeId;

        // Search for employee and open edit page
        await searchEmployeeByIdAndEdit(page, employeeId);

        // Wait for the Contact Details section
        await assertVisible(
            page.getByText("Contact Details"),
            "Contact Details Section",
        );

        // Edit blood type dropdown
        const bloodTypeDropdown = page
            .locator("form")
            .filter({ hasText: "Blood Type-- Select --" })
            .locator("i");
        await clickElement(bloodTypeDropdown, page, "Blood Type Dropdown");
        await clickElement(
            page.getByRole("option", { name: "A+" }),
            page,
            "A+ Option",
        );

        // Save the form
        const saveButton = page
            .locator("form")
            .filter({ hasText: "Blood TypeA+Test_Field Save" })
            .getByRole("button");
        await clickElement(saveButton, page, "Save Button");

        console.log(`✅ Employee with ID ${employeeId} updated successfully`);
    });
});
