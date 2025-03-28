import React, { useState } from 'react'
import {
   Card,
   CardMedia,
   CardContent,
   Typography,
   Button,
   Box,
   IconButton,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CustomCard = ({ imageUrls, price, rating, title, location, guests }) => {
   const [isLiked, setIsLiked] = useState(false)
   const [hovered, setHovered] = useState(false)

   const handleLike = () => {
      setIsLiked(!isLiked)
   }

   const CustomPrevArrow = (props) => {
      const { onClick } = props
      return (
         <IconButton
            sx={{
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
            }}
            onClick={onClick}
         >
            <ArrowBackIosNewIcon />
         </IconButton>
      )
   }

   const CustomNextArrow = (props) => {
      const { onClick } = props
      return (
         <IconButton
            sx={{
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
            }}
            onClick={onClick}
         >
            <ArrowForwardIosIcon />
         </IconButton>
      )
   }

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: imageUrls.length > 1,
      prevArrow: hovered ? <CustomPrevArrow /> : null,
      nextArrow: hovered ? <CustomNextArrow /> : null,
   }

   return (
      <Card sx={{ maxWidth: 300, margin: 2 }}>
         <Box
            sx={{ position: 'relative' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
         >
            <Slider {...settings}>
               {imageUrls.map((url, index) => (
                  <CardMedia
                     key={index}
                     component="img"
                     height="140"
                     image={url}
                     alt={title}
                  />
               ))}
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
               <Box
                  sx={{
                     width: '3em',
                     height: '25px',
                     backgroundColor: '#828282',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     borderRadius: '2px',
                  }}
               >
                  <Typography variant="body2" sx={{ color: 'white' }}>
                     <StarIcon sx={{ color: '#F7D212', fontSize: '13px' }} />{' '}
                     {rating}
                  </Typography>
               </Box>
            </Box>
            <Typography
               gutterBottom
               variant="h5"
               component="div"
               sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
               }}
            >
               {title}
            </Typography>
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
               <Button variant="contained" color="warning">
                  BOOK
               </Button>
               <IconButton aria-label="like" onClick={handleLike}>
                  {isLiked ? (
                     <FavoriteIcon color="warning" />
                  ) : (
                     <FavoriteBorderIcon color="warning" />
                  )}
               </IconButton>
            </Box>
         </Box>
      </Card>
   )
}

export default CustomCard
