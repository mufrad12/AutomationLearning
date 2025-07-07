import { Locator } from "@playwright/test";

/**
 * Retrieves the value of a given input field and logs the action.
 *
 * If the action fails, logs an error message and rethrows the error.
 *
 * @param {Locator} element - The Playwright locator representing the input field.
 * @param {string} [description="Input Field"] - A description of the input field, used in logs.
 * @returns {Promise<string>} The current value of the input field.
 * @throws Will throw an error if retrieving the input value fails.
 */
export async function getInputValue(
    element: Locator,
    description = "Input Field",
): Promise<string> {
    try {
        const value = await element.inputValue();
        console.log(`✅ Got value "${value}" from ${description}`);
        return value;
    } catch (error) {
        console.error(
            `❌ Failed to get input value from ${description}:`,
            error,
        );
        throw error;
    }
}
