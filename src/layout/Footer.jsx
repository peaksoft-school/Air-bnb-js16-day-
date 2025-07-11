import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import SignUpModal from '../pages/sing-up/SignUpModal'
import { Box, Link, styled, Typography } from '@mui/material'
import AirIcon from '../assets/icons/air.svg'
import InstagramIcon from '../assets/icons/instagram.svg'
import TelegramIcon from '../assets/icons/telegram.svg'
import WhatsappIcon from '../assets/icons/whatsapp.svg'

const Footer = () => {
   const isAuthenticated = useSelector((state) => state.auth.isAuth)
   const navigate = useNavigate()
   const [openSignUp, setOpenSignUp] = useState(false)
   const [pendingRoute, setPendingRoute] = useState(null)

   useEffect(() => {
      if (isAuthenticated && pendingRoute) {
         navigate(pendingRoute)
         setPendingRoute(null)
      }
   }, [isAuthenticated, navigate, pendingRoute])

   const handleRegionsClick = (e) => {
      e.preventDefault()
      if (!isAuthenticated) {
         setOpenSignUp(true)
         setPendingRoute('/user/region')
      } else {
         navigate('/user/region')
      }
   }

   const handleLeaveAdClick = (e) => {
      e.preventDefault()
      if (!isAuthenticated) {
         setOpenSignUp(true)
         setPendingRoute('/user/create-house')
      } else {
         navigate('/user/create-house')
      }
   }

   return (
      <>
         <StyledMainBox>
            <StyledMainFirstBox>
               <StyledLink href="#" onClick={handleRegionsClick}>
                  Regions
               </StyledLink>
               <StyledLink href="#" onClick={handleLeaveAdClick}>
                  Leave an ad
               </StyledLink>
            </StyledMainFirstBox>

            <StyledMainSecondBox>
               <img src={AirIcon} alt="logo" className="logo-icon" />
               <Typography>
                  © Copyright PeakSoft. All Rights Reserved
               </Typography>
            </StyledMainSecondBox>

            <StyledMainThirdBox>
               <StyledLink
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener"
               >
                  <IconWrapper>
                     <img src={InstagramIcon} alt="instagram" />
                  </IconWrapper>
               </StyledLink>

               <StyledLink
                  href="https://t.me/yourchannel"
                  target="_blank"
                  rel="noopener"
               >
                  <IconWrapper>
                     <img src={TelegramIcon} alt="telegram" />
                  </IconWrapper>
               </StyledLink>

               <StyledLink
                  href="https://wa.me/yourphonenumber"
                  target="_blank"
                  rel="noopener"
               >
                  <IconWrapper>
                     <img src={WhatsappIcon} alt="whatsapp" />
                  </IconWrapper>
               </StyledLink>
            </StyledMainThirdBox>
         </StyledMainBox>
         <SignUpModal open={openSignUp} setOpen={setOpenSignUp} />
      </>
   )
}


export default Footer

const StyledMainBox = styled(Box)(() => ({
   backgroundColor: '#1C2E20',
   display: 'flex',
   justifyContent: 'space-evenly',
   alignItems: 'center',
   gap: '200px',
   height: '222px',
}))

const StyledMainFirstBox = styled(Box)(() => ({
   color: '#fff',
   display: 'flex',
   alignItems: 'center',
   gap: '20px',
}))

const StyledMainSecondBox = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '60px',

   '& p': {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: ' 100%',
      color: '#859589',
   },

   '& .logo-icon': {
      width: '88px',
      height: '65px',
   },
}))

const StyledMainThirdBox = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-evenly',
   alignItems: 'center',
   gap: '20px',
}))

const StyledLink = styled(Link)(() => ({
   textDecoration: 'none',

   '&:hover': {
      color: '#FFBE58',
      transition: '0.3s',
   },
}))

const IconWrapper = styled(Box)(() => ({
   width: '40px',
   height: '40px',
   backgroundColor: '#2E3E30',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: '4px',
   transition: 'background-color 0.3s',

   '&:hover': {
      backgroundColor: '#3A4F3A',
   },
}))
