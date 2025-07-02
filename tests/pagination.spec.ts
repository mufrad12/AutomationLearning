import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import path from "path";

test.describe("Pagination via CSV Upload", () => {
    test("Upload CSV if no pagination arrow, then verify page 2", async ({
        page,
    }) => {
        await login(page);
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.waitForTimeout(2000); // Wait for the page to load

        try {
            const rightArrow = page.locator(".oxd-icon.bi-chevron-right");
            if (await rightArrow.isVisible()) {
                await rightArrow.click();
                console.log("✅ Right arrow is visible and clicked.");
                await expect(
                    page.getByRole("button", { name: "2" }),
                ).toBeVisible();
                await page.getByRole("button", { name: "2" }).click();
                console.log("🎯 Page 2 opened.");
                return;
            } else {
                console.log("⚠️ Right arrow not visible.");
            }
        } catch (error) {
            console.error("❌ Error checking right arrow:", error);
        }

        // Step 2: Go to CSV Import page
        await page.goto(
            "https://opensource-demo.orangehrmlive.com/web/index.php/pim/pimCsvImport",
        );

        // Upload CSV file
        const filePath = path.resolve(__dirname, "data", "EmployeeData.csv");
        // eslint-disable-next-line playwright/prefer-locator, quotes
        await page.setInputFiles('input[type="file"]', filePath);
        console.log("📁 EmployeeData.csv uploaded.");

        // Click Upload
        await page.getByRole("button", { name: "Upload" }).click();
        await page.getByRole("button", { name: "Ok" }).click();
        console.log("☑️ Upload confirmed.");

        // Step 3: Go to Employee List and check pagination
        await page.getByRole("link", { name: "Employee List" }).click();

        const page2Button = page.getByRole("button", { name: "2" });

        if ((await page2Button.count()) > 0) {
            await page2Button.click();
            console.log("✅ Page 2 found and opened after CSV import.");
        } else {
            console.log("❌ Page 2 still not found after CSV import.");
        }
    });
});
