const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./expense-tracker.db');

db.serialize(() => {
    // Create transactions table
    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            category TEXT,
            amount REAL,
            date TEXT,
            description TEXT
        )
    `);
});

module.exports = db;