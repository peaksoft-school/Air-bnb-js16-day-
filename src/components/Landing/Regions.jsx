import { motion } from 'framer-motion'
import { Box, styled, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { REGION_ACTIONS } from '../../store/slices/user/region/regionSlice'
import Nature from '../../assets/images/nature.png'
import Batken from '../../assets/images/batken.png'
import JalalAbad from '../../assets/images/jalal-abad.png'
import Naryn from '../../assets/images/Naryn.png'
import Yssykkul from '../../assets/images/Yssyk-Kul.png'
import Talas from '../../assets/images/Talas.png'
import Osh from '../../assets/images/Osh.png'
import Bishkek from '../../assets/images/Bishkek.png'

const Regions = ({ onOpenSignUpModal }) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { isAuth } = useSelector((state) => state.auth)

   const handleRegionClick = (regionName) => {
      console.log('Region clicked:', regionName)
      console.log('User isAuth:', isAuth)

      // Сохраняем выбранный регион в localStorage
      localStorage.setItem('selectedRegion', regionName)
      console.log('Saved to localStorage:', regionName)

      // Устанавливаем выбранный регион в Redux
      dispatch(REGION_ACTIONS.setSelectedRegion(regionName))
      console.log('Dispatched to Redux:', regionName)

      if (isAuth) {
         // Если авторизован - сразу переходим на страницу региона
         console.log('User is auth, navigating to /user/region')
         navigate('/user/region')
      } else {
         // Если не авторизован - открываем модал регистрации
         console.log('User not auth, opening signup modal')
         onOpenSignUpModal()
      }
   }

   return (
      <StyledMainBox>
         <Box className="box">
            <Box className="title-content">
               <Typography variant="h2" className="title">
                  REGIONS IN KYRGYZSTAN
               </Typography>

               <Typography className="text">
                  You can visit the site any day and be sure that you will find
                  everything for a great vacation.
               </Typography>
            </Box>

            <StyledBox>
               <StyledDiv>
                  <ImageWrapper
                     whileHover={{ scale: 1.03 }}
                     transition={{ duration: 0.5 }}
                     onClick={() => handleRegionClick('CHUY')}
                  >
                     <StyledImage src={Nature} alt="Chui" />
                     <TextOverlay>Chui</TextOverlay>
                  </ImageWrapper>

                  <StyledSecondDiv>
                     <StyledThirdDiv>
                        <ImageWrapper
                           whileHover={{ scale: 1.05 }}
                           transition={{ duration: 0.5 }}
                           onClick={() => handleRegionClick('BATKEN')}
                        >
                           <StyledImage src={Batken} alt="Batken" />
                           <TextOverlay>Batken</TextOverlay>
                        </ImageWrapper>

                        <ImageWrapper
                           whileHover={{ scale: 1.05 }}
                           transition={{ duration: 0.5 }}
                           onClick={() => handleRegionClick('JALAL_ABAD')}
                        >
                           <StyledImage src={JalalAbad} alt="Jalal-Abad" />
                           <TextOverlay>Jalal-Abad</TextOverlay>
                        </ImageWrapper>
                     </StyledThirdDiv>

                     <ImageWrapper
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => handleRegionClick('NARYN')}
                     >
                        <StyledImage src={Naryn} alt="Naryn" />
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
                           onClick={() => handleRegionClick('YSYKKOL')}
                        >
                           <StyledImage src={Yssykkul} alt="YssykKul" />
                           <TextOverlay>Yssyk-Kul</TextOverlay>
                        </ImageWrapper>

                        <ImageWrapper
                           whileHover={{ scale: 1.05 }}
                           transition={{ duration: 0.5 }}
                           onClick={() => handleRegionClick('TALAS')}
                        >
                           <StyledImage src={Talas} alt="Talas" />
                           <TextOverlay>Talas</TextOverlay>
                        </ImageWrapper>
                     </StyledThirdDiv>

                     <ImageWrapper
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => handleRegionClick('BISHKEK')}
                     >
                        <StyledImage src={Bishkek} alt="Bishkek" />
                        <TextOverlay>Bishkek</TextOverlay>
                     </ImageWrapper>
                  </StyledSecondDiv>

                  <ImageWrapper
                     whileHover={{ scale: 1.05 }}
                     transition={{ duration: 0.5 }}
                     onClick={() => handleRegionClick('OSH')}
                  >
                     <StyledImage src={Osh} alt="Osh" />
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
   padding: '170px 0 170px 0',

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

   '.box': {
      display: 'flex',
      flexDirection: 'column',
      gap: '60px',

      '& .title-content': {
         display: 'flex',
         gap: '1rem',
         flexDirection: 'column',
      },
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
   cursor: 'pointer',
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
