/**
 * Generates a unique 9-digit numeric ID.
 *
 * The ID is created by combining the current timestamp and a random number,
 * then converting the result to base-36 and hashing it.
 * The final output is a numeric string exactly 9 digits long.
 *
 * @returns {string} A 9-digit unique numeric string.
 */
export function generate9DigitId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const raw = `${timestamp}${random}`;

    const base36 = parseInt(raw).toString(36);
    const hash = Math.abs(hashCode(base36)).toString();

    return hash.padStart(9, "0").slice(0, 9);
}

/**
 * Generates a hash code from a given string.
 *
 * This is a simple hashing function based on character codes and bit shifting,
 * similar to Java's `String.hashCode()` implementation.
 *
 * @param {string} str - The input string to hash.
 * @returns {number} The hash code as a 32-bit signed integer.
 */
function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    return hash;
}
