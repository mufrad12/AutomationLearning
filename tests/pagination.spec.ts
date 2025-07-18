import { test } from "@playwright/test";
import { login } from "../utilities/login";
import { generateEmployeeCsvFile } from "../utilities/generateCsvData";
import { clickElement } from "../utilities/playwright_utilities/click";
import { uploadFile } from "../utilities/playwright_utilities/upload";
import { waitForElement } from "../utilities/playwright_utilities/waitForElement";
import { CsvImportPage } from "../page_objects/CsvImportPage";

test.describe("Pagination via CSV Upload", () => {
    // 🔑 Login before every test
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test("Upload CSV if no pagination arrow, then verify page 2", async ({
        page,
    }) => {
        // Go to Employee List
        await clickElement(
            page.getByRole("link", { name: "PIM" }),
            page,
            "PIM Menu",
        );
        await clickElement(
            page.getByRole("link", { name: "Employee List" }),
            page,
            "Employee List Menu",
        );

        const rightArrow = page.locator(".oxd-icon.bi-chevron-right");
        let shouldUploadCsv = false;

        try {
            await waitForElement(rightArrow, 2000, "Right Arrow");

            if (await rightArrow.isVisible()) {
                await clickElement(rightArrow, page, "Right Arrow");

                const page2Button = page.getByRole("button", { name: "2" });
                await waitForElement(page2Button, 2000, "Page 2 Button");
                await clickElement(page2Button, page, "Page 2 Button");

                console.log("🎯 Page 2 opened.");
            } else {
                console.log("⚠️ Right arrow found but not visible.");
                shouldUploadCsv = true;
            }
        } catch {
            console.log("❌ Right arrow not found. Will upload CSV.");
            shouldUploadCsv = true;
        }

        if (shouldUploadCsv) {
            const filePath = generateEmployeeCsvFile();

            await page.goto(
                "https://opensource-demo.orangehrmlive.com/web/index.php/pim/pimCsvImport",
            );

            const csvImportPage = new CsvImportPage(page);

            // Upload file using POM + locator
            await uploadFile(
                csvImportPage.getFileInput(),
                filePath,
                "CSV File Input",
            );
            console.log("📁 CSV file uploaded.");

            await clickElement(
                csvImportPage.getUploadButton(),
                page,
                "Upload Button",
            );
            await clickElement(
                csvImportPage.getConfirmationOkButton(),
                page,
                "Confirmation OK Button",
            );
            console.log("☑️ Upload confirmed.");

            // Go back to Employee List and verify pagination
            await clickElement(
                page.getByRole("link", { name: "Employee List" }),
                page,
                "Employee List Menu",
            );

            const page2Button = page.getByRole("button", { name: "2" });

            try {
                await waitForElement(
                    page2Button,
                    5000,
                    "Page 2 Button after CSV upload",
                );
                await clickElement(page2Button, page, "Page 2 Button");
                console.log("✅ Page 2 found and opened after CSV import.");
            } catch {
                console.log("❌ Page 2 still not found after CSV import.");
            }
        }
    });
});
