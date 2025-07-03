import { Locator } from "@playwright/test";

export async function uploadFile(
    fileInput: Locator,
    filePath: string,
    description = "File Input",
) {
    try {
        await fileInput.setInputFiles(filePath);
        console.log(`✅ Uploaded file ${filePath} to ${description}`);
    } catch (error) {
        console.error(`❌ Failed to upload file to ${description}:`, error);
        throw error;
    }
}
