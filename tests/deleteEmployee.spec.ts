import { test } from "@playwright/test";
import path from "path";
import { getAuthenticatedState } from "../utilities/fixtures/auth";
import { createEmployee } from "../utilities/createEmployee";
import { searchEmployeeByIdAndDelete } from "../utilities/searchEmployeeActions";
import {
    readJsonFile,
    clearJsonFile,
} from "../utilities/playwright_utilities/fileUtils";
import { Page } from "@playwright/test";

const jsonFilename = "delete_employee.json";
const deleteFilePath = path.resolve(
    process.cwd(),
    "tests",
    "data",
    jsonFilename,
);

let page: Page;

test.describe("Delete Employee", () => {
    test.beforeEach(async ({ browser }) => {
        page = await getAuthenticatedState(browser);
        await createEmployee(page, jsonFilename);
    });

    test("Should delete employee using saved ID and clear the file", async () => {
        const employeeData = readJsonFile(deleteFilePath);
        const employeeId = employeeData.employeeId;

        await searchEmployeeByIdAndDelete(page, employeeId);
        console.log(`🗑️ Employee with ID ${employeeId} deleted.`);

        clearJsonFile(deleteFilePath);
        console.log("🧹 delete_employee.json cleared.");
    });
});
