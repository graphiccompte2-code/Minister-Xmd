const DEFAULT_DEV_NUMBERS = [
    '254791899446',
    '254769365617',
    '254715206562',
    '254747746851',
    '254114018035',
    '254728782591',
    '254799916673',
    '254762016957',
    '254113174209',
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
