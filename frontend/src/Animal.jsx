import './styles.css'
import Footer from './components/Footer'
import { useAnimal } from './hooks/useAnimalData'
import AnimalView from './components/AnimalView'
import AdoptionForm from './components/AdoptionForm'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function Animal() {
    const { id } = useParams();

    const {
        data: animal,
        isLoading: animalLoading,
        error: animalError
    } = useAnimal(id);

    // Skrollataan ylös kun sivu ladataan
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className='animal-page'>

                <div className="animalview-container">
                    <Link to={`/`} className='backbutton'>⟵ Kaikki eläimet</Link>
                    {animalLoading && (
                        <p>Ladataan eläimen tietoja...</p>
                    )}

                    {animalError && (
                        <p>Eläimen näyttäminen epäonnistui.</p>
                    )}

                    {!animalLoading && !animalError && (
                        animal ? (
                            <>
                                <AnimalView animal={animal} />
                                <AdoptionForm animal={animal} />
                            </>
                        ) : (
                            <p>Eläintä ei löytynyt tällä ID:llä.</p>
                        )
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Animal