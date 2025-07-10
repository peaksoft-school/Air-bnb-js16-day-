import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography, styled } from '@mui/material'
import Input from '../UI/Input'
import Checkbox from '../UI/Checkbox'
import MainPagePhoto from '../../assets/images/intro.png'
import Header from '../../layout/Header'
import SignUpModal from '../../pages/sing-up/SignUpModal'
import SignInModal from '../../pages/sign-in/SignInModal'
import ForgotPassword from '../../pages/forgot-password/ForgotPassword'
import { useNavigate } from 'react-router'

const Intro = () => {
   const navigate = useNavigate()
   const isAuthenticated = useSelector((state) => state.auth.isAuth)

   const [openSignIn, setOpenSignIn] = useState(false)
   const [openSignUp, setOpenSignUp] = useState(false)
   const [openForgotPassword, setOpenForgotPassword] = useState(false)
   const [searchValue, setSearchValue] = useState('')
   const [pendingRoute, setPendingRoute] = useState(null)

   const handleOpenSignUp = () => setOpenSignUp(true)

   const handleAddLeave = () => {
      if (!isAuthenticated) {
         setOpenSignUp(true)
         setPendingRoute('/user/create-house')
      } else {
         navigate('/user/create-house')
      }
   }

   const handleInputChange = (e) => setSearchValue(e.target.value)
   const handleInputKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSearch()
      }
   }
   const handleSearch = () => {
      if (!isAuthenticated) {
         setOpenSignUp(true)
         localStorage.setItem('pendingSearch', searchValue)
      } else {
         navigate(`/user/region?search=${encodeURIComponent(searchValue)}`)
      }
   }

   useEffect(() => {
      if (isAuthenticated) {
         if (pendingRoute) {
            navigate(pendingRoute)
            setPendingRoute(null)
         }
         const pendingSearch = localStorage.getItem('pendingSearch')
         if (pendingSearch) {
            navigate(`/user/region?search=${encodeURIComponent(pendingSearch)}`)
            localStorage.removeItem('pendingSearch')
         }
      }
   }, [isAuthenticated, navigate, pendingRoute])

   return (
      <>
         <StyledMain>
            <StyledImage>
               <Header
                  isAuthenticated={isAuthenticated}
                  onJoinUs={handleOpenSignUp}
                  onAddLeave={handleAddLeave}
               />

               <StyledSearch>
                  <StyledText>Find a place you'll love to stay at</StyledText>
                  <Input
                     value={searchValue}
                     onChange={handleInputChange}
                     onKeyDown={handleInputKeyDown}
                     placeholder="Region, city, apartment, house..."
                     icon={true}
                     sizeVariant="large"
                  />
                  {!isAuthenticated && (
                     <StyledCheckbox>
                        <Checkbox />
                        <Typography className="search-text">
                           Искать поблизости
                        </Typography>
                     </StyledCheckbox>
                  )}
               </StyledSearch>

               <SignUpModal
                  open={openSignUp}
                  setOpen={setOpenSignUp}
                  onAdminLoginClick={() => {
                     setOpenSignUp(false)
                     setOpenSignIn(true)
                  }}
               />

               <SignInModal
                  open={openSignIn}
                  setOpen={setOpenSignIn}
                  onForgotPasswordClick={() => {
                     setOpenSignIn(false)
                     setOpenForgotPassword(true)
                  }}
               />

               <ForgotPassword
                  open={openForgotPassword}
                  handleClose={() => setOpenForgotPassword(false)}
               />
            </StyledImage>
         </StyledMain>
      </>
   )
}

export default Intro

const StyledMain = styled(Box)(() => ({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

const StyledImage = styled(Box)(() => ({
   backgroundImage: `url(${MainPagePhoto})`,
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   backgroundRepeat: 'no-repeat',
   minHeight: '100vh',
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
}))

const StyledSearch = styled(Box)(() => ({
   height: '600px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   flexDirection: 'column',
}))

const StyledText = styled(Typography)(() => ({
   color: '#fff',
   fontWeight: 400,
   fontSize: '40px',
   lineHeight: '100%',
   letterSpacing: '0%',
   textTransform: 'uppercase',
   fontFamily: 'Jenriv Titling',
   padding: '0 0 50px 0',
}))

const StyledCheckbox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   padding: '0 0 0 528px',

   '& .search-text': {
      color: '#EDEDED',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      letterSpacing: '0%',
   },
}))
