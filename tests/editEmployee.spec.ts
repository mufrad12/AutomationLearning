import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "./utils/login";
import { generate9DigitId } from "./utils/generateEmpID";

const editFilePath = path.join(__dirname, "edit_employee.json");

test.describe("Edit Employee", () => {
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
        const editFilePath = path.join(__dirname, "edit_employee.json");
        fs.writeFileSync(editFilePath, JSON.stringify({ employeeId }));

        await page.getByRole("button", { name: "Save" }).click();

        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Contact Details")).toBeVisible();
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Employee Full Name")).toBeVisible();
    });

    test("Should edit the employee using saved ID", async ({ page }) => {
        await login(page);

        const employeeData = JSON.parse(fs.readFileSync(editFilePath, "utf8"));
        const employeeId = employeeData.employeeId;

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("textbox").nth(2).fill(employeeId);
        await page
            .getByRole("button", { name: "Search" })
            // eslint-disable-next-line playwright/no-force-option
            .click({ force: true });
        await page
            .getByRole("button", { name: "Search" })
            // eslint-disable-next-line playwright/no-force-option
            .click({ force: true });

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
