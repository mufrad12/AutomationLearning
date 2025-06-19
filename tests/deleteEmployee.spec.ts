import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "./utils/login";

const deleteFilePath = path.join(__dirname, "delete_employee.json");

test.describe("Delete Employee", () => {
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await login(page);

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("button", { name: " Add" }).click();

        const utcTimeMillis: number = Date.now();
        console.log("🕒 UTC Timestamp for ID:", utcTimeMillis);

        const firstName = "Ratul";
        const lastName = "Boss";

        await page.getByPlaceholder("First Name").fill(firstName);
        await page.getByPlaceholder("Last Name").fill(lastName);
        await page.getByRole("textbox").nth(4).fill(utcTimeMillis.toString());

        const employeeId = await page.getByRole("textbox").nth(4).inputValue();

        fs.writeFileSync(deleteFilePath, JSON.stringify({ employeeId }));

        await page.getByRole("button", { name: "Save" }).click();
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Contact Details")).toBeVisible();
        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Employee Full Name")).toBeVisible();
    });

    test("Should delete employee using saved ID and clear the file", async ({
        page,
    }) => {
        await login(page);

        const employeeData = JSON.parse(
            fs.readFileSync(deleteFilePath, "utf8"),
        );
        const employeeId = employeeData.employeeId;

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();

        await page.getByRole("textbox").nth(2).fill(employeeId);
        await page
            .getByPlaceholder("Type for hints...")
            .first()
            .fill("Ratul Boss");
        await page.getByRole("button", { name: "Search" }).click();

        await expect(page.getByText("Records Found")).toBeVisible();
        // eslint-disable-next-line playwright/no-force-option
        await page.getByRole("button", { name: "" }).click({ force: true });
        await page.getByRole("button", { name: "Yes, Delete" }).click();

        console.log(`🗑️ Employee with ID ${employeeId} deleted.`);

        fs.writeFileSync(deleteFilePath, JSON.stringify({ employeeId: "" }));
        console.log("🧹 delete_employee.json cleared.");
    });
});
