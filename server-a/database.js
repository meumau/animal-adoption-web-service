const path = require('path');
const Database = require('better-sqlite3');

// Määritellään polku
const dbPath = path.join(__dirname, '../database/animals.db');
const db = new Database(dbPath);

// Otetaan foreign key -tarkistukset käyttöön
db.pragma('foreign_keys = ON');

function initDatabase() {
    // Luo eläimet-taulu
    db.exec(`
        CREATE TABLE IF NOT EXISTS animals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            age TEXT NOT NULL,
            breed TEXT NOT NULL,
            description TEXT NOT NULL,
            image_url TEXT NOT NULL,
            status TEXT DEFAULT 'Adoptoitavissa'
        )
  `);

    // Tarkistetaan onko taulu tyhjä
    const animalCount = db
        .prepare('SELECT COUNT(*) AS count FROM animals')
        .get();

    if (animalCount.count === 0) {
        console.log('Lisätään eläimet tietokantaan...');

        const animals = [
            [
                'Sami',
                'Koira',
                "3 vuotta",
                'Husky',
                'Sami on iloinen, energinen ja ihmisrakas nuori koira, joka nauttii pitkistä metsälenkeistä. Sami etsiikin aktiivista kotia.',
                '/images/koira1.jpg',
                'Adoptoitavissa'
            ],
            [
                'Minni',
                'Koira',
                "Noin 7-vuotias",
                'Sekarotuinen',
                'Minni on rauhallinen ja ihmisten seurassa viihtyvä koira. Vierastaa muita koiria, mutta pitää lapsista. Minni etsii rakastavaa loppuelämän kotia.',
                '/images/koira2.jpg',
                'Adoptoitavissa'
            ],
            [
                'Lennart',
                'Koira',
                "Noin 4-vuotias",
                'Dalmatialainen',
                'Lennart on pitkiä kävelyitä ja ulkoilmaa rakastava reipas koira, joka viihtyy hyvin lajitovereiden seurassa. Etsiikin ensisijaisesti kotia, jossa on jo entuudestaan koira.',
                '/images/koira3.jpg',
                'Adoptoitavissa'
            ],
            [
                'Tarmo',
                'Kissa',
                "Noin 8-vuotias",
                'Ei tiedossa',
                'Tarmo on rauhallinen kotikissa, joka tykkää viettää päivät loikoillen auringossa. Etsii rauhallista loppuelämän kotia.',
                '/images/kissa1.jpg',
                'Adoptoitavissa'
            ],
            [
                'Liisu',
                'Kissa',
                "7kk",
                'Maatiainen',
                'Liisu on leikkisä ja iloinen nuori kissa, joka vaatii paljon aktiviteetteja ja mieluiten myös lajitovereiden seuraa. Etsii pitkäaikaista kotia.',
                '/images/kissa2.jpg',
                'Adoptoitavissa'
            ],
            [
                'Fenix',
                'Kissa',
                "Noin 5-vuotias",
                'Ei tiedossa',
                'Fenix on itsenäinen ja rauhallinen kissa. Viihtyy hyvin omissa oloissaan, mutta ihmiseen kiintyessään tykkää olla rapsuteltavana. Etsii rauhallista kotia.',
                '/images/kissa3.jpg',
                'Adoptoitavissa'
            ],
            [
                'Minka',
                'Kani',
                "2 vuotta",
                'Ei tiedossa',
                'Minka on leikkisä ja ihmisistä pitävä kani, joka aktiivisesta elämästä. Etsii kotia, jossa kania on aikaa leikittää ja viihdyttää.',
                '/images/kani1.jpg',
                'Adoptoitavissa'
            ],
            [
                'Simppa',
                'Kani',
                "Noin 3-vuotias",
                'Ei tiedossa',
                'Simppa on hieman arka, mutta suloinen kani, joka tarvitsee aikaa ja rauhallista yhdessäoloa. Etsii rauhallista kotia.',
                '/images/kani2.jpg',
                'Adoptoitavissa'
            ],
            [
                'Leo',
                'Marsu',
                "Noin 1-vuotias",
                'Ei tiedossa',
                'Leo on leppoisa ja rauhallinen marsu. Leo on tottunut lajitovereiden seuraan ja etsiikin ensisijaisesti kotia, josta jo löytyy marsu.',
                '/images/marsu1.jpg',
                'Adoptoitavissa'
            ]
        ];

        const insertAnimal = db.prepare(`
            INSERT INTO animals
            (name, type, age, breed, description, image_url, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const insertAnimals = db.transaction((animalsList) => {
            for (const animal of animalsList) {
                insertAnimal.run(...animal);
            }
        });

        insertAnimals(animals);
        console.log('Eläimet lisätty!');
    }

    console.log('Tietokanta valmis.');
}

module.exports = {
    db,
    initDatabase
};