# Atassa-MD WhatsApp Bot

A multi-device WhatsApp bot built with Node.js + Baileys, packaged with an Express web server.

## Stack
- Node.js 20 (CommonJS)
- Express server on port 5000 (host `0.0.0.0` via default), serving `gift/gifted.html` at `/` and `/health`
- Baileys (`gifted-baileys`) for WhatsApp connection
- PostgreSQL (Neon) via `DATABASE_URL`, falling back to local SQLite at `gift/database/database.db`

## Replit Setup
- Workflow `Server` runs `node index.js` and exposes port 5000 (webview).
- The bot requires a `SESSION_ID` in `.env` to connect to WhatsApp. If missing/invalid, the web server still runs (the bot startup is wrapped in try/catch in `index.js`) and logs an informational message.
- Deployment configured as `vm` with run command `node index.js` (long-running bot).

## Files of note
- `index.js` — main entry; Express server + bot bootstrap
- `config.js` — env config loader
- `gift/` — bot core (connection, database, helpers, web UI)
- `gifted/` — command plugins
