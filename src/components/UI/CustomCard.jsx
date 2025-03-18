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

const CustomCard = ({ imageUrl, price, rating, title, location, guests }) => {
   const [isLiked, setIsLiked] = useState(false)

   const handleLike = () => {
      setIsLiked(!isLiked)
   }
   return (
      <Card sx={{ maxWidth: 345, margin: 2 }}>
         <CardMedia component="img" height="140" image={imageUrl} alt={title} />
         <CardContent>
            <Box
               display="flex"
               justifyContent="space-between"
               alignItems="center"
            >
               <Typography variant="h6" component="div">
                  ${price} / day
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
                  <Typography variant="body2" color="text.primary">
                     <StarIcon sx={{ color: '#F7D212', fontSize: '13px' }} />{' '}
                     {rating}
                  </Typography>
               </Box>
            </Box>
            <Typography gutterBottom variant="h5" component="div">
               {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {location}
            </Typography>
         </CardContent>
         <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            pb={2}
         >
            <Typography fontSize={14} variant="body2" color="text.secondary">
               {guests} guests
            </Typography>
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
