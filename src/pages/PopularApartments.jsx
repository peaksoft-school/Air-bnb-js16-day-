import { Box, Typography } from '@mui/material'
import styled from 'styled-components'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Rectangle from '../assets/images/Rectangle.png'
import ImageCarousel from '../components/ImageCarousel'

const PopularApartments = ({ handleAllClick, handleMoreClick }) => {
   // const images = [
   //    'https://www.calltouch.ru/blog/wp-content/uploads/2019/08/verstka-sajta_-instrukcziya-dlya-nachinayushhih.jpg',
   //    'https://sky.pro/media/wp-content/uploads/2022/12/verstka-sajta_-instrukcziya-dlya-nachinayushhih.png',
   //    'https://static.insales-cdn.com/images/articles/1/2575/7268879/unnamed__84_.jpg',
   //    'https://msiter.ru/sites/default/files/images/106654734_result.jpg',
   //    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJSRr9T06UDbWy6fZGVRNgQWcKxMHpSrGylQ&sv',
   //    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1t7RU3eSvudqTEM3Fdglg2U85lpyHkVyH-Q&s',
   //    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxvz1T5qIJums7KIaA49cSaFlgpVKzes0Diw&s',
   // ]
   // // ]comment: images для Слайдера!
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
                  <ImageCarousel images={images} />
               </StyledSliderContainer>
            </StyledHotelContainer>
         </StyledSecondContainer>
      </StyledMainContainer>
   )
}

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
   color: '#FFBE58',
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
   color: '#fff',
   fontWeight: '500',
   fontSize: '20px',
   lineHeight: '100%',
   textTransform: 'uppercase',
}))

const StyledSliderContainer = styled(Box)(() => ({
   display: 'flex',
}))

export default PopularApartments
