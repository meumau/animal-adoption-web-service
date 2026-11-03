const path = require('path');
const Database = require('better-sqlite3');

// Määritellään polku
const dbPath = path.join(__dirname, '../database/animals.db');
const db = new Database(dbPath);

// Otetaan foreign key -tarkistukset käyttöön
db.pragma('foreign_keys = ON');

function initDatabase() {
    // Luo adoptiohakemukset-taulu
    db.exec(`
        CREATE TABLE IF NOT EXISTS applications(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            address TEXT NOT NULL,
            animalId INTEGER,
            description TEXT NOT NULL
        )
  `);

    console.log('Tietokanta valmis.');
}

module.exports = {
    db,
    initDatabase
};