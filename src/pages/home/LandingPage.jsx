import Intro from '../../components/Landing/Intro'
import Regions from '../../components/Landing/Regions'
import PopularHouse from '../../components/Landing/PopularHouse'
import Footer from '../../layout/Footer'
import PopularApartments from '../../components/Landing/PopularApartments'
import TheLastest from '../../components/Landing/TheLastest'

const LandingPage = () => {
   return (
      <>
         <Intro />
         <Regions />
         <PopularApartments />
         <PopularHouse />
         <TheLastest />
         <Footer />
      </>
   )
}

export default LandingPage
