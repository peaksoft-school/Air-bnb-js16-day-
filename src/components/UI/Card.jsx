import { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from 'styled-components'
import {
   Card as MuiCard,
   CardMedia,
   CardContent,
   Typography,
   Box,
   IconButton,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Button from './Button'

const Card = ({ imageUrls, price, rating, title, location, guests }) => {
   const [isLiked, setIsLiked] = useState(false)
   const [hovered, setHovered] = useState(false)

   const handleLike = () => setIsLiked(!isLiked)

   const CustomPrevArrow = ({ onClick }) => (
      <StyledIconButtonBack onClick={onClick}>
         <ArrowBackIosNewIcon />
      </StyledIconButtonBack>
   )

   const CustomNextArrow = ({ onClick }) => (
      <StyledIconButtonForward onClick={onClick}>
         <ArrowForwardIosIcon />
      </StyledIconButtonForward>
   )

   const settings = {
      dots: imageUrls.length > 1,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: imageUrls.length > 1,
      prevArrow: hovered ? <CustomPrevArrow /> : null,
      nextArrow: hovered ? <CustomNextArrow /> : null,
   }

   return (
      <MuiCard sx={{ maxWidth: 300, margin: 2 }}>
         <Box
            sx={{ position: 'relative' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
         >
            <Slider {...settings}>
               {imageUrls.length > 1 ? (
                  <Slider {...settings}>
                     {imageUrls.map((url, index) => (
                        <div key={index}>
                           <CardMedia
                              component="img"
                              height="140"
                              image={url}
                              alt={title}
                           />
                        </div>
                     ))}
                  </Slider>
               ) : (
                  <CardMedia
                     component="img"
                     height="140"
                     image={imageUrls[0]}
                     alt={title}
                  />
               )}
            </Slider>
         </Box>

         <CardContent>
            <Box
               display="flex"
               justifyContent="space-between"
               alignItems="center"
            >
               <Typography variant="h6" component="div">
                  ${price} <span style={{ color: 'gray' }}>/ day</span>
               </Typography>

               <StyledRating>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                     <StarIcon sx={{ color: '#F7D212', fontSize: '13px' }} />
                     {rating}
                  </Typography>
               </StyledRating>
            </Box>

            <StyledTitle gutterBottom variant="h5" component="div">
               {title}
            </StyledTitle>

            <Box display="flex" alignItems="center" gap={1}>
               <LocationOnIcon fontSize="small" color="action" />

               <Typography variant="body2" color="text.secondary">
                  {location}
               </Typography>
            </Box>
         </CardContent>

         <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            pb={2}
         >
            <Box display="flex" alignItems="center" gap={1}>
               <Typography fontSize={14} variant="body2" color="text.secondary">
                  {guests} guests
               </Typography>
            </Box>

            <Box display="flex" gap="10px">
               <Button width={100}>BOOK</Button>

               <IconButton aria-label="like" onClick={handleLike}>
                  {isLiked ? (
                     <FavoriteIcon color="warning" />
                  ) : (
                     <FavoriteBorderIcon color="warning" />
                  )}
               </IconButton>
            </Box>
         </Box>
      </MuiCard>
   )
}

export default Card

const StyledIconButtonBack = styled(IconButton)(() => ({
   position: 'absolute',
   top: '50%',
   left: 10,
   transform: 'translateY(-50%)',
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   color: '#fff',
   zIndex: 1,

   '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
   },
}))

const StyledIconButtonForward = styled(IconButton)(() => ({
   position: 'absolute',
   top: '50%',
   right: 10,
   transform: 'translateY(-50%)',
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   color: '#fff',
   zIndex: 1,

   '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
   },
}))

const StyledRating = styled(Box)(() => ({
   width: '3em',
   height: '25px',
   backgroundColor: '#828282',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: '2px',
}))

const StyledTitle = styled(Typography)(() => ({
   whiteSpace: 'nowrap',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
}))
