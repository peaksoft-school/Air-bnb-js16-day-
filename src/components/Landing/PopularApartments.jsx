import { Box, styled, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Rectangle from '../../assets/images/rectangle.png'
import ImageCarousel from '../UI/ImageCarousel'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLandingPageReguest } from '../../store/slices/user/Landing/LandingThunk'
import { useNavigate } from 'react-router'
import SignInModal from '../../pages/sign-in/SignInModal'
import SignUpModal from '../../pages/sing-up/SignUpModal'
import { IMAGES_POPULARS } from '../../utils/constants/Index'

const PopularApartments = ({ handleMoreClick }) => {
   const dispatch = useDispatch()
   const { landing, error } = useSelector((state) => state.landing)
   const isAuthenticated = useSelector((state) => state.auth.isAuth)
   const navigate = useNavigate()
   const [openSignIn, setOpenSignIn] = useState(false)
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

   const handleAllClick = () => {
      if (!isAuthenticated) {
         setOpenSignIn(true)
         localStorage.setItem(
            'pendingRegionFilters',
            JSON.stringify({
               popularity: 'popular',
               houseType: 'APARTMENT',
            })
         )
      } else {
         navigate('/user/region?popularity=popular&houseType=APARTMENT')
      }
   }

   const handleReadMore = (id) => {
      if (!isAuthenticated) {
         setOpenSignIn(true)
         setPendingId(id)
         localStorage.setItem('pendingAnnouncementId', id)
      } else {
         navigate(`/user/announcement/${id}`)
      }
   }

   console.log('PopularApartments - landing:', landing.Array)
   console.log('PopularApartments - landing type:', typeof landing)
   console.log('PopularApartments - isArray:', Array.isArray(landing))

   if (error) return <div>{error}</div>

   return (
      <StyledMainContainer>
         <StyledSecondContainer>
            <StyledTextContainer>
               <StyledApartamentText>Popular Apartments</StyledApartamentText>
               <StyledMoreText onClick={handleAllClick}>
                  View all
               </StyledMoreText>
            </StyledTextContainer>

            <StyledHotelContainer>
               {landing &&
                  Array.isArray(landing) &&
                  landing.slice(1, 2).map((apartment) => (
                     <StyledImageContainer key={apartment.id}>
                        <StyledImg
                           src={apartment.imageUrls[0] || Rectangle}
                           alt={apartment.name}
                        />
                        <StyledDistance>
                           <StyledDistanceTexts>
                              <StyledHotelText>
                                 {apartment.name}
                              </StyledHotelText>
                              <StyledApartamentsText>
                                 {apartment.description}
                              </StyledApartamentsText>
                           </StyledDistanceTexts>
                           <StyledDistanceTexts>
                              <StyledTextLocation>
                                 <LocationOnIcon
                                    fontSize="inherit"
                                    className="location-icon"
                                 />
                                 <Typography>{apartment.address}</Typography>
                              </StyledTextLocation>
                              <StyledMoreText
                                 onClick={() => handleReadMore(apartment.id)}
                              >
                                 Read more
                              </StyledMoreText>
                           </StyledDistanceTexts>
                        </StyledDistance>
                     </StyledImageContainer>
                  ))}
               <StyledSliderContainer>
                  <ImageCarousel images={IMAGES_POPULARS} />
               </StyledSliderContainer>
            </StyledHotelContainer>
         </StyledSecondContainer>
         <SignUpModal open={openSignIn} setOpen={setOpenSignIn} />
      </StyledMainContainer>
   )
}

export default PopularApartments

const StyledMainContainer = styled(Box)(() => ({
   width: '100%',
   height: '880px',
   backgroundColor: '#4F7755',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const StyledSecondContainer = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '60px',
}))

const StyledTextContainer = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
}))

const StyledHotelContainer = styled(Box)(() => ({
   display: 'flex',
}))

const StyledImageContainer = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '41px',
}))

const StyledHotelText = styled(Typography)(() => ({
   color: '#fff',
   fontWeight: '500',
   fontSize: '18px',
   lineHeight: '100%',
}))

const StyledApartamentsText = styled(Typography)(() => ({
   width: '100%',
   maxWidth: '309px',
   color: '#F7F7F7',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
}))

const StyledDistanceTexts = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '28px',
}))

const StyledTextLocation = styled(Box)(() => ({
   color: '#97C69E',
   fontWeight: '400',
   fontSize: '14px',
   lineHeight: '100%',
   display: 'flex',
   alignItems: 'center',
   gap: '8px',

   '& .location-icon': {
      color: '#97C69E',
   },
}))

const StyledMoreText = styled(Typography)(() => ({
   color: '#FFBE58',
   fontWeight: '500',
   fontSize: '16px',
   lineHeight: '130%',
   cursor: 'pointer',
   textDecoration: 'underline',
}))

const StyledDistance = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '7.44px',
   padding: '0px 0px 70px 0px',
}))

const StyledApartamentText = styled(Typography)(() => ({
   color: '#fff',
   fontWeight: '500',
   fontSize: '20px',
   lineHeight: '100%',
   textTransform: 'uppercase',
}))

const StyledSliderContainer = styled(Box)(() => ({
   display: 'flex',
}))
const StyledImg = styled('img')(() => ({
   width: '525px',
   height: '456px',
   borderRadius: '2px',
   objectFit: 'cover',
}))
