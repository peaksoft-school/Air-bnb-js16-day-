import { useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Box, styled } from '@mui/material'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const HouseImageSlider = ({ images }) => {
   const [thumbsSwiper, setThumbsSwiper] = useState(null)
   const slideCount = images?.length || 0

   return (
      <StyledContainer>
         <Swiper
            onSwiper={setThumbsSwiper}
            style={{
               '--swiper-navigation-color': '#fff',
               '--swiper-pagination-color': '#fff',
            }}
            loop={slideCount > 1}
            spaceBetween={10}
            navigation
            {...(thumbsSwiper ? { thumbs: { swiper: thumbsSwiper } } : {})}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
         >
            {images?.map((img) => (
               <SwiperSlide key={img}>
                  <img src={img} alt="house img" />
               </SwiperSlide>
            ))}
         </Swiper>
         <Swiper
            onSwiper={setThumbsSwiper}
            loop={slideCount > 4}
            spaceBetween={10}
            slidesPerView={Math.min(4, slideCount)}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
         >
            {images?.map((img) => (
               <SwiperSlide key={img}>
                  <img src={img} alt="house img" />
               </SwiperSlide>
            ))}
         </Swiper>
      </StyledContainer>
   )
}

export default HouseImageSlider

const StyledContainer = styled(Box)(() => ({
   margin: '0 0 45px 0',

   '& .swiper ': {
      margin: 0,
   },

   '& .mySwiper': {
      width: '600px',
      height: '140px',
      boxSizing: 'border-box',
   },

   '& .mySwiper2': {
      width: '600px',
      height: '500px',
      margin: '0 0 10px 0',
   },

   '& .swiper-slide img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      display: 'block',
   },
}))
