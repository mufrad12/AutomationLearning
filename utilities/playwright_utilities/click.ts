import { Locator, Page } from "@playwright/test";

/**
 * Clicks on a given element and logs the action.
 *
 * If the click fails, captures a screenshot and rethrows the error.
 *
 * @param {Locator} element - The Playwright locator representing the element to click.
 * @param {Page} page - The Playwright page object used to take a screenshot in case of an error.
 * @param {string} [description="Element"] - A description of the element, used in success or error logs.
 * @returns {Promise<void>}
 * @throws Will throw an error if the click action fails.
 */
export async function clickElement(
    element: Locator,
    page: Page,
    description = "Element",
): Promise<void> {
    try {
        await element.click();
        console.log(`✅ Clicked on ${description}`);
    } catch (error) {
        console.error(`❌ Failed to click on ${description}:`, error);
        await page.screenshot({ path: `error-click-${Date.now()}.png` });
        throw error;
    }
}
