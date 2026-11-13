import { useState } from 'react';

const API_URL = 'http://localhost:3000';

export default function AdoptionForm({ animal }) {

    // Määritellään lomakkeen data
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        description: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);


    // Kun lomakkeen kenttien sisältöä muutetaan, päivitetään data setFormData -avulla
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Kun lomake lähetetään, data lähetetään rajapinnalle
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {

            const response = await fetch(`${API_URL}/animals/${animal.id}/adopt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Hakemuksen lähetys epäonnistui.');
            }

            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        }
    };

    // Kun lomake on lähetetty, näytetään kiitosviesti
    if (submitted) {
        return (
            <section className="formcontainer" aria-live="polite">
                <p className="success-message">Kiitos adoptiohakemuksestasi! Olemme sinuun pian yhteydessä.</p>
            </section>
        );
    }

    // Jos eläin on varattu, lomake on piilotettu eli sisältöä ei ole
    if (animal.status !== "Adoptoitavissa") {
        return (
            <></>
        )
    }

    return (
        <section className="formcontainer" aria-labelledby="adoption-form-title">
            <h2 id="adoption-form-title">Adoptoi {animal.name}</h2>
            <p className="form-description">Lähetä adoptiohakemus. Varaamme eläimen sinulle ja tutustumme tietoihisi. Tämän jälkeen otamme yhteyttä sinuun ja selvitämme, löytyisikö juuri sinulta tälle eläimelle uusi koti.</p>

            {error && <p className="error-message" role="alert">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="adopter-name">Nimi</label>
                    <input
                        id="adopter-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="adopter-phone">Puhelinnumero</label>
                    <input
                        id="adopter-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="adopter-email">Sähköposti</label>
                    <input
                        id="adopter-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="adopter-address">Osoite</label>
                    <input
                        id="adopter-address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="adopter-description">Miksi haluat adoptoida tämän eläimen?</label>
                    <textarea
                        id="adopter-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Lähetä hakemus</button>
            </form>
        </section>
    );
}