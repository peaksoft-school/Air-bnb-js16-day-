import { Box, styled, Typography } from '@mui/material'
import GeoIcon from '../../assets/icons/geo.svg'
import StarIcon from '../../assets/icons/star.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getLandingPageReguest } from '../../store/slices/user/Landing/LandingThunk'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import SignUpModal from '../../pages/sing-up/SignUpModal'

const PopularHouse = () => {
   const dispatch = useDispatch()
   const { landing, error } = useSelector((state) => state.landing)
   const isAuthenticated = useSelector((state) => state.auth.isAuth)
   const navigate = useNavigate()
   const [openSignUp, setOpenSignUp] = useState(false)
   const [pendingId, setPendingId] = useState(null)

   useEffect(() => {
      dispatch(getLandingPageReguest({ houseStatus: 'popular' }))
   }, [dispatch])

   useEffect(() => {
      if (isAuthenticated) {
         const id = localStorage.getItem('pendingAnnouncementId')
         if (id) {
            navigate(`/user/announcement/${id}`)
            localStorage.removeItem('pendingAnnouncementId')
         }
      }
   }, [isAuthenticated, navigate])

   const handleViewAll = () => {
      if (!isAuthenticated) {
         setOpenSignUp(true)
         localStorage.setItem(
            'pendingRegionFiltersHouse',
            JSON.stringify({
               popularity: 'popular',
               houseType: 'HOUSE',
            })
         )
      } else {
         navigate('/user/region?popularity=popular&houseType=HOUSE')
      }
   }

   const handleCardClick = (id) => {
      if (!isAuthenticated) {
         setOpenSignUp(true)
         setPendingId(id)
         localStorage.setItem('pendingAnnouncementId', id)
      } else {
         navigate(`/user/announcement/${id}`)
      }
   }

   if (error) return <div>{error}</div>

   return (
      <StyledMainBox>
         <StyledSecondBox>
            <StyledDiv>
               <Box>
                  <Typography variant="h2">Popular House</Typography>

                  <Typography>
                     Helping you make the best decisions in buying, selling, &
                     renting your last minute locations.
                  </Typography>
               </Box>

               <Box>
                  <StyledTypography
                     onClick={handleViewAll}
                     style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                     View all
                  </StyledTypography>
               </Box>
            </StyledDiv>

            <StyledBox>
               {landing &&
                  Array.isArray(landing) &&
                  landing.slice(2, 5).map((apartment) => (
                     <StyledCardBox
                        key={apartment.id}
                        onClick={() => handleCardClick(apartment.id)}
                        style={{ cursor: 'pointer' }}
                     >
                        <ImageWrapper>
                           <StyledImg
                              src={apartment.imageUrls[0]}
                              alt={apartment.name}
                           />

                           <RatingTag>
                              <img src={StarIcon} alt="star" />

                              <Typography variant="span">
                                 {apartment.rating}
                              </Typography>
                           </RatingTag>
                        </ImageWrapper>

                        <Box className="card-content">
                           <Typography variant="h3">
                              {apartment.description}
                           </Typography>

                           <Typography>
                              <StyledSecondImg src={GeoIcon} alt="geo" />
                              {apartment.address}
                           </Typography>
                        </Box>

                        <Typography>
                           <Typography variant="span">
                              ${apartment.price}
                           </Typography>{' '}
                           / day
                        </Typography>
                     </StyledCardBox>
                  ))}
            </StyledBox>
         </StyledSecondBox>
         <SignUpModal open={openSignUp} setOpen={setOpenSignUp} />
      </StyledMainBox>
   )
}

export default PopularHouse

const StyledMainBox = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '170px 0 0 0',
}))

const StyledSecondBox = styled(Box)(() => ({
   height: '880px',
   display: 'flex',
   flexDirection: 'column',
   gap: '60px',
}))

const StyledDiv = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',

   '& h2': {
      fontFamily: 'Arial',
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '100%',
      textTransform: 'uppercase',
      marginBottom: '16px',
      color: '#363636',
   },

   '& p': {
      fontFamily: 'Arial',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      color: '#363636',
   },

   '& Typography': {
      fontFamily: 'Arial',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '100%',
      textDecoration: 'underline',
      color: '#363636',
   },
}))

const StyledBox = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flexWrap: 'wrap',
   gap: '20px',
}))

const StyledCardBox = styled(Box)(() => ({
   width: '400px',
   height: '582px',
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
   fontFamily: 'Arial',

   '& .card-content': {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
   },

   '& h3': {
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '100%',
   },

   '& p': {
      fontWeight: 200,
      fontSize: '14px',
      lineHeight: '100%',
      color: '#757575',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',

      '& span': {
         color: '#000',
         fontWeight: 500,
      },
   },
}))

const StyledImg = styled('img')(() => ({
   width: '400px',
   height: '484px',
   borderRadius: '2px',
   objectFit: 'cover',
}))

const StyledSecondImg = styled('img')(() => ({
   width: '12px',
   height: '16px',
}))

const StyledTypography = styled(Typography)(() => ({
   fontFamily: 'Arial',
   fontWeight: 400,
   fontSize: '18px',
   lineHeight: '100%',
   textDecoration: 'underline',
   color: '#363636',
}))

const ImageWrapper = styled(Box)(() => ({
   position: 'relative',
   width: '400px',
   height: '484px',
}))

const RatingTag = styled(Box)(() => ({
   position: 'absolute',
   top: '20px',
   right: '16px',
   backgroundColor: '#34343480',
   padding: '4px 8px',
   borderRadius: '2px',
   fontSize: '14px',
   fontWeight: 500,
   color: 'white',
   boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
   display: 'flex',
   gap: '4px',
}))
