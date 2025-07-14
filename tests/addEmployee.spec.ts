import { test } from "@playwright/test";
import { getAuthenticatedState } from "../utilities/fixtures/auth";
import { createEmployee } from "../utilities/createEmployee";
import { Page } from "@playwright/test";

let page: Page;

test.describe("Add Employee", () => {
    test.beforeEach(async ({ browser }) => {
        page = await getAuthenticatedState(browser);
    });

    test("Should add employee and save ID", async () => {
        const empId = await createEmployee(page, "create_employee.json");
        console.log("✅ Created Employee ID:", empId);
    });
});
