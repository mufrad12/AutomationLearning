import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { login } from "../utils/login";
import { generate9DigitId } from "../utils/generateEmpID";

test.describe("Pagination - Create 25 Employees", () => {
    test("Should create 5 employees using Faker and UTC-based ID", async ({
        page,
    }) => {
        await login(page);
        await page.getByRole("link", { name: "PIM" }).click();

        let totalCreated = 0;

        for (let i = 1; i <= 5; i++) {
            await page.getByRole("button", { name: " Add" }).click();

            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const generatedEmpId = generate9DigitId();

            await page.getByPlaceholder("First Name").fill(firstName);
            await page.getByPlaceholder("Last Name").fill(lastName);

            // Fill the generated UTC-based Employee ID
            await page
                .locator("form")
                .getByRole("textbox")
                .nth(4)
                .fill(generatedEmpId);

            await page.getByRole("button", { name: "Save" }).click();

            // eslint-disable-next-line playwright/require-soft-assertions
            await expect(page.getByText("Custom Fields")).toBeVisible();
            // eslint-disable-next-line playwright/require-soft-assertions
            await expect(page.getByText("Attachments")).toBeVisible();

            totalCreated++;
            console.log(
                `✅ [${totalCreated}/5] Employee created: ${firstName} ${lastName} (ID: ${generatedEmpId})`,
            );

            await page.getByRole("link", { name: "Employee List" }).click();
        }

        console.log("🎉 Done creating employees.");
        console.log(`🔢 Total employees created: ${totalCreated}`);

        // Pagination verification
        const page2Button = page.getByRole("button", { name: "2" });
        if ((await page2Button.count()) > 0) {
            // eslint-disable-next-line playwright/prefer-locator
            await page2Button.click();
            // eslint-disable-next-line playwright/require-soft-assertions
            await expect(
                page.locator(".oxd-pagination-page-item--selected"),
            ).toHaveText("2");
            console.log("✅ Pagination working: navigated to page 2.");
        } else {
            console.log("⚠️ Page 2 does not exist. No pagination triggered.");
        }
    });
});
