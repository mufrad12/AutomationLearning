import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "./utils/login";

test.describe("Edit Employee", () => {
    test("should edit the employee using saved ID", async ({ page }) => {
        await login(page);

        const filePath = path.join(__dirname, "employee.json");
        const employeeData = JSON.parse(fs.readFileSync(filePath, "utf8"));
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
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Employee Id")).toBeVisible();

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
        console.log("Employee details updated successfully");
    });
});
