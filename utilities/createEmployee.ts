import { Page, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { generate9DigitId } from "./generateEmpID";

export async function createEmployee(
    page: Page,
    jsonFilename: string,
): Promise<string> {
    // 1) Generate data
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const empId = generate9DigitId();
    console.log("🔢 Unique Employee ID:", empId);

    // 2) Navigate & fill
    await page.getByRole("link", { name: "PIM" }).click();
    await page.getByRole("button", { name: " Add" }).click();
    await page.getByPlaceholder("First Name").fill(firstName);
    await page.getByPlaceholder("Last Name").fill(lastName);
    await page
        .locator(
            "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/input",
        )
        .fill(empId);

    // 3) Capture back the actual ID value
    const employeeId = await page
        .locator(
            "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/input",
        )
        .inputValue();

    // 4) Ensure <projectRoot>/tests/data exists
    const dataDir = path.resolve(process.cwd(), "tests", "data");
    // eslint-disable-next-line curly
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    // 5) Write JSON under tests/data
    const filePath = path.join(dataDir, jsonFilename);
    fs.writeFileSync(filePath, JSON.stringify({ employeeId }, null, 2));

    // 6) Save & verify
    await page.getByRole("button", { name: "Save" }).click();
    // eslint-disable-next-line playwright/require-soft-assertions
    await expect(page.getByText("Contact Details")).toBeVisible();
    // eslint-disable-next-line playwright/require-soft-assertions
    await expect(page.getByText("Employee Full Name")).toBeVisible();

    console.log(`👤 Created: ${firstName} ${lastName} | ID: ${employeeId}`);
    return employeeId;
}
