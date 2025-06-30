import { test, expect } from "@playwright/test";
import { login } from "./utils/login";
import { createEmployee } from "./utils/createEmployee";

const jsonFilename = "create_employee.json";

test.describe("Add Employee", () => {
    test("Should add employee and save ID", async ({ page }) => {
        await login(page);
        const empId = await createEmployee(page, jsonFilename);
        console.log("✅ Created Employee ID:", empId);
    });
});
