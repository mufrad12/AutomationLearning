import { test } from "@playwright/test";
import { login } from "./utils/login";
import { createEmployee } from "./utils/createEmployee";

test.describe("Add Employee", () => {
    test("Should add employee and save ID", async ({ page }) => {
        await login(page);
        await createEmployee(page, "create_employee.json", "Mike", "Ross");
    });
});
