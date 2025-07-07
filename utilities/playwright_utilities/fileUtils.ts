import * as fs from "fs";

/**
 * Reads a JSON file from the specified file path and parses its contents.
 *
 * @param {string} filePath - The path to the JSON file to read.
 * @returns {any} The parsed contents of the JSON file.
 */
export function readJsonFile(filePath: string): any {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/**
 * Writes the provided data to a JSON file at the specified file path.
 * Overwrites the file if it already exists.
 *
 * @param {string} filePath - The path to the JSON file to write.
 * @param {any} data - The data to be written to the file.
 * @returns {void}
 */
export function writeJsonFile(filePath: string, data: any): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * Clears the contents of a JSON file by writing an empty employeeId.
 *
 * @param {string} filePath - The path to the JSON file to clear.
 * @returns {void}
 */
export function clearJsonFile(filePath: string): void {
    writeJsonFile(filePath, { employeeId: "" });
}
