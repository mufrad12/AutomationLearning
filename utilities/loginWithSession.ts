import { Browser, Page } from "@playwright/test";
import { getAuthenticatedPage } from "./authManager";

export async function loginWithSession(browser: Browser): Promise<Page> {
    const authParams = {
        username: "Admin",
        password: "admin123",
        loginUrl:
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        dashboardUrl:
            "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
    };

    return getAuthenticatedPage(browser, authParams);
}
