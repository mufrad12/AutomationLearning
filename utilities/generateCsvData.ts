import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { generate9DigitId } from "./generateEmpID";

/**
 * Generates a CSV file containing employee data.
 *
 * Each row includes a first name, last name, and a unique 9-digit employee ID,
 * along with other empty fields matching the required CSV structure.
 * By default, it creates 60 employee records.
 *
 * The generated CSV file will be saved in the `tests/data/` directory.
 *
 * @param {string} [filename="EmployeeData.csv"] - The name of the generated CSV file.
 * @returns {string} The full file path of the generated CSV file.
 */
export function generateEmployeeCsvFile(filename: string = "EmployeeData.csv") {
    const headers = [
        "first_name",
        "middle_name",
        "last_name",
        "employee_id",
        "other_id",
        "driver's_license_no",
        "license_expiry_date",
        "gender",
        "marital_status",
        "nationality",
        "date_of_birth",
        "address_street_1",
        "address_street_2",
        "city",
        "state/province",
        "zip/postal_code",
        "country",
        "home_telephone",
        "mobile",
        "work_telephone",
        "work_email",
        "other_email",
    ];

    const rows = [headers.join(",")];

    for (let i = 0; i < 60; i++) {
        const row = [
            faker.name.firstName(),
            "",
            faker.name.lastName(),
            generate9DigitId(),
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
        ];
        rows.push(row.join(","));
    }

    const dataDir = path.join(__dirname, "..", "tests", "data");
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, filename);
    fs.writeFileSync(filePath, rows.join("\n"), "utf8");

    console.log(`✅ CSV generated: ${filePath}`);
    return filePath;
}
