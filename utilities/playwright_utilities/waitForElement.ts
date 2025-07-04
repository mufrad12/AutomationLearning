import { Locator } from "@playwright/test";

/**
 * Waits for the specified element to appear on the page within a given timeout.
 *
 * If the element does not appear within the timeout, logs an error and throws.
 *
 * @param {Locator} element - The Playwright locator of the element to wait for.
 * @param {number} [timeout=5000] - Maximum wait time in milliseconds (default 5000ms).
 * @param {string} [description="Element"] - Description of the element for logging.
 * @returns {Promise<void>}
 * @throws Will throw an error if the element does not appear within the timeout.
 */
export async function waitForElement(
    element: Locator,
    timeout = 5000,
    description = "Element",
): Promise<void> {
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
