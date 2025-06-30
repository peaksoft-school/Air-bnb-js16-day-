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
import Button from '../Button'

const Card = ({
   imageUrls,
   price,
   rating,
   title,
   location,
   guests,
   onClick,
}) => {
   const [isLiked, setIsLiked] = useState(false)
   const [hovered, setHovered] = useState(false)

   const handleLike = (e) => {
      e.stopPropagation()
      setIsLiked(!isLiked)
   }

   const CustomPrevArrow = ({ onClick }) => (
      <StyledIconButtonBack
         onClick={(e) => {
            e.stopPropagation()
            if (onClick) onClick(e)
         }}
      >
         <ArrowBackIosNewIcon />
      </StyledIconButtonBack>
   )

   const CustomNextArrow = ({ onClick }) => (
      <StyledIconButtonForward
         onClick={(e) => {
            e.stopPropagation()
            if (onClick) onClick(e)
         }}
      >
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
      <StyledMuiCard onClick={onClick}>
         <Box
            className="content"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
         >
            {imageUrls.length > 1 ? (
               <Slider {...settings}>
                  {imageUrls.map((url, i) => (
                     <Box key={i}>
                        <CardMedia
                           component="img"
                           height="140"
                           image={url}
                           alt={title}
                        />
                     </Box>
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
         </Box>

         <CardContent>
            <Box className="first-block">
               <Typography variant="h6">
                  ${price}
                  <span className="day-word">/ day</span>
               </Typography>

               <StyledRating>
                  <Typography className="rating">
                     <StarIcon className="star-icon" />
                     {rating}
                  </Typography>
               </StyledRating>
            </Box>

            <StyledTitle gutterBottom variant="h5">
               {title}
            </StyledTitle>

            <Box className="location-text">
               <LocationOnIcon fontSize="small" color="action" />
               <Typography color="text.secondary">{location}</Typography>
            </Box>
         </CardContent>

         <Box className="second-block">
            <Box className="guest-content">
               <Typography className="guest" color="text.secondary">
                  {guests} guests
               </Typography>
            </Box>

            <Box className="buttons-content">
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
      </StyledMuiCard>
   )
}

export default Card

const StyledMuiCard = styled(MuiCard)(() => ({
   maxWidth: '300px',
   cursor: 'pointer',
   transition: 'transform 0.2s ease-in-out',

   '&:hover': {
      transform: 'scale(1.02)',
   },

   '& .content': {
      position: 'relative',
   },

   '& .first-block': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& .day-word': {
         color: 'gray',
      },
   },

   '& .location-text': {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
   },

   '& .second-block': {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingBottom: '16px',

      '& .guest-content': {
         display: 'flex',
         alignItems: 'center',
         gap: '8px',

         '& .guest': {
            fontSize: '14px',
         },
      },

      '& .buttons-content': {
         display: 'flex',
         gap: '10px',
      },
   },
}))

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

   '& .rating': {
      color: 'white',
   },

   '& .star-icon': {
      color: '#F7D212',
      fontSize: '13px',
   },
}))

const StyledTitle = styled(Typography)(() => ({
   whiteSpace: 'nowrap',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
}))
