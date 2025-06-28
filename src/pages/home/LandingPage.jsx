import Intro from '../../components/Landing/Intro'
import Regions from '../../components/Landing/Regions'
import PopularHouse from '../../components/Landing/PopularHouse'
import Footer from '../../layout/Footer'
import PopularApartments from '../../components/Landing/PopularApartments'
import TheLastest from '../../components/Landing/TheLastest'
import SignUpModal from '../sing-up/SignUpModal'
import { useNavigate } from 'react-router'
import { useState } from 'react'

const LandingPage = () => {
   const navigate = useNavigate()
   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

   const handleAllClick = () => {
      navigate('/user/region')
   }

   const handleMoreClick = () => {
      navigate('/user/region')
   }

   const handleOpenSignUpModal = () => {
      setIsSignUpModalOpen(true)
   }

   return (
      <>
         <Intro />
         <Regions onOpenSignUpModal={handleOpenSignUpModal} />
         <PopularApartments
            handleAllClick={handleAllClick}
            handleMoreClick={handleMoreClick}
         />
         <PopularHouse />
         <TheLastest
            handleAllClick={handleAllClick}
            handleMoreClick={handleMoreClick}
         />
         <Footer />

         <SignUpModal open={isSignUpModalOpen} setOpen={setIsSignUpModalOpen} />
      </>
   )
}

export default LandingPage
