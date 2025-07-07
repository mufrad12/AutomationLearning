import { Locator, expect } from "@playwright/test";

/**
 * Asserts that a given element is visible on the page.
 *
 * If the element is visible, logs a success message.
 * If the element is not visible, logs an error message and rethrows the error.
 *
 * @param {Locator} element - The Playwright locator for the element to be checked.
 * @param {string} [description="Element"] - A description of the element used in logs.
 * @returns {Promise<void>}
 * @throws Will throw an error if the element is not visible.
 */
export async function assertVisible(
    element: Locator,
    description = "Element",
): Promise<void> {
    try {
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(element).toBeVisible();
        console.log(`✅ ${description} is visible.`);
    } catch (error) {
        console.error(`❌ ${description} is not visible:`, error);
        throw error;
    }
}
