import { test } from "@playwright/test";
import { login } from "./utils/login";

test.describe("Pagination", () => {
    test("Should navigate to second page of employees", async ({ page }) => {
        await login(page);
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("button", { name: "2" }).click();
        console.log("📄 Navigated to page 2");
    });
});
