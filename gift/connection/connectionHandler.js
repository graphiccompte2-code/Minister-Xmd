const { Boom } = require("@hapi/boom");
const { DisconnectReason } = require("gifted-baileys");
const fs = require("fs-extra");
const path = require("path");
const { setupGroupCacheListeners } = require("./groupCache");

const RECONNECT_DELAY = 5000;
const MAX_RECONNECT_ATTEMPTS = 50;

let reconnectAttempts = 0;

const safeNewsletterFollow = async (Gifted, newsletterJid, silent = false) => {
    if (!newsletterJid) return false;
    try {
        await Gifted.newsletterFollow(newsletterJid);
        if (!silent) console.log(`✔️ Boss Channel Done: ${newsletterJid}`);
        return true;
    } catch (error) {
        if (!silent) {
            console.error(
                `⚠️ Channel follow failed for ${newsletterJid}:`,
                error.message,
            );
        }
        return false;
    }
};

const safeGroupAcceptInvite = async (Gifted, groupJid, silent = false) => {
    if (!groupJid) return false;
    try {
        await Gifted.groupAcceptInvite(groupJid);
        if (!silent) console.log(`✔️ Boss group Done: ${groupJid}`);
        return true;
    } catch (error) {
        if (silent) return false;
        switch (error.data) {
            case 409:
                console.log(`ℹ️ Already in group: ${groupJid}`);
                break;
            case 400:
                console.log(`⚠️ Invalid invite code for group: ${groupJid}`);
                break;
            case 403:
                console.log(`⚠️ No permission to join group: ${groupJid}`);
                break;
            default:
                console.error(
                    `⚠️ Group join failed for ${groupJid}:`,
                    error.message,
                );
        }
        return false;
    }
};

const setupConnectionHandler = (
    Gifted,
    sessionDir,
    startGifted,
    callbacks = {},
) => {
    setupGroupCacheListeners(Gifted);

    Gifted.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "connecting") {
            console.log("🌪️ Connecting Bot boss...");
            reconnectAttempts = 0;
        }

        if (connection === "open") {
            console.log("✔️ Connection Instance is Online");
            reconnectAttempts = 0;

            if (callbacks.onOpen) {
                await callbacks.onOpen(Gifted);
            }
        }

        if (connection === "close") {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log(`Connection closed due to: ${reason}`);

            const handleReconnect = () => {
                if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
                    console.error(
                        "Max reconnection attempts reached. Exiting...",
                    );
                    process.exit(1);
                }
                reconnectAttempts++;
                const delay = Math.min(
                    RECONNECT_DELAY * Math.pow(2, reconnectAttempts - 1),
                    300000,
                );
                console.log(
                    `🌪️ Reconnection attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS} in ${delay}ms...`,
                );
                setTimeout(() => startGifted(), delay);
            };

            switch (reason) {
                case DisconnectReason.badSession:
                    console.log(
                        "Expired session file, ..please scan again",
                    );
                    try {
                        await fs.remove(sessionDir);
                    } catch (e) {
                        console.error("Failed to remove session:", e);
                    }
                    process.exit(1);
                    break;

                case DisconnectReason.connectionReplaced:
                    console.log(
                        "Connection changed,  new session opened",
                    );
                    process.exit(1);
                    break;

                case DisconnectReason.loggedOut:
                    console.log(
                        "You've logged out, session deleted...please scan again",
                    );
                    try {
                        await fs.remove(sessionDir);
                    } catch (e) {
                        console.error("⚠️ Failed to remove session:", e);
                    }
                    process.exit(1);
                    break;

                case DisconnectReason.connectionClosed:
                case DisconnectReason.connectionLost:
                case DisconnectReason.restartRequired:
                    console.log("🌪️ Reconnecting...");
                    handleReconnect();
                    break;

                case DisconnectReason.timedOut:
                    console.log("timed out, reconnecting...");
                    setTimeout(() => handleReconnect(), RECONNECT_DELAY * 2);
                    break;

                default:
                    console.log(
                        `Unknown disconnect reason: ${reason}, attempting reconnection...`,
                    );
                    handleReconnect();
            }
        }
    });
};

module.exports = {
    safeNewsletterFollow,
    safeGroupAcceptInvite,
    setupConnectionHandler,
    RECONNECT_DELAY,
    MAX_RECONNECT_ATTEMPTS,
};
