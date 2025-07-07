import { Locator } from "@playwright/test";

/**
 * Uploads a file to a file input element and logs the action.
 *
 * If the upload fails, logs an error and rethrows the exception.
 *
 * @param {Locator} fileInput - The Playwright locator for the file input element.
 * @param {string} filePath - The path of the file to upload.
 * @param {string} [description="File Input"] - A description of the file input element for logging.
 * @returns {Promise<void>}
 * @throws Will throw an error if the file upload fails.
 */
export async function uploadFile(
    fileInput: Locator,
    filePath: string,
    description = "File Input",
): Promise<void> {
    try {
        await fileInput.setInputFiles(filePath);
        console.log(`✅ Uploaded file ${filePath} to ${description}`);
    } catch (error) {
        console.error(`❌ Failed to upload file to ${description}:`, error);
        throw error;
    }
}
