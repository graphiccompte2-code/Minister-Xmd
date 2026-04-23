const packageJson = require("../../package.json");

const DEFAULT_SETTINGS = {
    PREFIX: ".",
    OWNER_NAME: "𝐌𝐢𝐧𝐢𝐬𝐭𝐞𝐫",
    OWNER_NUMBER: "254791899446",
    BOT_NAME: "𝐌𝐢𝐧𝐢𝐬𝐭𝐞𝐫-𝐗𝐦𝐝",
    FOOTER: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌𝐢𝐧𝐢𝐬𝐭𝐞𝐫-Tech",
    CAPTION: "©𝟐𝟎𝟐𝟓 𝐌𝐢𝐧𝐢𝐬𝐭𝐞𝐫-𝐗𝐦𝐝 𝐕3",
    BOT_PIC: "https://files.catbox.moe/277hum.jpg",
    VERSION: packageJson.version || "3.0.0",
    MODE: "public",
    WARN_COUNT: "3",
    TIME_ZONE: "Africa/Nairobi",
    DM_PRESENCE: "online",
    GC_PRESENCE: "online",
    CHATBOT: "false",
    CHATBOT_MODE: "inbox",
    STARTING_MESSAGE: "true",
    ANTIDELETE: "indm",
    ANTI_EDIT: "indm",
    ANTICALL: "false",
    ANTICALL_MSG: "*_📞 Auto Call Reject Mode Active. 📵 No Calls Allowed!_*",
    AUTO_LIKE_STATUS: "true",
    AUTO_READ_STATUS: "true",
    STATUS_LIKE_EMOJIS: "💛,❤️,💜,🤍,💙",
    AUTO_REPLY_STATUS: "false",
    STATUS_REPLY_TEXT: "*ʏᴏᴜʀ sᴛᴀᴛᴜs ᴠɪᴇᴡᴇᴅ sᴜᴄᴄᴇssғᴜʟʟʏ ✅*",
    AUTO_REACT: "off",
    AUTO_REPLY: "false",
    AUTO_READ_MESSAGES: "off",
    AUTO_BIO: "false",
    AUTO_BLOCK: "",
    YT: "youtube.com/@mia_ktrap",
    NEWSLETTER_JID: "120363325383451197@newsletter",
    GC_JID: "K0fYnrnFSarF5rKHfEPWgF",
    NEWSLETTER_URL: "https://whatsapp.com/channel/0029VamMdLZ8fewqWt6Ei51y",
    BOT_REPO: "emkay416/minister-xmd",
    PACK_NAME: "𝐌𝐢𝐧𝐢𝐬𝐭𝐞𝐫-𝐗𝐦𝐝",
    PACK_AUTHOR: "𝐌𝐢𝐧𝐢𝐬𝐭𝐞𝐫 𝐓𝐄𝐂𝐇",
    SUDO_NUMBERS: "",
    PM_PERMIT: "false",
    ANTIVIEWONCE: "indm",
};

const settings = { ...DEFAULT_SETTINGS };
let initialized = false;

async function initializeSettings() {
    if (initialized) return;
    for (const [key, defaultValue] of Object.entries(DEFAULT_SETTINGS)) {
        if (settings[key] === undefined) {
            settings[key] = defaultValue;
        }
    }
    initialized = true;
    console.log("✅ Bot Settings Initialized");
}

async function getSetting(key) {
    if (!initialized) await initializeSettings();
    if (settings[key] !== undefined) return settings[key];
    return DEFAULT_SETTINGS[key] || null;
}

async function setSetting(key, value) {
    if (!initialized) await initializeSettings();
    settings[key] = value;
    return true;
}

async function getAllSettings() {
    if (!initialized) await initializeSettings();
    return { ...settings };
}

async function resetSetting(key) {
    if (!initialized) await initializeSettings();
    const defaultValue = DEFAULT_SETTINGS[key];
    if (defaultValue !== undefined) {
        settings[key] = defaultValue;
        return defaultValue;
    }
    return null;
}

async function resetAllSettings() {
    if (!initialized) await initializeSettings();
    for (const [key, defaultValue] of Object.entries(DEFAULT_SETTINGS)) {
        settings[key] = defaultValue;
    }
    return true;
}

module.exports = {
    SettingsDB: null,
    DEFAULT_SETTINGS,
    initializeSettings,
    getSetting,
    setSetting,
    getAllSettings,
    resetSetting,
    resetAllSettings,
};
