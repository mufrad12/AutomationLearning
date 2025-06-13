import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { login } from "./utils/login";

test.describe("Pagination - Create 25 Employees", () => {
    test("Should create 25 employees using Faker", async ({ page }) => {
        // ⏱ Set custom timeout for this test only
        test.setTimeout(300_000); // 5 minutes

        await login(page);
        await page.getByRole("link", { name: "PIM" }).click();

        let totalCreated = 0;

        for (let i = 1; i <= 25; i++) {
            await page.getByRole("button", { name: " Add" }).click();

            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();

            await page.getByPlaceholder("First Name").fill(firstName);
            await page.getByPlaceholder("Last Name").fill(lastName);
            await page.getByRole("button", { name: "Save" }).click();

            // eslint-disable-next-line playwright/require-soft-assertions
            await expect(page.getByText("Custom Fields")).toBeVisible();
            // eslint-disable-next-line playwright/require-soft-assertions
            await expect(page.getByText("Attachments")).toBeVisible();

            totalCreated++;
            console.log(
                `✅ [${totalCreated}/25] Employee created: ${firstName} ${lastName}`,
            );

            await page.getByRole("link", { name: "Employee List" }).click();
        }

        console.log("🎉 Done creating employees.");
        console.log(`🔢 Total employees created: ${totalCreated}`);

        // Verify pagination
        console.log("🔍 Verifying pagination...");
        await page.getByRole("button", { name: "2" }).click();
        console.log("✅ Pagination working: navigated to page 2.");
    });
});
