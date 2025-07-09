import { Browser, Page } from "@playwright/test";
import fs from "fs";
import path from "path";

import { login } from "./login";

const authFilePath = path.resolve(process.cwd(), "tests", "data", "auth.json");
const EXPIRY_DURATION_MS = 10 * 60 * 1000; // 10 minutes

interface AuthFile {
    timestamp: number;
    storageState: any;
}

export async function getAuthenticatedState(browser: Browser): Promise<Page> {
    let useExistingAuth = false;

    if (fs.existsSync(authFilePath)) {
        const authFile: AuthFile = JSON.parse(
            fs.readFileSync(authFilePath, "utf-8"),
        );
        const fileAgeMs = Date.now() - authFile.timestamp;

        if (fileAgeMs < EXPIRY_DURATION_MS) {
            console.log("✅ Using cached auth.json");
            useExistingAuth = true;
        } else {
            console.log("⏰ auth.json expired. Logging in again...");
        }
    } else {
        console.log("🔑 auth.json not found. Logging in...");
    }

    let context;
    if (useExistingAuth) {
        const authFile: AuthFile = JSON.parse(
            fs.readFileSync(authFilePath, "utf-8"),
        );
        context = await browser.newContext({
            storageState: authFile.storageState,
        });
    } else {
        context = await browser.newContext();
        const page = await context.newPage();

        await login(page);

        // Save new auth state + timestamp
        const storageState = await context.storageState();
        const authData: AuthFile = {
            timestamp: Date.now(),
            storageState,
        };
        fs.writeFileSync(authFilePath, JSON.stringify(authData, null, 2));

        console.log("📂 Saved new auth.json");
    }

    const page = await context.newPage();
    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
    );
    return page;
}
