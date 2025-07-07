import { Locator } from "@playwright/test";

/**
 * Fills a given input field with a specified value and logs the action.
 *
 * If the fill action fails, logs an error and rethrows the error.
 *
 * @param {Locator} element - The Playwright locator representing the input field.
 * @param {string} value - The value to be entered into the input field.
 * @param {string} [description="Input Field"] - A description of the input field, used in logs.
 * @returns {Promise<void>}
 * @throws Will throw an error if the fill action fails.
 */
export async function fillInput(
    element: Locator,
    value: string,
    description = "Input Field",
): Promise<void> {
    try {
        await element.fill(value);
        console.log(`✅ Filled ${description} with "${value}"`);
    } catch (error) {
        console.error(`❌ Failed to fill ${description}:`, error);
        throw error;
    }
}
