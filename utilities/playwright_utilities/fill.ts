import { Locator, expect } from "@playwright/test";

/**
 * Fills a given input field with a specified value and logs the action.
 * Ensures the element is visible before interacting.
 *
 * @param {Locator} element - The Playwright locator representing the input field.
 * @param {string} value - The value to be entered into the input field.
 * @param {string} [description="Input Field"] - A description of the input field, used in logs.
 */
export async function fillInput(
    element: Locator,
    value: string,
    description = "Input Field",
): Promise<void> {
    try {
        // Wait until the input is visible and enabled
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(element).toBeVisible({ timeout: 5000 });
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(element).toBeEnabled();

        // Fill the value
        await element.fill(value);
        console.log(`✅ Filled ${description} with "${value}"`);
    } catch (error) {
        console.error(`❌ Failed to fill ${description}:`, error);
        throw error;
    }
}
