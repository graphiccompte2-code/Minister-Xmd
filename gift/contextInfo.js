const { getSetting } = require("./database/settings");

async function getContextInfo(mentionedJid = []) {
    const botName = await getSetting("BOT_NAME") || "𝐌𝐢𝐧𝐢𝐬𝐭𝐞𝐫-𝐗𝐦𝐝";
    const channelJid = await getSetting("NEWSLETTER_JID") || "120363325383451197@newsletter";
    return {
        mentionedJid,
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: channelJid,
            newsletterName: botName,
            serverMessageId: -1
        }
    };
}

module.exports = { getContextInfo };
