const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

class DatabaseManager {
    static instance = null;

    static getInstance() {
        if (!DatabaseManager.instance) {
            const DEFAULT_SQLITE_PATH = path.join(__dirname, "database.db");
            const dbDir = path.dirname(DEFAULT_SQLITE_PATH);
            if (!fs.existsSync(dbDir)) {
                fs.mkdirSync(dbDir, { recursive: true });
            }

            DatabaseManager.instance = new Sequelize({
                dialect: "sqlite",
                storage: DEFAULT_SQLITE_PATH,
                logging: false,
                pool: {
                    max: 1,
                    min: 0,
                    acquire: 30000,
                    idle: 10000,
                },
                retry: {
                    max: 5,
                },
                dialectOptions: {
                    busyTimeout: 30000,
                },
            });
        }
        return DatabaseManager.instance;
    }
}

const DATABASE = DatabaseManager.getInstance();

async function syncDatabase() {
    try {
        await DATABASE.sync();
        console.log("✅ Database Synchronized.");
    } catch (error) {
        console.error("Error synchronizing the database:", error);
        throw error;
    }
}

module.exports = { DATABASE, syncDatabase };
