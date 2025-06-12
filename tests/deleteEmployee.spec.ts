import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "./utils/login";

const filePath = path.join(__dirname, "employee.json");

test.describe("Delete Employee", () => {
    test("should delete employee using saved ID and clear the file", async ({
        page,
    }) => {
        await login(page);

        // Read the employee ID
        if (!fs.existsSync(filePath)) {
            throw new Error("employee.json does not exist");
        }

        const employeeData = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const employeeId = employeeData.employeeId;

        if (!employeeId) {
            throw new Error("No employee ID found in employee.json");
        }

        // Navigate to Employee List
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();

        // Search for the employee by ID
        await page.getByRole("textbox").nth(2).fill(employeeId);
        await page
            .getByPlaceholder("Type for hints...")
            .first()
            .fill("Ratul Boss");
        await page.getByRole("button", { name: "Search" }).click();

        // Validate and delete
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Record Found")).toBeVisible();
        // eslint-disable-next-line playwright/no-force-option
        await page.getByRole("button", { name: "" }).click({ force: true });
        await page.getByRole("button", { name: "Yes, Delete" }).click();

        console.log(`Employee with ID ${employeeId} deleted.`);

        // Clear the JSON file
        fs.writeFileSync(filePath, JSON.stringify({ employeeId: "" }));
        console.log("employee.json cleared for fresh use.");
    });
});
