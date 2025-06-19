import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "./utils/login";
import { generate9DigitId } from "./utils/generateEmpID";

test.describe("Add Employee", () => {
    test("Should add employee and save ID", async ({ page }) => {
        await login(page);

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("button", { name: " Add" }).click();

        const id = generate9DigitId();
        console.log("🔢 Unique 9-digit ID:", id);

        await page.getByPlaceholder("First Name").fill("Ratul");
        await page.getByPlaceholder("Last Name").fill("Boss");
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
        const filePath = path.join(__dirname, "create_employee.json");
        fs.writeFileSync(filePath, JSON.stringify({ employeeId }));

        await page.getByRole("button", { name: "Save" }).click();

        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Contact Details")).toBeVisible();
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Employee Full Name")).toBeVisible();

        //fs.writeFileSync(filePath, JSON.stringify({ employeeId: "" }));
        //console.log("🧹 create_employee.json cleared.");
    });
});
