import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { login } from "../utils/login";
import { generate9DigitId } from "../utils/generateEmpID";

test.describe("Pagination - Stop when Page 2 appears", () => {
    test("Should create employees until Page 2 appears", async ({ page }) => {
        await login(page);
        await page.getByRole("link", { name: "PIM" }).click();

        let createdCount = 0;

        while (true) {
            // Step 1: Check if Page 2 exists
            await page.getByRole("link", { name: "Employee List" }).click();
            // eslint-disable-next-line playwright/require-soft-assertions
            await expect(page.getByText("Employee Information")).toBeVisible();

            // eslint-disable-next-line playwright/require-soft-assertions
            await expect(page.getByText("OrangeHRM OS")).toBeVisible();
            // eslint-disable-next-line playwright/require-soft-assertions
            await expect(
                page.locator(".orangehrm-bottom-container"),
            ).toBeVisible();
            // Pause for debugging if needed
            await page.pause();

            const page2Locator = page
                .locator(".oxd-pagination-page-item")
                .filter({ hasText: "2" });

            const page2Count = await page2Locator.count();

            if (page2Count > 0) {
                console.log("✅ Page 2 is visible now.");
                await page2Locator.first().click();
                console.log("🎯 Pagination working: Navigated to Page 2.");
                break;
            }

            console.log("🔄 Page 2 not found. Creating a new employee...");

            // Step 2: Create Employee
            await page.getByRole("button", { name: " Add" }).click();

            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const generatedEmpId = generate9DigitId();

            await page.getByPlaceholder("First Name").fill(firstName);
            await page.getByPlaceholder("Last Name").fill(lastName);
            await page
                .locator("form")
                .getByRole("textbox")
                .nth(4)
                .fill(generatedEmpId);

            await page.getByRole("button", { name: "Save" }).click();

            await expect(page.getByText("Custom Fields")).toBeVisible();
            await expect(page.getByText("Attachments")).toBeVisible();

            createdCount++;
            console.log(
                `✅ [${createdCount}] Created: ${firstName} ${lastName} (ID: ${generatedEmpId})`,
            );
        }

        console.log(`🏁 Done after creating ${createdCount} employees.`);
    });
});
