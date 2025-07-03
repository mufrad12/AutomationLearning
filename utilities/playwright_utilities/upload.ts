import { Page } from "@playwright/test";

export async function uploadFile(
    page: Page,
    fileInputSelector: string,
    filePath: string,
    description = "File Input",
) {
    try {
        // eslint-disable-next-line playwright/prefer-locator
        await page.setInputFiles(fileInputSelector, filePath);
        console.log(`✅ Uploaded file ${filePath} to ${description}`);
    } catch (error) {
        console.error(`❌ Failed to upload file to ${description}:`, error);
        throw error;
    }
}
