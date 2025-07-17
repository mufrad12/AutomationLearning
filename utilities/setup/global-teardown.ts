// global-teardown.ts
import fs from "fs";
import path from "path";

const authFilePath = path.resolve(
    process.cwd(),
    "tests",
    "data",
    "global_auth.json",
);

export default async function globalTeardown() {
    if (fs.existsSync(authFilePath)) {
        fs.unlinkSync(authFilePath);
        console.log("🗑️ Global Teardown: auth.json removed");
    }
}
