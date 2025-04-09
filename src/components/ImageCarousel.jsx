import React, { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import Arrow from '../assets/icons/Arrow.svg'
import BlackArrow from '../assets/icons/BlackArrow.svg'

const ImageCarousel = ({ images, isButtonBlack, isBlackCount, Left }) => {
   const [currentImages, setCurrentImages] = useState([images[0], images[1]])
   const [currentIndex, setCurrentIndex] = useState(0)

   const handleNext = () => {
      setCurrentImages(([first, second]) => {
         const nextIndex =
            images.indexOf(second) + 1 === images.length
               ? 0
               : images.indexOf(second) + 1
         setCurrentIndex(nextIndex)
         return [second, images[nextIndex]]
      })
   }

   const handlePrev = () => {
      setCurrentImages(([first, second]) => {
         const prevIndex =
            images.indexOf(first) - 1 < 0
               ? images.length - 1
               : images.indexOf(first) - 1
         setCurrentIndex(prevIndex)
         return [images[prevIndex], first]
      })
   }

   return (
      <Wrapper>
         <MotionCarousel layout>
            {currentImages.map((url, index) => (
               <MotionImage
                  key={url}
                  layout
                  isSecond={index === 1}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  src={url}
                  alt="carousel-img"
               />
            ))}
         </MotionCarousel>

         <Controls Paddingleft={Left}>
            <ButtonLeft isBlack={isButtonBlack} onClick={handlePrev}>
               <img src={isButtonBlack ? BlackArrow : Arrow} alt="left" />
            </ButtonLeft>

            <StyledCountText isBlackCoun={isBlackCount}>
               {currentIndex + 1 < 10
                  ? `0${currentIndex + 1}`
                  : currentIndex + 1}{' '}
               / {images.length < 10 ? `0${images.length}` : images.length}
            </StyledCountText>

            <ButtonRight isBlack={isButtonBlack} onClick={handleNext}>
               <img src={isButtonBlack ? BlackArrow : Arrow} alt="right" />
            </ButtonRight>
         </Controls>
      </Wrapper>
   )
}

export default ImageCarousel

const Wrapper = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '80px',
}))

const MotionCarousel = styled(motion.div)`
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
   padding: 0px 0px 0px 50px;
`

const MotionImage = styled(motion.img)`
   width: ${(props) => (props.isSecond ? '12rem' : '14rem')};
   height: ${(props) => (props.isSecond ? '19.81rem' : '19.81rem')};
   object-fit: cover;
`

const Controls = styled(Box)(({ Paddingleft }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '25px',
   padding: Paddingleft === 'left' ? '0px 0px 0px 31px' : '0px 0px 0px 15px',
}))

const StyledCountText = styled(Typography)(({ isBlackCoun }) => ({
   width: '55px',
   color: isBlackCoun === 'black' ? '#363636' : '#FFFFFF',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
}))

const ButtonLeft = styled(IconButton)(() => ({
   transform: 'scaleX(-1)',
}))

const ButtonRight = styled(IconButton)(() => ({}))
