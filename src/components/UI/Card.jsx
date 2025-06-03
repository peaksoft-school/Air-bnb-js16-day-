import { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
   CardMedia,
   CardContent,
   Typography,
   Box,
   IconButton,
   styled,
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
      <StyledMuiCard>
         <Box
            className="images-content"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
         >
            <Slider {...settings}>
               {imageUrls.length > 1 ? (
                  <Slider {...settings}>
                     {imageUrls.map((url, i) => (
                        <Box key={i}>
                           <CardMedia
                              component="img"
                              height="140"
                              image={url}
                              alt={title}
                              className="image"
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
                     className="image"
                  />
               )}
            </Slider>
         </Box>

         <CardContent className="content">
            <Box className="first-block">
               <Typography variant="h6">
                  ${price} / <span className="word"> day</span>
               </Typography>

               <StyledRating>
                  <Typography className="rating-number">
                     <StarIcon className="rating-icon" />

                     {rating}
                  </Typography>
               </StyledRating>
            </Box>

            <Box>
               <StyledTitle>{title}</StyledTitle>

               <Box className="location-content">
                  <LocationOnIcon fontSize="small" color="action" />

                  <Typography className="location-name">{location}</Typography>
               </Box>
            </Box>

            <Box className="second-block">
               <Typography className="guest">{guests} guests</Typography>

               <Button width={103}>BOOK</Button>

               <IconButton aria-label="like" onClick={handleLike}>
                  {isLiked ? (
                     <FavoriteIcon color="warning" />
                  ) : (
                     <FavoriteBorderIcon color="warning" />
                  )}
               </IconButton>
            </Box>
         </CardContent>
      </StyledMuiCard>
   )
}

export default Card

const StyledMuiCard = styled(Box)(() => ({
   maxWidth: '295px',
   maxHeight: '362px',
   width: '100%',
   height: '100%',
   margin: '16px',
   borderRadius: '4px',
   transition: 'all 0.3s',

   '& .images-content': {
      position: 'relative',

      '& .image': {
         borderRadius: '4px 4px 0 0',
      },
   },

   '& .content': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',

      '& .first-block': {
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',

         '& .word': {
            color: 'gray',
            fontWeight: 300,
         },
      },

      '& .location-content': {
         display: 'flex',
         alignItems: 'start',
         gap: '5px',
         color: '#828282',

         '& .location-name': {
            fontWeight: 300,
         },
      },

      '& .second-block': {
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',

         '& .guest': {
            fontWeight: 300,
            color: '#939393',
         },
      },
   },

   '&:hover': {
      backgroundColor: 'white',
      cursor: 'pointer',
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

   '& .rating-number': {
      color: 'white',
   },

   '& .rating-icon': {
      color: '#F7D212',
      fontSize: '13px',
   },
}))

const StyledTitle = styled(Typography)(() => ({
   whiteSpace: 'nowrap',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   lineHeight: '100%',
   fontWeight: 300,
   fontSize: '18px',
   margin: '18px 0 8px 0',
}))
