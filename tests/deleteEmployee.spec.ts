import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "./utils/login";
import { createEmployee } from "./utils/createEmployee";

const deleteFilePath = path.join(__dirname, "data", "delete_employee.json");

test.describe("Delete Employee", () => {
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await login(page);
        await createEmployee(page, "delete_employee.json", "Mike", "Ross");
    });

    test("Should delete employee using saved ID and clear the file", async ({
        page,
    }) => {
        await login(page);

        const employeeData = JSON.parse(
            fs.readFileSync(deleteFilePath, "utf8"),
        );
        const employeeId = employeeData.employeeId;

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();

        await page.getByRole("textbox").nth(2).fill(employeeId);
        await page
            .getByPlaceholder("Type for hints...")
            .first()
            .fill("Mike Ross");
        await page.getByRole("button", { name: "Search" }).click();

        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Record Found")).toBeVisible();
        // eslint-disable-next-line playwright/no-force-option
        await page.getByRole("button", { name: "" }).click({ force: true });
        await page.getByRole("button", { name: "Yes, Delete" }).click();

        console.log(`🗑️ Employee with ID ${employeeId} deleted.`);

        fs.writeFileSync(deleteFilePath, JSON.stringify({ employeeId: "" }));
        console.log("🧹 delete_employee.json cleared.");
    });
});
