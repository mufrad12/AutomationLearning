export function generate9DigitId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const raw = `${timestamp}${random}`;

    const base36 = parseInt(raw).toString(36);
    const hash = Math.abs(hashCode(base36)).toString();

    return hash.padStart(9, "0").slice(0, 9);
}

function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash;
}
