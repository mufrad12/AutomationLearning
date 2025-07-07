import { Page } from "@playwright/test";

/**
 * Navigates the browser to a specified URL and logs the action.
 *
 * If navigation fails, logs an error and rethrows the exception.
 *
 * @param {Page} page - The Playwright page object representing the browser tab.
 * @param {string} url - The URL to navigate to.
 * @param {string} [description="Page"] - A descriptive name for logging purposes.
 * @returns {Promise<void>}
 * @throws Will throw an error if navigation fails.
 */
export async function navigateTo(
    page: Page,
    url: string,
    description = "Page",
): Promise<void> {
    try {
        await page.goto(url);
        console.log(`✅ Navigated to ${description}: ${url}`);
    } catch (error) {
        console.error(`❌ Failed to navigate to ${description}:`, error);
        throw error;
    }
}
