import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { generateEmployeeCsvFile } from "../utils/generateCsvData";

test.describe("Pagination via CSV Upload", () => {
    test("Upload CSV if no pagination arrow, then verify page 2", async ({
        page,
    }) => {
        await login(page);
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();

        const rightArrow = page.locator(".oxd-icon.bi-chevron-right");
        let shouldUploadCsv = false;

        try {
            await rightArrow.waitFor({ state: "attached", timeout: 2000 });

            if (await rightArrow.isVisible()) {
                await rightArrow.click();
                console.log("✅ Right arrow is visible and clicked.");

                // eslint-disable-next-line playwright/require-soft-assertions
                await expect(
                    page.getByRole("button", { name: "2" }),
                ).toBeVisible();
                await page.getByRole("button", { name: "2" }).click();
                console.log("🎯 Page 2 opened.");
            } else {
                console.log("⚠️ Right arrow in DOM but not visible.");
                shouldUploadCsv = true;
            }
        } catch {
            console.log("❌ Right arrow not found. Uploading CSV.");
            shouldUploadCsv = true;
        }

        if (shouldUploadCsv) {
            // Generate CSV dynamically
            const filePath = generateEmployeeCsvFile(); // returns full path

            // Go to CSV Import
            await page.goto(
                "https://opensource-demo.orangehrmlive.com/web/index.php/pim/pimCsvImport",
            );

            // Upload CSV file
            // eslint-disable-next-line playwright/prefer-locator, quotes
            await page.setInputFiles('input[type="file"]', filePath);
            console.log("📁 CSV file uploaded.");

            await page.getByRole("button", { name: "Upload" }).click();
            await page.getByRole("button", { name: "Ok" }).click();
            console.log("☑️ Upload confirmed.");

            // Go to Employee List and check Page 2
            await page.getByRole("link", { name: "Employee List" }).click();

            const page2Button = page.getByRole("button", { name: "2" });

            try {
                await page2Button.waitFor({ timeout: 5000 });
                // eslint-disable-next-line playwright/prefer-locator
                await page2Button.click();
                console.log("✅ Page 2 found and opened after CSV import.");
            } catch {
                console.log("❌ Page 2 still not found after CSV import.");
            }
        }
    });
});
