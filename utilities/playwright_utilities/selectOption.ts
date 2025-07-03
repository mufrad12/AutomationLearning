import { Locator } from "@playwright/test";

export async function selectDropdownOption(
    element: Locator,
    optionValue: string,
    description = "Dropdown",
) {
    try {
        await element.selectOption(optionValue);
        console.log(`✅ Selected ${optionValue} in ${description}`);
    } catch (error) {
        console.error(`❌ Failed to select option in ${description}:`, error);
        throw error;
    }
}
