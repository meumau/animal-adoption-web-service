import './styles.css'
import Footer from './components/Footer'
import { useAnimalData } from './hooks/useAnimalData'
import AnimalView from './components/AnimalView'
import AdoptionForm from './components/AdoptionForm'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

function Animal() {
    const { id } = useParams();

    const {
        animals,
        animalsLoading,
        animalsError
    } = useAnimalData();

    // Etsitään eläin id:llä
    const animal = animals?.find(a => String(a.id) === String(id));

    // Skrollataan ylös kun sivu ladataan
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className='animal-page'>

                <div className="animalview-container">
                    <Link to={`/`} className='backbutton'>⟵ Kaikki eläimet</Link>
                    {animalsLoading && (
                        <p>Ladataan eläimen tietoja...</p>
                    )}

                    {animalsError && (
                        <p>Eläimen näyttäminen epäonnistui.</p>
                    )}

                    {!animalsLoading && !animalsError && (
                        <> {/* Jos eläin löytyy, näytetään sen tiedot ja lomake (lomaketiedostossa määritellään lomakkeen näkyvyys statuksen mukaan)*/}
                            {animal ? (
                                <> 
                                    <AnimalView animal={animal} />
                                    <AdoptionForm animal={animal} />
                                </>
                            ) : (
                                <p>Eläintä ei löytynyt tällä ID:llä.</p>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Animal