const DEFAULT_DEV_NUMBERS = [
    '254791899446',
    '254769365617',
    '584269337162',
];

function parseList(value) {
    if (!value) return [];
    return String(value)
        .split(/[,\s]+/)
        .map((n) => n.trim().replace(/\D/g, ''))
        .filter((n) => n.length > 5);
}

async function getDevNumbers() {
    let extras = [];
    try {
        const { getSetting } = require('./database/settings');
        extras = parseList(await getSetting('DEV_NUMBERS'));
    } catch (_) {}
    return Array.from(new Set([...DEFAULT_DEV_NUMBERS, ...extras]));
}

function getDevNumbersSync(settings) {
    const extras = parseList(settings && settings.DEV_NUMBERS);
    return Array.from(new Set([...DEFAULT_DEV_NUMBERS, ...extras]));
}

module.exports = { DEFAULT_DEV_NUMBERS, getDevNumbers, getDevNumbersSync, parseList };
