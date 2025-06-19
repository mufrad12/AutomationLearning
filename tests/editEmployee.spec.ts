import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "./utils/login";

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

        await page.getByPlaceholder("First Name").fill("Ratul");
        await page.getByPlaceholder("Last Name").fill("Boss");
        await page.getByRole("textbox").nth(4).fill(utcTimeMillis.toString());

        const employeeId = await page.getByRole("textbox").nth(4).inputValue();
        fs.writeFileSync(editFilePath, JSON.stringify({ employeeId }));

        await page.getByRole("button", { name: "Save" }).click();
        await expect(page.getByText("Contact Details")).toBeVisible();
        await expect(page.getByText("Employee Full Name")).toBeVisible();
    });

    test("Should edit the employee using saved ID", async ({ page }) => {
        await login(page);

        const employeeData = JSON.parse(fs.readFileSync(editFilePath, "utf8"));
        const employeeId = employeeData.employeeId;

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("textbox").nth(2).fill(employeeId);
        await page.getByRole("button", { name: "Search" }).click();

        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Records Found")).toBeVisible();

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
