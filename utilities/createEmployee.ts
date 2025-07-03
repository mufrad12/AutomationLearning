import { Page } from "@playwright/test";
import path from "path";
import { faker } from "@faker-js/faker";
import { generate9DigitId } from "./generateEmpID";
import { fillInput } from "./playwright_utilities/fill";
import { clickElement } from "./playwright_utilities/click";
import { getInputValue } from "./playwright_utilities/getInputValue";
import { assertVisible } from "./playwright_utilities/assert";
import { writeJsonFile } from "./playwright_utilities/fileUtils";
import { EmployeePage } from "page_objects/EmployeePage";

export async function createEmployee(
    page: Page,
    jsonFilename: string,
): Promise<string> {
    // 1) Generate employee data
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const empId = generate9DigitId();
    console.log("🔢 Unique Employee ID:", empId);

    const employeePage = new EmployeePage(page);

    // 2) Navigate to Add Employee page
    await clickElement(employeePage.getPimMenu(), page, "PIM Menu");
    await clickElement(
        employeePage.getAddButton(),
        page,
        "Add Employee Button",
    );

    // 3) Fill form fields
    await fillInput(
        employeePage.getFirstNameInput(),
        firstName,
        "First Name Field",
    );
    await fillInput(
        employeePage.getLastNameInput(),
        lastName,
        "Last Name Field",
    );

    const empIdField = employeePage.getEmployeeIdInput();
    await fillInput(empIdField, empId, "Employee ID Field");

    // 4) Get the actual value of Employee ID
    const employeeId = await getInputValue(empIdField, "Employee ID Field");

    // 5) Write the employee ID to JSON file
    const dataDir = path.resolve(process.cwd(), "tests", "data");
    const filePath = path.join(dataDir, jsonFilename);
    writeJsonFile(filePath, { employeeId });

    // 6) Save the form and assert
    await clickElement(employeePage.getSaveButton(), page, "Save Button");
    await assertVisible(
        page.getByText("Contact Details"),
        "Contact Details Section",
    );
    await assertVisible(
        page.getByText("Employee Full Name"),
        "Employee Full Name Section",
    );

    console.log(`👤 Created: ${firstName} ${lastName} | ID: ${employeeId}`);
    return employeeId;
}
