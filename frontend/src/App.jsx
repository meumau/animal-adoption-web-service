import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useAnimalData } from './hooks/useAnimalData'
import AnimalCards from './components/AnimalCards'
import { useEffect } from 'react'

function App() {

  const {
    animals,
    animalsLoading,
    animalsError
  } = useAnimalData();

  // Skrollataan ylös, kun sivu ladataan
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header />

      <div className="content">

        <h2>Kotia etsivät eläimet</h2>

        {animalsLoading && (
          <p>Ladataan eläimiä...</p>
        )}

        {animalsError && (
          <p>Eläinten hakeminen epäonnistui.</p>
        )}

        {!animalsLoading && !animalsError && (
          <AnimalCards animals={animals} />
        )}

      </div>

      <Footer />
    </>
  )
}

export default App