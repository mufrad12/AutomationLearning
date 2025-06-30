import { Page, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { generate9DigitId } from "./generateEmpID";

export async function createEmployee(
    page: Page,
    jsonFilename: string,
    firstName: string = "Mike",
    lastName: string = "Ross",
): Promise<string> {
    await page.getByRole("link", { name: "PIM" }).click();
    await page.getByRole("button", { name: " Add" }).click();

    const empId = generate9DigitId();
    console.log("🔢 Unique Employee ID:", empId);

    await page.getByPlaceholder("First Name").fill(firstName);
    await page.getByPlaceholder("Last Name").fill(lastName);
    await page
        .locator(
            "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/input",
        )
        .fill(empId);

    const employeeId = await page
        .locator(
            "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/input",
        )
        .inputValue();

    const filePath = path.join(__dirname, "..", "data", jsonFilename);
    fs.writeFileSync(filePath, JSON.stringify({ employeeId }));

    await page.getByRole("button", { name: "Save" }).click();
    // eslint-disable-next-line playwright/require-soft-assertions
    await expect(page.getByText("Contact Details")).toBeVisible();
    // eslint-disable-next-line playwright/require-soft-assertions
    await expect(page.getByText("Employee Full Name")).toBeVisible();

    return employeeId;
}
