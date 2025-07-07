import { test } from "@playwright/test";
import { login } from "../utilities/login";
import { createEmployee } from "../utilities/createEmployee";

test.describe("Add Employee", () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test("Should add employee and save ID", async ({ page }) => {
        const empId = await createEmployee(page, "create_employee.json");
        console.log("✅ Created Employee ID:", empId);
    });
});
