import { Box, styled } from '@mui/material'
import { motion } from 'framer-motion'

import chui from '../assets/images/Chui.png'
import batken from '../assets/images/Batken.png'
import jalalabad from '../assets/images/Jalal-Abad.png'
import naryn from '../assets/images/Naryn.png'
import yssykkul from '../assets/images/Yssyk-Kul.png'
import talas from '../assets/images/Talas.png'
import osh from '../assets/images/Osh.png'
import bishkek from '../assets/images/Bishkek.png'

const Regions = () => {
   return (
      <StyledMainBox>
         <Box className="Box">
            <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
               <h2 className="title">REGIONS IN KYRGYZSTAN</h2>

               <p className="text">
                  You can visit the site any day and be sure that you will find
                  everything for a great vacation.
               </p>
            </Box>

            <StyledBox>
               <StyledDiv>
                  <ImageWrapper
                     whileHover={{ scale: 1.03 }}
                     transition={{ duration: 0.5 }}
                  >
                     <StyledImage src={chui} alt="Chui" />
                     <TextOverlay>Chui</TextOverlay>
                  </ImageWrapper>

                  <StyledSecondDiv>
                     <StyledThirdDiv>
                        <ImageWrapper
                           whileHover={{ scale: 1.05 }}
                           transition={{ duration: 0.5 }}
                        >
                           <StyledImage src={batken} alt="Batken" />
                           <TextOverlay>Batken</TextOverlay>
                        </ImageWrapper>

                        <ImageWrapper
                           whileHover={{ scale: 1.05 }}
                           transition={{ duration: 0.5 }}
                        >
                           <StyledImage src={jalalabad} alt="Jalal-Abad" />
                           <TextOverlay>Jalal-Abad</TextOverlay>
                        </ImageWrapper>
                     </StyledThirdDiv>

                     <ImageWrapper
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                     >
                        <StyledImage src={naryn} alt="Naryn" />
                        <TextOverlay>Naryn</TextOverlay>
                     </ImageWrapper>
                  </StyledSecondDiv>
               </StyledDiv>

               <StyledDiv>
                  <StyledSecondDiv>
                     <StyledThirdDiv>
                        <ImageWrapper
                           whileHover={{ scale: 1.05 }}
                           transition={{ duration: 0.5 }}
                        >
                           <StyledImage src={yssykkul} alt="YssykKul" />
                           <TextOverlay>Yssyk-Kul</TextOverlay>
                        </ImageWrapper>
                        <ImageWrapper
                           whileHover={{ scale: 1.05 }}
                           transition={{ duration: 0.5 }}
                        >
                           <StyledImage src={talas} alt="Talas" />
                           <TextOverlay>Talas</TextOverlay>
                        </ImageWrapper>
                     </StyledThirdDiv>
                     <ImageWrapper
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                     >
                        <StyledImage src={bishkek} alt="Bishkek" />
                        <TextOverlay>Bishkek</TextOverlay>
                     </ImageWrapper>
                  </StyledSecondDiv>
                  <ImageWrapper
                     whileHover={{ scale: 1.05 }}
                     transition={{ duration: 0.5 }}
                  >
                     <StyledImage src={osh} alt="Osh" />
                     <TextOverlay>Osh</TextOverlay>
                  </ImageWrapper>
               </StyledDiv>
            </StyledBox>
         </Box>
      </StyledMainBox>
   )
}

export default Regions

const StyledMainBox = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',

   '.title': {
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: ' 100%',
      textTransform: 'uppercase',
      color: '#363636',
   },

   '.text': {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      color: '#363636',
      marginBottom: '60px',
   },

   '.Box': {
      display: 'flex',
      flexDirection: 'column',
      gap: '60px',
   },
}))

const StyledBox = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
}))

const StyledDiv = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '20px',
}))

const StyledSecondDiv = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '20px',
}))

const StyledThirdDiv = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '20px',
}))

const StyledImage = styled(motion.img)(() => ({
   height: 'auto',
   borderRadius: '2px',
   cursor: 'pointer',
}))

const ImageWrapper = styled(motion.div)(() => ({
   position: 'relative',
   display: 'inline-block',
   width: '100%',
}))

const TextOverlay = styled('div')(() => ({
   position: 'absolute',
   bottom: '10px',
   left: '55px',
   transform: 'translate(-50%, -50%)',
   color: '#FFFFFF',
   fontSize: '16px',
   fontWeight: 500,
   pointerEvents: 'none',
}))
