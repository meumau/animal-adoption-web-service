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

// Alusta tietokanta
initDatabase();

app.post('/adoptions', async (req, res) => {
    try {
        const { name, phone, email, address, animalId, description } = req.body;

        // Tallennetaan adoptiohakemus applications-tauluun
        const insertApplication = db.prepare(`
            INSERT INTO applications (name, phone, email, address, animalId, description)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        const result = insertApplication.run(name, phone, email, address, animalId, description);

        // Päivitetään kyseisen eläimen status animals-tauluun
        const updateAnimalStatus = db.prepare(`
            UPDATE animals 
            SET status = 'Varattu' 
            WHERE id = ?
        `);

        updateAnimalStatus.run(animalId);

        res.status(201).json({ 
            success: true, 
            message: "Adoptiohakemus vastaanotettu ja tallennettu onnistuneesti!",
            applicationId: result.lastInsertRowid 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server B käynnissä: http://localhost:${PORT}`);
});