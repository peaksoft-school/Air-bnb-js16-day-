import Intro from '../../components/Landing/Intro'
import Regions from '../../components/Landing/Regions'
import PopularHouse from '../../components/landing/PopularHouse'
import Footer from '../../layout/Footer'
import PopularApartments from '../../components/Landing/PopularApartments'
import TheLastest from '../../components/landing/TheLastest'

const LandingPage = () => (
   <>
      <Intro />
      <Regions />
      <PopularApartments />
      <PopularHouse />
      <TheLastest />
      <Footer />
   </>
)

export default LandingPage
