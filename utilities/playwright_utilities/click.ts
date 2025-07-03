import { Locator, Page } from "@playwright/test";

export async function clickElement(
    element: Locator,
    page: Page,
    description = "Element",
) {
    try {
        await element.click();
        console.log(`✅ Clicked on ${description}`);
    } catch (error) {
        console.error(`❌ Failed to click on ${description}:`, error);
        await page.screenshot({ path: `error-click-${Date.now()}.png` });
        throw error;
    }
}
