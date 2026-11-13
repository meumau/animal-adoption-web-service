import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

export default function AnimalCards({ animals }) {
    return (
        <div className="cardscontainer">
            {animals.map((animal, index) => (
                <div className="card" key={animal.id || index}>
                    <div className="statuslabel">{animal.status}</div>
                    <img className="cardimage" src={`${API_URL}${animal.image_url}`} alt={animal.name} />
                    <h3>{animal.name}</h3>
                    {/* Kortissa on linkki eläimen sivulle */}
                    <Link to={`/animal/${animal.id}`} className="cardbutton">
                        Lue minusta
                    </Link>
                </div>
            ))}
        </div>
    );
}