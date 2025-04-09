import { Box, styled } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'

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
      <StyledMainBox sx={{ p: 8, bgcolor: '#f9fafb', minHeight: '100vh' }}>
         <h2 className="title">REGIONS IN KYRGYZSTAN</h2>
         <p className="text">
            You can visit the site any day and be sure that you will find
            everything for a great vacation.
         </p>

         <StyledBox>
            <StyledDiv>
               <StyledImage
                  src={chui}
                  alt="Chui"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5 }}
               />
               <StyledSecondDiv>
                  <StyledThirdDiv>
                     <StyledImage
                        src={batken}
                        alt="Batken"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                     />
                     <StyledImage
                        src={jalalabad}
                        alt="JalalAbad"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                     />
                  </StyledThirdDiv>
                  <StyledImage
                     src={naryn}
                     alt="Naryn"
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.5 }}
                  />
               </StyledSecondDiv>
            </StyledDiv>

            <StyledDiv>
               <StyledSecondDiv>
                  <StyledThirdDiv>
                     <StyledImage
                        src={yssykkul}
                        alt="YssykKul"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                     />
                     <StyledImage
                        src={talas}
                        alt="Talas"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                     />
                  </StyledThirdDiv>
                  <StyledImage
                     src={bishkek}
                     alt="Bishkek"
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.5 }}
                  />
               </StyledSecondDiv>
               <StyledImage
                  src={osh}
                  alt="Osh"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
               />
            </StyledDiv>
         </StyledBox>
      </StyledMainBox>
   )
}

export default Regions

const StyledMainBox = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'start',
   '.title': {
      fontSize: '20px',
      fontWeight: 500,
      textAlign: 'center',
      marginBottom: '1rem',
      lineHeight: ' 100%',
      textTransform: 'uppercase',
      color: '#363636',
      marginLeft: '100px',
   },
   '.text': {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      marginLeft: '100px',
      color: '#363636',
      marginBottom: '60px',
   },
}))

const StyledBox = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',

   width: '1240px',
   height: '1379px',
   margin: '100px',
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
