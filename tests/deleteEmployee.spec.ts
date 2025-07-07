import { test } from "@playwright/test";
import path from "path";
import { login } from "../utilities/login";
import { createEmployee } from "../utilities/createEmployee";
import { searchEmployeeByIdAndDelete } from "../utilities/searchEmployeeActions";
import {
    readJsonFile,
    clearJsonFile,
} from "../utilities/playwright_utilities/fileUtils";

const jsonFilename = "delete_employee.json";
const deleteFilePath = path.resolve(
    process.cwd(),
    "tests",
    "data",
    jsonFilename,
);

test.describe("Delete Employee", () => {
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await login(page);

        // Create a fresh employee and write to JSON
        await createEmployee(page, jsonFilename);
    });

    test("Should delete employee using saved ID and clear the file", async ({
        page,
    }) => {
        await login(page);

        // Read employeeId from JSON
        const employeeData = readJsonFile(deleteFilePath);
        const employeeId = employeeData.employeeId;

        // Search for and delete the employee
        await searchEmployeeByIdAndDelete(page, employeeId);
        console.log(`🗑️ Employee with ID ${employeeId} deleted.`);

        // Clear the JSON file for next run
        clearJsonFile(deleteFilePath);
        console.log("🧹 delete_employee.json cleared.");
    });
});
