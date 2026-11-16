import './styles.css'
import Footer from './components/Footer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

function ThankYou() {

    // Skrollataan ylös kun sivu ladataan
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className='thankyou-page'>
                <div className='thankyou-box'>
                    <h1>Kiitos adoptiohakemuksen lähettämisestä!</h1>
                    <p>Tutustumme hakemukseesi ja olemme sinuun pian yhteydessä.</p>
                    <Link to={`/`} className='frontpage-button'>Jatka eläimiin tutustumista</Link>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ThankYou