import { test, Page } from "@playwright/test";
import { loginWithSession } from "../utilities/loginWithSession";
import { createEmployee } from "../utilities/createEmployee";

test.describe("Add Employee", () => {
    let page: Page; // <-- Explicitly declare type

    test.beforeEach(async ({ browser }) => {
        page = await loginWithSession(browser);
    });

    test("Should add employee and save ID", async () => {
        const empId = await createEmployee(page, "create_employee.json");
        console.log("✅ Created Employee ID:", empId);
    });
});
