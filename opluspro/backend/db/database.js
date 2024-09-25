const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('C:/sqlite/mydatabase.db', (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
    } else {
        console.log('Connected to the oplus SQLite database.');  // This message confirms the connection
    }
});

module.exports = db;
