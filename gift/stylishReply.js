function stylishReply(text) {
    return `\`\`\`\n${text}\n\`\`\``;
}

function isStylish(text) {
    if (typeof text !== "string") return true;
    const t = text.trim();
    return t.startsWith("```") && t.endsWith("```");
}

function wrapIfNeeded(text) {
    if (typeof text !== "string") return text;
    if (text.length === 0) return text;
    if (isStylish(text)) return text;
    return stylishReply(text);
}

function applyStylishToMessage(msg) {
    if (!msg || typeof msg !== "object") return msg;
    if (msg.react || msg.delete || msg.edit !== undefined && !msg.text) {
        // pure react/delete payloads, leave alone
        if (msg.react || msg.delete) return msg;
    }
    if (typeof msg.text === "string") {
        msg.text = wrapIfNeeded(msg.text);
    }
    if (typeof msg.caption === "string") {
        msg.caption = wrapIfNeeded(msg.caption);
    }
    return msg;
}

function patchSendMessage(Gifted) {
    if (!Gifted || typeof Gifted.sendMessage !== "function") return;
    if (Gifted.__stylishPatched) return;
    const original = Gifted.sendMessage.bind(Gifted);
    Gifted.sendMessage = async function (jid, content, options) {
        try {
            applyStylishToMessage(content);
        } catch (_) {}
        return original(jid, content, options);
    };
    Gifted.__stylishPatched = true;
}

module.exports = { stylishReply, wrapIfNeeded, applyStylishToMessage, patchSendMessage };
