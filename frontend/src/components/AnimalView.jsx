const API_URL = 'http://localhost:3000';

export default function AnimalView({ animal }) {
    return (
        <div className="animalcard-big">

            <div className="animalvisual">
                <img className="animalimage" src={`${API_URL}${animal.image_url}`} alt={animal.name} />
                <span className="animal-status">{animal.status}</span>
            </div>

            <div className="animalinfo">

                <p className="animal-badge">{animal.type}</p>

                <h1>{animal.name}</h1>

                <div className="animal-facts">

                    <div className="animal-fact">
                        <span className="animal-fact-label">Ikä</span>
                        <span>{animal.age}</span>
                    </div>

                    <div className="animal-fact">
                        <span className="animal-fact-label">Rotu</span>
                        <span>{animal.breed}</span>
                    </div>
                    
                </div>

                <div className="animal-description">
                    <span className="animal-fact-label">Näin minua kuvaillaan</span>
                    <p>{animal.description}</p>
                </div>
            </div>

        </div>
    );
}