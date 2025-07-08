import fs from "fs";
import path from "path";
import { Browser, Page } from "@playwright/test";
import { login } from "./login";

const authPath = path.resolve(__dirname, "./fixtures/auth.json");

interface AuthParams {
    username: string;
    password: string;
    loginUrl: string;
    dashboardUrl: string;
}

export async function getAuthenticatedPage(
    browser: Browser,
    params: AuthParams,
): Promise<Page> {
    if (fs.existsSync(authPath)) {
        const context = await browser.newContext({ storageState: authPath });
        const page = await context.newPage();
        await page.goto(params.dashboardUrl);
        if (page.url().includes("auth/login")) {
            console.log("⚠️ Session expired, logging in again...");
            await context.close();
            return await freshLogin(browser, params);
        }
        console.log("✅ Session restored from auth.json");
        return page;
    }
    return await freshLogin(browser, params);
}

async function freshLogin(browser: Browser, params: AuthParams): Promise<Page> {
    const context = await browser.newContext();
    const page = await context.newPage();

    await login(page, params.username, params.password, params.loginUrl);

    // Ensure folder exists before writing
    fs.mkdirSync(path.dirname(authPath), { recursive: true });
    const storage = await context.storageState();
    fs.writeFileSync(authPath, JSON.stringify(storage, null, 2));
    console.log("✅ New session saved to auth.json");

    return page;
}
