import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { generate9DigitId } from "./generateEmpID"; // Make sure this exists

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
