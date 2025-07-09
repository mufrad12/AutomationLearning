import { test } from "@playwright/test";
import path from "path";
import { getAuthenticatedState } from "../utilities/auth";
import { createEmployee } from "../utilities/createEmployee";
import { searchEmployeeByIdAndEdit } from "../utilities/searchEmployeeActions";
import { readJsonFile } from "../utilities/playwright_utilities/fileUtils";
import { clickElement } from "../utilities/playwright_utilities/click";
import { assertVisible } from "../utilities/playwright_utilities/assert";
import { Page } from "@playwright/test";

const jsonFilename = "edit_employee.json";
const editFilePath = path.resolve(process.cwd(), "tests", "data", jsonFilename);

let page: Page;

test.describe("Edit Employee", () => {
    test.beforeEach(async ({ browser }) => {
        page = await getAuthenticatedState(browser);
        await createEmployee(page, jsonFilename);
    });

    test("Should edit the employee using saved ID", async () => {
        const employeeData = readJsonFile(editFilePath);
        const employeeId = employeeData.employeeId;

        await searchEmployeeByIdAndEdit(page, employeeId);
        await assertVisible(
            page.getByText("Contact Details"),
            "Contact Details Section",
        );

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

        const saveButton = page
            .locator("form")
            .filter({ hasText: "Blood TypeA+Test_Field Save" })
            .getByRole("button");
        await clickElement(saveButton, page, "Save Button");

        console.log(`✅ Employee with ID ${employeeId} updated successfully`);
    });
});
