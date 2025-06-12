import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "./utils/login";

test.describe("Add Employee", () => {
    test("Should add employee and save ID", async ({ page }) => {
        await login(page);

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("button", { name: " Add" }).click();
        await page.getByPlaceholder("First Name").fill("Ratul");
        await page.getByPlaceholder("Last Name").fill("Boss");

        const employeeId = await page
            .locator("form")
            .getByRole("textbox")
            .nth(4)
            .inputValue();

        // Save employee ID to file
        const filePath = path.join(__dirname, "employee.json");
        fs.writeFileSync(filePath, JSON.stringify({ employeeId }));

        await page.getByRole("button", { name: "Save" }).click();
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(
            page.getByText("Personal DetailsEmployee Full"),
        ).toBeVisible();
    });
});
