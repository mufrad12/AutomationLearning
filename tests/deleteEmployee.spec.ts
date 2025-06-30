/* eslint-disable playwright/no-force-option */
import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "./utils/login";
import { generate9DigitId } from "./utils/generateEmpID";

const deleteFilePath = path.join(__dirname, "data", "delete_employee.json");

test.describe("Delete Employee", () => {
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await login(page);

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("button", { name: " Add" }).click();

        const utcTimeMillis: number = Date.now();
        console.log("🕒 UTC Timestamp for ID:", utcTimeMillis);

        await page.getByPlaceholder("First Name").fill("Mike");
        await page.getByPlaceholder("Last Name").fill("Ross");
        //await page.pause();

        // Fill the Employee ID field manually with UTC timestamp
        await page
            .locator(
                "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/input",
            )
            .fill(generate9DigitId());

        // Get and save the employee ID to file
        const employeeId = await page
            .locator(
                "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/input",
            )
            .inputValue();

        const deleteFilePath = path.join(
            __dirname,
            "data",
            "delete_employee.json",
        );
        fs.writeFileSync(deleteFilePath, JSON.stringify({ employeeId }));

        await page.getByRole("button", { name: "Save" }).click();

        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Contact Details")).toBeVisible();
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Employee Full Name")).toBeVisible();
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
        await page
            .getByRole("button", { name: "Search" })
            .click({ force: true });

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
