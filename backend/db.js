const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("journal.db");

db.serialize(() => {

  db.run(`
  CREATE TABLE IF NOT EXISTS journals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    ambience TEXT,
    text TEXT
  )`);

});

module.exports = db;
