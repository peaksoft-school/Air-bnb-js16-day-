import { Box, Link, styled } from '@mui/material'
import air from '../assets/icons/air.svg'
import instagram from '../assets/icons/instagram.svg'
import Telegram from '../assets/icons/Telegram.svg'
import Whatsapp from '../assets/icons/Whatsapp.svg'

const Footer = () => {
   return (
      <StyledMainBox>
         <StyledMainFirstBox>
            <StyledLink href="#">Regions</StyledLink>
            <StyledLink href="#">Leave an ad</StyledLink>
         </StyledMainFirstBox>

         <StyledMainSecondBox>
            <img
               src={air}
               alt="air"
               style={{ width: '88px', height: '65px' }}
            />
            <p>© Copyright PeakSoft. All Rights Reserved</p>
         </StyledMainSecondBox>

         <StyledMainThirdBox>
            <StyledLink
               href="https://instagram.com/yourprofile"
               target="_blank"
               rel="noopener"
            >
               <IconWrapper>
                  <img src={instagram} alt="instagram" />
               </IconWrapper>
            </StyledLink>

            <StyledLink
               href="https://t.me/yourchannel"
               target="_blank"
               rel="noopener"
            >
               <IconWrapper>
                  <img src={Telegram} alt="telegram" />
               </IconWrapper>
            </StyledLink>

            <StyledLink
               href="https://wa.me/yourphonenumber"
               target="_blank"
               rel="noopener"
            >
               <IconWrapper>
                  <img src={Whatsapp} alt="whatsapp" />
               </IconWrapper>
            </StyledLink>
         </StyledMainThirdBox>
      </StyledMainBox>
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
