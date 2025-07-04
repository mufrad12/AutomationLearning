import { Locator } from "@playwright/test";

/**
 * Selects an option in a dropdown element by its value and logs the action.
 *
 * If the selection fails, logs an error and rethrows the exception.
 *
 * @param {Locator} element - The Playwright locator representing the dropdown element.
 * @param {string} optionValue - The value attribute of the option to select.
 * @param {string} [description="Dropdown"] - A descriptive name for logging purposes.
 * @returns {Promise<void>}
 * @throws Will throw an error if selecting the option fails.
 */
export async function selectDropdownOption(
    element: Locator,
    optionValue: string,
    description = "Dropdown",
): Promise<void> {
    try {
        await element.selectOption(optionValue);
        console.log(`✅ Selected ${optionValue} in ${description}`);
    } catch (error) {
        console.error(`❌ Failed to select option in ${description}:`, error);
        throw error;
    }
}
