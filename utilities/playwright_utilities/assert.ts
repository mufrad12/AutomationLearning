import { Locator, expect } from "@playwright/test";

export async function assertVisible(element: Locator, description = "Element") {
    try {
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(element).toBeVisible();
        console.log(`✅ ${description} is visible.`);
    } catch (error) {
        console.error(`❌ ${description} is not visible:`, error);
        throw error;
    }
}
