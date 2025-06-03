import { Box, styled, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Rectangle from '../../assets/images/rectangle.png'
import ImageCarousel from '../UI/ImageCarousel'
import { IMAGES_POPULARS } from '../../utils/constants/Index'

const PopularApartments = ({ handleAllClick, handleMoreClick }) => (
   <StyledMainContainer>
      <StyledSecondContainer>
         <StyledTextContainer>
            <StyledApartamentText>Popular Apartments</StyledApartamentText>

            <StyledMoreText onClick={handleAllClick}>View all</StyledMoreText>
         </StyledTextContainer>

         <StyledHotelContainer>
            <StyledImageContainer>
               <img src={Rectangle} alt="hotel" />

               <StyledDistance>
                  <StyledDistanceTexts>
                     <StyledHotelText>
                        Aska Lara Resort & Spa Hotel
                     </StyledHotelText>

                     <StyledApartamentsText>
                        The Aska Lara Resort & Spa Hotel, which operates on an
                        all-inclusive system, occupies 2 plots separated by a
                        road. The hotel is located in the Lara district, 500
                        meters from the sea...
                     </StyledApartamentsText>
                  </StyledDistanceTexts>

                  <StyledDistanceTexts>
                     <StyledTextLocation>
                        <LocationOnIcon
                           fontSize="inherit"
                           className="location-icon"
                        />

                        <Typography>
                           723510 Osh Muzurbek Alimbekov 9/7
                        </Typography>
                     </StyledTextLocation>

                     <StyledMoreText onClick={handleMoreClick}>
                        Read more
                     </StyledMoreText>
                  </StyledDistanceTexts>
               </StyledDistance>
            </StyledImageContainer>

            <StyledSliderContainer>
               <ImageCarousel images={IMAGES_POPULARS} />
            </StyledSliderContainer>
         </StyledHotelContainer>
      </StyledSecondContainer>
   </StyledMainContainer>
)

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
