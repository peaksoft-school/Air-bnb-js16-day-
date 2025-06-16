import React, { useState } from 'react'
import {
   Avatar,
   Box,
   styled,
   Typography,
   Rating as MuiRating,
} from '@mui/material'
import LikeIcon from '../../assets/icons/LikeIcon.svg'
import DisLike from '../../assets/icons/DisLike.svg'
import IconButton from '../UI/IconButton'

const Feedback = ({
   text,
   rating,
   images,
   likeCount,
   dislikeCount,
   userFeedbackResponse,
   createdAt,
}) => {
   const [showFullText, setShowFullText] = useState(false)

   if (!userFeedbackResponse) return null

   const toggleText = () => setShowFullText((prev) => !prev)

   return (
      <StyledContainer>
         <Box className="user-rating">
            <Box>
               <Avatar
                  src={
                     userFeedbackResponse.image !== 'none'
                        ? userFeedbackResponse.image
                        : ''
                  }
                  alt={userFeedbackResponse.fullName}
                  className="user-avatar"
               />
               <Typography className="user-name">
                  {userFeedbackResponse.fullName}
               </Typography>
            </Box>
            <Box className="rating">
               <MuiRating value={rating} readOnly />
               <Typography component="span" sx={{ ml: 0.5 }}>
                  ({rating})
               </Typography>
            </Box>
         </Box>

         <Box className="feedback">
            <Typography component="span">
               {showFullText
                  ? text
                  : `${text?.substring(0, 250)}${text?.length > 250 ? '...' : ''}`}
            </Typography>
            {text?.length > 250 && (
               <Typography className="show-more-text" onClick={toggleText}>
                  {showFullText ? 'see less' : 'see more'}
               </Typography>
            )}
         </Box>

         <Box className="img-container">
            {images?.map((item, i) => (
               <img key={i} src={item} alt="feedback img" />
            ))}
         </Box>

         <Box className="date-like">
            <Typography className="date">
               {new Date(createdAt).toLocaleDateString()}
            </Typography>
            <Box className="action-cont">
               <IconButton className="like">
                  <img src={LikeIcon} alt="like" width={20} /> {likeCount}
               </IconButton>
               <IconButton className="like">
                  <img src={DisLike} alt="dislike" width={20} /> {dislikeCount}
               </IconButton>
            </Box>
         </Box>
      </StyledContainer>
   )
}

export default Feedback

const StyledContainer = styled(Box)(() => ({
   marginBottom: 24,
   '& .user-rating': {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 10,
      '& > div': {
         display: 'flex',
         alignItems: 'center',
         gap: 12,
      },
   },
   '& .user-avatar': {
      width: 40,
      height: 40,
   },
   '& .user-name': {
      fontWeight: 500,
   },
   '& .rating': {
      display: 'flex',
      alignItems: 'center',
   },
   '& .feedback': {
      marginBottom: 12,
      fontSize: 16,
      lineHeight: 1.4,
      cursor: 'default',
   },
   '& .show-more-text': {
      color: '#1976d2',
      cursor: 'pointer',
      userSelect: 'none',
   },
   '& .img-container': {
      display: 'flex',
      gap: 8,
      marginBottom: 10,
      '& img': {
         width: 80,
         height: 80,
         objectFit: 'cover',
         borderRadius: 4,
      },
   },
   '& .date-like': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#828282',
      fontSize: 14,
      '& .action-cont': {
         display: 'flex',
         gap: 10,
         alignItems: 'center',
      },
      '& .like': {
         display: 'flex',
         alignItems: 'center',
         gap: 4,
         cursor: 'pointer',
      },
   },
}))
