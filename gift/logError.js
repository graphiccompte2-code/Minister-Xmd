const MAX_BUFFER = 200;
const buffer = [];

function pushBuffer(entry) {
    buffer.push(entry);
    if (buffer.length > MAX_BUFFER) buffer.shift();
}

function logError(label, error) {
    const status = error?.response?.status;
    const code = error?.code;
    const msg =
        error?.response?.data?.message ||
        error?.message ||
        (typeof error === "string" ? error : "Unknown error");
    const tag = status ? `[${status}]` : code ? `[${code}]` : "";
    const line = `${label} ${tag}: ${msg}`.trim();
    const entry = {
        time: new Date().toISOString(),
        label,
        status: status || code || null,
        message: msg,
        line,
    };
    pushBuffer(entry);
    console.error(line);
}

function getRecentLogs(limit = 20) {
    const n = Math.max(1, Math.min(MAX_BUFFER, Number(limit) || 20));
    return buffer.slice(-n);
}

function clearLogs() {
    buffer.length = 0;
}

module.exports = { logError, getRecentLogs, clearLogs };
