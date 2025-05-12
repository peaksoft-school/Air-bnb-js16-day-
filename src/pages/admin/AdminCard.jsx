import { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
   Card as MuiCard,
   CardMedia,
   CardContent,
   Typography,
   Box,
   IconButton,
} from '@mui/material'
import { styled } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Meatballs from '../../components/UI/Meatballs'

const AdminCard = ({
   imageUrls,
   price,
   rating,
   title,
   location,
   guests,
   options,
}) => {
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
                  {imageUrls.map((url, index) => (
                     <div key={index}>
                        <CardMedia
                           component="img"
                           height="136"
                           image={url}
                           alt={title}
                        />
                     </div>
                  ))}
               </Slider>
            ) : (
               <CardMedia
                  component="img"
                  height="136"
                  image={imageUrls[0]}
                  alt={title}
               />
            )}
         </ImageContainer>

         <CardContent sx={{ padding: '12px 12px 12px 12px' }}>
            <Row>
               <Typography variant="h6" component="div">
                  ${price}{' '}
                  <GrayText variant="body2" component="span">
                     / day
                  </GrayText>
               </Typography>

               <StyledRating>
                  <StarIcon
                     sx={{ color: '#F7D212', fontSize: '13px', mr: 0.3 }}
                  />
                  <Typography variant="body2" color="white">
                     {rating}
                  </Typography>
               </StyledRating>
            </Row>

            <Title noWrap variant="h5" component="div">
               {title}
            </Title>

            <Row gap={1} className="location">
               <LocationOnIcon fontSize="small" color="action" />
               <Typography variant="body2" color="text.secondary" noWrap>
                  {location}
               </Typography>
            </Row>
            <ActionRow>
               <Typography fontSize={14} variant="body2" color="text.secondary">
                  {guests} guests
               </Typography>
               <Meatballs
                  color={true}
                  icon={<MoreHorizIcon />}
                  options={options}
               />
            </ActionRow>
         </CardContent>
      </StyledCard>
   )
}

export default AdminCard

const StyledCard = styled(MuiCard)(() => ({
   width: '210px',
   maxHeight: '290px',
   minHeight: '300px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   boxShadow: 'none',
   '& .location': {
      display: 'flex',
      alignItems: 'center',
   },
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

const StyledRating = styled(Box)(() => ({
   width: '3em',
   height: '25px',
   backgroundColor: '#828282',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: '4px',
}))

const Title = styled(Typography)(() => ({
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   whiteSpace: 'nowrap',
}))

const GrayText = styled(Typography)(() => ({
   color: 'gray',
   fontSize: '0.9rem',
}))

const Row = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   marginBottom: theme.spacing(1),
}))

const ActionRow = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingBottom: 0,
   paddingInline: theme.spacing(1),
}))
