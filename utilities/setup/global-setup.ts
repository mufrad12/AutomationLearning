import { chromium } from "@playwright/test";
import path from "path";

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto("https://opensource-demo.orangehrmlive.com");

    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for dashboard to confirm login
    await page.waitForURL("**/dashboard/**");

    // Save storage state (cookies + localStorage)
    await page.context().storageState({
        path: path.resolve(__dirname, "../../../storageState.json"),
    });

    await browser.close();
}

export default globalSetup;
