const express = require('express');
const path = require('path');
const cors = require('cors');

const {
    db,
    initDatabase
} = require('./database');

const app = express();

app.use(express.json());
app.use(cors());

// Tarjotaan images-kansio
app.use('/images', express.static(path.join(__dirname, 'images')));

// Alusta tietokanta
initDatabase();

// Kaikki eläimet
app.get('/animals', (req, res) => {
    try {
        const animals = db.prepare("SELECT * FROM animals ORDER BY id").all();
        res.json(animals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Yksi eläin ID:n perusteella
app.get('/animals/:id', (req, res) => {
    try {
        const animal = db
            .prepare("SELECT * FROM animals WHERE id = ?")
            .get(req.params.id);

        if (!animal) {
            return res.status(404).json({ error: "Eläintä ei löytynyt" });
        }
        res.json(animal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Adoptiohakemuksen vastaanotto (server a välittää tämän eteenpäin server b:lle)
app.post('/animals/:id/adopt', async (req, res) => {
    try {
        const animalId = req.params.id;
        const adoptionData = req.body;

        // Tarkistetaanko löytyykö eläintä ja onko vapaana
        const animal = db.prepare("SELECT * FROM animals WHERE id = ?").get(animalId);

        if (!animal) {
            return res.status(404).json({ error: "Eläintä ei löytynyt" });
        }

        if (animal.status !== 'Adoptoitavissa') {
            return res.status(400).json({ error: "Tästä eläimestä on jo vireillä adoptiohakemus tai se ei ole adoptoitavissa." });
        }

        // Tähän välitys server b:lle kun server b tehty

        res.json({
            success: true,
            message: "Adoptiohakemus vastaanotettu",
            animalId: animalId,
            data: adoptionData
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server A käynnissä: http://localhost:${PORT}`);
});