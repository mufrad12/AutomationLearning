import { test } from "playwright/test";

// eslint-disable-next-line playwright/require-top-level-describe
test("Orange HRM", async ({ page }) => {
    // ------ URL ---------
    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    // -------- Login ---------
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();

    console.log("Login Complete");
    // await page.waitForTimeout(5000);

    // --------- Navigate to PIM View ---------
    await page.getByRole("link", { name: "PIM" }).click();
    console.log("Navigate to PIM");

    // --------- Add Employee ---------
    await page.getByRole("button", { name: " Add" }).click();
    console.log("Add Employee Page");
    await page.getByPlaceholder("First Name").fill("Ratul");
    await page.getByPlaceholder("Last Name").fill("Bossss");

    // Locate and capture the Employee ID field before saving
    const employeeIdInput = page.locator("form").getByRole("textbox").nth(4);
    const employeeId = await employeeIdInput.inputValue();
    console.log(`Captured Employee ID: ${employeeId}`);

    // Click the save button to create the employee
    await page.getByRole("button", { name: "Save" }).click();
    console.log("Employee creation saved");
    await page.waitForTimeout(4000);

    // --------- Search Employee ---------
    await page.getByRole("link", { name: "Employee List" }).click();
    console.log("Navigate to Employee List");

    // Fill the Employee ID in the search field
    await page.getByRole("textbox").nth(2).fill(employeeId);
    await page.getByRole("button", { name: "Search" }).click();
    await page.waitForTimeout(2000);
    console.log(`Searched for Employee ID: ${employeeId}`);

    //Edit the Employee
    // eslint-disable-next-line playwright/no-force-option
    await page.locator(".oxd-icon.bi-pencil-fill").click({ force: true });
    console.log("Clicked on Edit Employee");

    //await page.pause();
    //Check the employee edit page by checking the heading
    await page.getByRole("heading", { name: "Personal Details" });
    console.log("Employee Edit Page");

    //Update the employee details by choosing blood group
    await page
        .locator("form")
        .filter({ hasText: "Blood Type-- Select --" })
        .locator("i")
        .click();
    await page.getByRole("option", { name: "A+" }).click();

    await page
        .locator("form")
        .filter({ hasText: "Blood TypeA+Test_Field Save" })
        .getByRole("button")
        .click();
    console.log("Employee details updated successfully");

    // --------- Go back to Employee List for delete that employee ---------
    await page.getByRole("link", { name: "Employee List" }).click();
    console.log("Navigate to Employee List");

    // Fill the Employee ID in the search field to delete the employee
    await page.getByRole("textbox").nth(2).fill(employeeId);
    await page
        .getByPlaceholder("Type for hints...")
        .first()
        .fill("Ratul Bossss");
    await page.waitForTimeout(4000);
    await page.getByRole("button", { name: "Search" }).click();
    await page.waitForTimeout(4000);
    console.log(`Searched for Employee ID: ${employeeId}`);

    //Delete the Employee
    // eslint-disable-next-line playwright/no-force-option
    await page.getByRole("button", { name: "" }).click({ force: true });
    await page.getByRole("button", { name: "Yes, Delete" }).click();
    console.log("Employee deleted successfully");

    // --------- Navigate to Employee List for pagination ---------
    await page.getByRole("link", { name: "Employee List" }).click();
    console.log("Navigate to Employee List");

    //Pagination Employee List to second page
    await page.getByRole("button", { name: "2" }).click();
    await page.waitForTimeout(2000);
    console.log("Navigated to page 2 of Employee List");
});
