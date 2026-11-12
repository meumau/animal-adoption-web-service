const API_URL = 'http://localhost:3000';

export default function AnimalCards({ animals }) {
    return (
        <div className="cardscontainer">
            {animals.map((animal, index) => (
                <div className="card" key={index}>
                    <img className="cardimage" src={`${API_URL}${animal.image_url}`} alt={animal.name} />
                    <h3>{animal.name}</h3>
                    <button className="cardbutton">Lue minusta</button>
                </div>
            ))}
        </div>
    );
}