import { test } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "../utilities/login";
import { createEmployee } from "../utilities/createEmployee";
import { searchEmployeeByIdAndDelete } from "../utilities/searchEmployeeActions";

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

        // Create a fresh employee and write to tests/data/delete_employee.json
        await createEmployee(page, jsonFilename);
    });

    test("Should delete employee using saved ID and clear the file", async ({
        page,
    }) => {
        await login(page);

        // Read the ID back from tests/data/delete_employee.json
        const employeeData = JSON.parse(
            fs.readFileSync(deleteFilePath, "utf8"),
        );
        const employeeId = employeeData.employeeId;

        // Search for and delete
        await searchEmployeeByIdAndDelete(page, employeeId);

        console.log(`🗑️ Employee with ID ${employeeId} deleted.`);

        // Clear out the JSON for next run
        fs.writeFileSync(
            deleteFilePath,
            JSON.stringify({ employeeId: "" }, null, 2),
        );
        console.log("🧹 delete_employee.json cleared.");
    });
});
