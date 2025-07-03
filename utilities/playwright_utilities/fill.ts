import { Locator } from "@playwright/test";

export async function fillInput(
    element: Locator,
    value: string,
    description = "Input Field",
) {
    try {
        await element.fill(value);
        console.log(`✅ Filled ${description} with "${value}"`);
    } catch (error) {
        console.error(`❌ Failed to fill ${description}:`, error);
        throw error;
    }
}
