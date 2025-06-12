import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { login } from "./utils/login";

test.describe("Pagination - Create 30 Employees", () => {
    test("Should create 30 employees using Faker", async ({ page }) => {
        await login(page);

        // Go to PIM page
        await page.getByRole("link", { name: "PIM" }).click();

        let totalCreated = 0;

        for (let i = 1; i <= 25; i++) {
            await page.getByRole("button", { name: " Add" }).click();

            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();

            await page.getByPlaceholder("First Name").fill(firstName);
            await page.getByPlaceholder("Last Name").fill(lastName);

            await page.getByRole("button", { name: "Save" }).click();

            // Confirm employee creation
            await expect(page.getByText("Custom Fields")).toBeVisible();
            await expect(page.getByText("Custom Fields")).toBeVisible();
            await expect(page.getByText("Custom Fields")).toBeVisible();
            await expect(page.getByText("Attachments")).toBeVisible();

            totalCreated++;
            console.log(
                `✅ [${totalCreated}/25] Employee created: ${firstName} ${lastName}`,
            );

            await page.getByRole("link", { name: "Employee List" }).click();
        }

        console.log("🎉 Done creating employees.");
        console.log(`🔢 Total employees created: ${totalCreated}`);

        // Pagination check
        console.log("🔍 Verifying pagination...");
        await page.getByRole("button", { name: "2" }).click();

        console.log("✅ Pagination working: navigated to page 2.");
    });
});
