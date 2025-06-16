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

        // Create a new employee and save ID
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("button", { name: " Add" }).click();
        await page.getByPlaceholder("First Name").fill("Ratul");
        await page.getByPlaceholder("Last Name").fill("Boss");

        const employeeId = await page
            .locator("form")
            .getByRole("textbox")
            .nth(4)
            .inputValue();

        fs.writeFileSync(editFilePath, JSON.stringify({ employeeId }));

        await page.getByRole("button", { name: "Save" }).click();
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(
            page.getByText("Personal DetailsEmployee Full"),
        ).toBeVisible();
        await page.close();
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

        console.log("✅ Employee details updated successfully");
    });
});
