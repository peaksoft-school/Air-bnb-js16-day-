import { Box, styled, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Rectangle from '../../assets/images/Rectangle.png'
import ImageCarousel from '../ImageCarousel'
import { IMAGES_POPULARS } from '../../utils/constants/Index'

const TheLastest = ({ handleAllClick, handleMoreClick }) => {
   return (
      <StyledMainContainer>
         <StyledSecondContainer>
            <StyledTextContainer>
               <StyledApartamentText>the lastest</StyledApartamentText>

               <StyledViewText onClick={handleAllClick}>
                  View all
               </StyledViewText>
            </StyledTextContainer>

            <StyledHotelContainer>
               <StyledImageContainer>
                  <img src={Rectangle} alt="Hotel" />

                  <StyledDistance>
                     <StyledDistanceTexts>
                        <StyledHotelText>
                           Aska Lara Resort & Spa Hotel
                        </StyledHotelText>
                        <StyledApartamentsText>
                           The Aska Lara Resort & Spa Hotel, which operates on
                           an all-inclusive system, occupies 2 plots separated
                           by a road. The hotel is located in the Lara district,
                           500 meters from the sea...
                        </StyledApartamentsText>
                     </StyledDistanceTexts>

                     <StyledDistanceTexts>
                        <StyledTextLocation>
                           <LocationOnIcon
                              fontSize="inherit"
                              sx={{ color: '#97C69E' }}
                           />
                           723510 Osh Muzurbek Alimbekov 9/7
                        </StyledTextLocation>

                        <StyledMoreText onClick={handleMoreClick}>
                           Read more
                        </StyledMoreText>
                     </StyledDistanceTexts>
                  </StyledDistance>
               </StyledImageContainer>

               <StyledSliderContainer>
                  <ImageCarousel
                     images={IMAGES_POPULARS}
                     isButtonBlack={true}
                     isBlackCount={'black'}
                     Left={'left'}
                  />
               </StyledSliderContainer>
            </StyledHotelContainer>
         </StyledSecondContainer>
      </StyledMainContainer>
   )
}

const StyledMainContainer = styled(Box)(() => ({
   width: '100%',
   padding: '0 0 170px 0',
   backgroundColor: 'initial',
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
   color: '#363636',
   fontWeight: '500',
   fontSize: '18px',
   lineHeight: '100%',
}))

const StyledApartamentsText = styled(Typography)(() => ({
   width: '100%',
   maxWidth: '309px',
   color: '#6A6A6A',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
}))

const StyledDistanceTexts = styled(Typography)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '28px',
}))

const StyledTextLocation = styled(Typography)(() => ({
   color: '#97C69E',
   fontWeight: '400',
   fontSize: '14px',
   lineHeight: '100%',
   display: 'flex',
   alignItems: 'center',
   gap: '8px',
}))

const StyledMoreText = styled(Typography)(() => ({
   color: '#8A8A8A',
   fontWeight: '500',
   fontSize: '16px',
   lineHeight: '130%',
   cursor: 'pointer',
   textDecoration: 'underline',
}))

const StyledDistance = styled(Typography)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '7.44px',
   padding: '0px 0px 70px 0px',
}))

const StyledApartamentText = styled(Typography)(() => ({
   color: '#363636',
   fontWeight: '500',
   fontSize: '20px',
   lineHeight: '100%',
   textTransform: 'uppercase',
}))

const StyledSliderContainer = styled(Box)(() => ({
   display: 'flex',
}))

const StyledViewText = styled(Typography)(() => ({
   color: '#363636',
   fontWeight: '400',
   fontSize: '18px',
   lineHeight: '100%',
   letterSpacing: '0%',
   cursor: 'pointer',
   textDecoration: 'underline',
}))

export default TheLastest
