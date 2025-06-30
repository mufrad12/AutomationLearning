import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";
import { login } from "./utils/login";
import { createEmployee } from "./utils/createEmployee";

const jsonFilename = "delete_employee.json";
const filePath = path.join(__dirname, "data", jsonFilename);

test.describe("Delete Employee", () => {
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await login(page);
        await createEmployee(page, jsonFilename);
    });

    test("Should delete employee using saved ID and clear the file", async ({
        page,
    }) => {
        await login(page);
        const employeeId = JSON.parse(
            fs.readFileSync(filePath, "utf8"),
        ).employeeId;

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("textbox").nth(2).fill(employeeId);
        // await page
        //     .getByPlaceholder("Type for hints...")
        //     .first()
        //     .fill("Mike Ross");
        await page
            .getByRole("button", { name: "Search" })
            // eslint-disable-next-line playwright/no-force-option
            .click({ force: true });

        // eslint-disable-next-line playwright/require-soft-assertions
        await expect(page.getByText("Record Found")).toBeVisible();
        // eslint-disable-next-line playwright/no-force-option
        await page.getByRole("button", { name: "" }).click({ force: true });
        await page.getByRole("button", { name: "Yes, Delete" }).click();

        console.log(`🗑️ Deleted Employee ID: ${employeeId}`);
        //fs.writeFileSync(filePath, JSON.stringify({ employeeId: "" }));
        //console.log("🧹 File cleared.");
    });
});
