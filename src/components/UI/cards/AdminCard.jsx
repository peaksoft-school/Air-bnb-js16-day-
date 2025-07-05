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
} from '@mui/material'
import { styled } from '@mui/material/styles'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Meatballs from '../Meatballs'
import EmptyHouseImage from '../../../assets/images/empty-house.jpg'
import { ADMIN_CARD_OPTIONS } from '../../../utils/helpers'

const AdminCard = ({
   house,
   isBlocked,
   options,
   onDelete,
   onNavigate,
   onAccept,
   onReject,
}) => {
   const [hovered, setHovered] = useState(false)

   const { images, imageUrls, price, rating, description, address, maxGuests } =
      house

   const imagesToShow =
      images && images.length > 0
         ? images
         : imageUrls && imageUrls.length > 0
           ? imageUrls
           : []
   const hasImages = imagesToShow.length > 0

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
      dots: hasImages && imagesToShow.length > 1,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: hasImages && imagesToShow.length > 1,
      prevArrow: hovered ? <CustomPrevArrow /> : null,
      nextArrow: hovered ? <CustomNextArrow /> : null,
   }

   return (
      <StyledCard
         onClick={isBlocked ? undefined : onNavigate}
         className={isBlocked ? 'blocked' : ''}
      >
         {isBlocked && (
            <div className="blocked-overlay">
               <span>
                  Your application has been blocked, please contact the
                  administrator
               </span>
            </div>
         )}
         <ImageContainer
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
         >
            {hasImages ? (
               <Slider {...settings}>
                  {imagesToShow.map((url, i) => (
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
                  image={EmptyHouseImage}
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
                     {rating}
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
               {isBlocked ? (
                  <BlockedBtn disabled>BLOCKED</BlockedBtn>
               ) : (
                  <Meatballs options={ADMIN_CARD_OPTIONS} />
               )}
            </ActionRow>
         </CardContent>
      </StyledCard>
   )
}

export default AdminCard

const StyledCard = styled(Box)(({ theme }) => ({
   maxWidth: '230px',
   width: '100%',
   borderRadius: '4px',
   transition: 'all 0.3s',
   position: 'relative',
   background: '#fff',
   '&.blocked': {
      filter: 'grayscale(1) brightness(0.85)',
      pointerEvents: 'none',
      opacity: 0.7,
   },
   '.blocked-overlay': {
      position: 'absolute',
      top: 20,
      left: 10,
      right: 10,
      zIndex: 2,
      background: 'rgba(60,60,60,0.85)',
      color: '#fff',
      padding: '12px 16px',
      borderRadius: 8,
      fontSize: 16,
      textAlign: 'center',
   },
}))

const BlockedBtn = styled('button')(() => ({
   width: '100%',
   marginTop: 12,
   background: '#ccc',
   color: '#888',
   border: 'none',
   borderRadius: 4,
   padding: '8px 0',
   fontWeight: 600,
   fontSize: 18,
   pointerEvents: 'none',
   letterSpacing: 1,
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
