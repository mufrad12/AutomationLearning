import { Page } from "@playwright/test";

export async function navigateTo(
    page: Page,
    url: string,
    description = "Page",
) {
    try {
        await page.goto(url);
        console.log(`✅ Navigated to ${description}: ${url}`);
    } catch (error) {
        console.error(`❌ Failed to navigate to ${description}:`, error);
        throw error;
    }
}
