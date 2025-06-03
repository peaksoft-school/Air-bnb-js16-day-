import { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
   Card as MuiCard,
   CardMedia,
   CardContent,
   Typography,
   Box,
   IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Meatballs from '../Meatballs'
import EmptyHouseImage from '../../../assets/images/empty-house.jpg'
import { ADMIN_CARD_OPTIONS } from '../../../utils/helpers'

const AdminCard = ({ house }) => {
   const { imageUrls, price, averageRating, description, address, maxGuests } =
      house

   const [hovered, setHovered] = useState(false)

   const CustomPrevArrow = ({ onClick }) => (
      <ArrowButton onClick={onClick} direction="left">
         <ArrowBackIosNewIcon />
      </ArrowButton>
   )

   const CustomNextArrow = ({ onClick }) => (
      <ArrowButton onClick={onClick} direction="right">
         <ArrowForwardIosIcon />
      </ArrowButton>
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
      <StyledCard>
         <ImageContainer
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
                           alt={description}
                        />
                     </Box>
                  ))}
               </Slider>
            ) : (
               <CardMedia
                  component="img"
                  height="140"
                  image={
                     imageUrls.length === 0
                        ? `${EmptyHouseImage}`
                        : imageUrls[0]
                  }
                  alt={description}
               />
            )}
         </ImageContainer>

         <CardContent className="content">
            <Box className="first-block">
               <Typography variant="h6" className="price">
                  ${price} / <span className="word"> day</span>
               </Typography>

               <StyledRating>
                  <Typography className="rating-number">
                     <StarIcon className="rating-icon" />

                     {averageRating}
                  </Typography>
               </StyledRating>
            </Box>

            <Box>
               <StyledTitle>{description}</StyledTitle>

               <Box className="location-content">
                  <LocationOnIcon fontSize="small" color="action" />

                  <Typography className="location-name">{address}</Typography>
               </Box>
            </Box>

            <ActionRow>
               <Typography fontSize={14} variant="body2" color="text.secondary">
                  {maxGuests} guests
               </Typography>

               <Meatballs options={ADMIN_CARD_OPTIONS} />
            </ActionRow>
         </CardContent>
      </StyledCard>
   )
}

export default AdminCard

const StyledCard = styled(Box)(() => ({
   maxWidth: '230px',
   width: '100%',
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
      padding: '12px',
      marginTop: '12px',

      '& .first-block': {
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',

         '& .price': {
            fontWeight: 300,
         },

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
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
         },
      },

      '& .second-block': {
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',

         '& .guest': {
            fontWeight: 300,
            color: '#939393',
            width: '110px',
         },
      },
   },

   '&:hover': {
      backgroundColor: 'white',
      cursor: 'pointer',
      boxShadow: '0 4px 12px #69696914',
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
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      justifyContent: 'center',
      textAlign: 'center',
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

const ImageContainer = styled(Box)(() => ({
   position: 'relative',
}))

const ArrowButton = styled(IconButton, {
   shouldForwardProp: (prop) => prop !== 'direction',
})(({ direction }) => ({
   position: 'absolute',
   top: '50%',
   [direction === 'left' ? 'left' : 'right']: 10,
   transform: 'translateY(-50%)',
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   color: '#fff',
   zIndex: 1,
   '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
   },
}))

const ActionRow = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingBottom: theme.spacing(2),
   paddingInline: theme.spacing(1),
}))
