import * as fs from "fs";

export function readJsonFile(filePath: string): any {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function writeJsonFile(filePath: string, data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function clearJsonFile(filePath: string) {
    writeJsonFile(filePath, { employeeId: "" });
}
