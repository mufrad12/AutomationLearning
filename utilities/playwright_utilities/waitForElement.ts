import { Locator } from "@playwright/test";

export async function waitForElement(
    element: Locator,
    timeout = 5000,
    description = "Element",
) {
    try {
        await element.waitFor({ timeout });
        console.log(`✅ ${description} appeared on the page.`);
    } catch (error) {
        console.error(
            `❌ ${description} did not appear within ${timeout} ms`,
            error,
        );
        throw error;
    }
}
