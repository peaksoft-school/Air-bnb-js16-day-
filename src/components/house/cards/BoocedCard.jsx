import { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
   Box,
   Typography,
   CardContent,
   CardMedia,
   IconButton,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { styled } from '@mui/material/styles'

const EmptyImage = 'https://via.placeholder.com/230x140?text=No+Image'

const BoocedCard = ({ house, onClick }) => {
   const [hovered, setHovered] = useState(false)

   const {
      price,
      rating,
      description,
      address,
      guests,
      checkin,
      checkout,
      images = [],
   } = house

   const CustomPrevArrow = ({ onClick }) => (
      <ArrowButton
         onClick={(e) => {
            e.stopPropagation()
            onClick?.(e)
         }}
         direction="left"
      >
         <ArrowBackIosNewIcon />
      </ArrowButton>
   )

   const CustomNextArrow = ({ onClick }) => (
      <ArrowButton
         onClick={(e) => {
            e.stopPropagation()
            onClick?.(e)
         }}
         direction="right"
      >
         <ArrowForwardIosIcon />
      </ArrowButton>
   )

   const settings = {
      dots: images.length > 1,
      arrows: images.length > 1,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: hovered ? <CustomPrevArrow /> : null,
      nextArrow: hovered ? <CustomNextArrow /> : null,
   }

   return (
      <StyledCard onClick={onClick}>
         <ImageWrapper
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
         >
            {images.length > 0 ? (
               <Slider {...settings}>
                  {images.map((url, index) => (
                     <Box key={index}>
                        <CardMedia
                           component="img"
                           height="140"
                           image={url}
                           alt={description}
                        />
                     </Box>
                  ))}
               </Slider>
            ) : (
               <CardMedia
                  component="img"
                  height="140"
                  image={EmptyImage}
                  alt="No image"
               />
            )}
         </ImageWrapper>

         <CardContent>
            <Box className="price-rating">
               <Typography variant="h6">
                  ${price} <span className="gray">/ day</span>
               </Typography>
               <RatingBox>
                  <StarIcon className="icon" />
                  <span>{Number(rating).toFixed(1)}</span>
               </RatingBox>
            </Box>

            <Typography className="description" noWrap>
               {description}
            </Typography>

            <Box className="location">
               <LocationOnIcon fontSize="small" color="action" />
               <Typography className="address" noWrap>
                  {address}
               </Typography>
            </Box>

            <Box className="info">
               <Typography fontSize={14}>{guests} guests</Typography>
            </Box>
         </CardContent>
         <StyledCheckBox>
            <Box>
               <Typography fontSize={14}>Check in {checkin}</Typography>
            </Box>
            <Box>
               <Typography fontSize={14}>Check out {checkout}</Typography>
            </Box>
         </StyledCheckBox>
      </StyledCard>
   )
}

export default BoocedCard

const StyledCard = styled(Box)(() => ({
   maxWidth: 220,
   width: '100%',
   background: '#fff',
   borderRadius: 2,
   overflow: 'hidden',
   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
   cursor: 'pointer',
   transition: '0.3s',
   '&:hover': {
      transform: 'scale(1.01)',
   },
   '& .price-rating': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   '& .gray': {
      color: '#888',
      fontWeight: 300,
   },
   '& .description': {
      margin: '8px 0',
      fontWeight: 500,
   },
   '& .location': {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginBottom: 4,
   },
   '& .info': {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 14,
      color: '#666',
      marginTop: 8,
   },
}))

const ImageWrapper = styled(Box)(() => ({
   position: 'relative',
}))

const RatingBox = styled(Box)(() => ({
   backgroundColor: '#828282',
   color: '#fff',
   borderRadius: 4,
   padding: '2px 6px',
   display: 'flex',
   alignItems: 'center',
   gap: 4,
   fontSize: 14,
   '& .icon': {
      color: '#F7D212',
      fontSize: 16,
   },
}))

const ArrowButton = styled(IconButton, {
   shouldForwardProp: (prop) => prop !== 'direction',
})(({ direction }) => ({
   position: 'absolute',
   top: '50%',
   [direction === 'left' ? 'left' : 'right']: 8,
   transform: 'translateY(-50%)',
   backgroundColor: 'rgba(0,0,0,0.5)',
   color: '#fff',
   zIndex: 2,
   '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.7)',
   },
}))

const StyledCheckBox = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '8px 16px',
}))
