import { Locator } from "@playwright/test";

export async function getInputValue(
    element: Locator,
    description = "Input Field",
) {
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
