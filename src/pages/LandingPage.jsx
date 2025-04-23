import Intro from './Intro'
import Regions from '../components/Regions'
import PopularHouse from '../components/PopularHouse'
import Footer from '../layout/Footer'

const LandingPage = () => {
   return (
      <>
         <Intro />
         <Regions />

         <PopularHouse />

         <Footer />
      </>
   )
}

export default LandingPage
