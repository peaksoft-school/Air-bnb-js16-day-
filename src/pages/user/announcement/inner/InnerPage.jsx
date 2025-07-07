import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Box, styled, Typography } from '@mui/material'

import Feedback from '../../../../components/UI/Feedback'
import HouseImageSlider from '../../../../components/house/HouseImageSlider'
import Rating from '../../../../components/UI/rating/Rating'
import FeedbackModal from '../../../../components/UI/feedback/FeedbackModal'
import Loading from '../../../Loading'
import Payment from '../../payment/Payment'

import { deleteFeedback } from '../../../../store/slices/admin/user/userThunk'

const InnerPage = ({ houseInfo, feedbacks = [], rating }) => {
   const dispatch = useDispatch()
   const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
   const [localFeedbacks, setLocalFeedbacks] = useState(feedbacks)

   useEffect(() => {
      setLocalFeedbacks(feedbacks)
   }, [feedbacks])

   const toggleFeedbackModal = () => {
      setIsFeedbackOpen((prev) => !prev)
   }

   const handleDeleteFeedback = async (feedbackId) => {
      try {
         await dispatch(deleteFeedback(feedbackId)).unwrap()
         setLocalFeedbacks((prev) => prev.filter((f) => f.id !== feedbackId))
      } catch (error) {
         console.error('Failed to delete feedback:', error)
      }
   }

   const handleAddFeedback = (newFeedback) => {
      setLocalFeedbacks((prev) => [newFeedback, ...prev])
   }

   if (!houseInfo) return <Loading />

   return (
      <StyledContainer>
         <h1 className="title">{houseInfo.name}</h1>
         <Box>
            <Box className="slider-house">
               <HouseImageSlider images={houseInfo.imageUrls || []} />
               <Box className="house-info">
                  <Typography className="house-type">
                     {houseInfo.type}
                  </Typography>
                  <Typography className="house-guests">
                     {houseInfo.maxGuests} Guests
                  </Typography>
                  <Typography className="house-name">
                     {houseInfo.name}
                  </Typography>
                  <Typography className="house-location">
                     {houseInfo.address || 'No address provided'}
                  </Typography>
                  <Typography className="house-description">
                     {houseInfo.description}
                  </Typography>

                  <Box className="user-info">
                     <Avatar className="user-avatar" />
                     <Box>
                        <Typography className="user-name">
                           User ID: {houseInfo.userId}
                        </Typography>
                     </Box>
                  </Box>

                  <Payment
                     houseId={houseInfo.id}
                     key={houseInfo.id}
                     pricePerDay={houseInfo.price}
                     userId={houseInfo.userId}
                  />
               </Box>
            </Box>

            <Box className="second-container">
               <Box className="feedback-container">
                  <h1 className="title">Feedback</h1>
                  {localFeedbacks.length > 0 ? (
                     localFeedbacks.map((feedback) => (
                        <Feedback
                           key={feedback.id}
                           text={feedback.text}
                           rating={feedback.rating}
                           images={feedback.images}
                           likeCount={feedback.likeCount}
                           dislikeCount={feedback.dislikeCount}
                           userFeedbackResponse={feedback.userFeedbackResponse}
                           createdAt={feedback.createdAt}
                           id={feedback.id}
                           onDelete={handleDeleteFeedback}
                        />
                     ))
                  ) : (
                     <h2 className="title">There are no feedbacks yet</h2>
                  )}
               </Box>
               <Rating
                  rating={rating}
                  toggleFeedbackModal={toggleFeedbackModal}
               />

               <FeedbackModal
                  width={'720px'}
                  open={isFeedbackOpen}
                  onClose={() => setIsFeedbackOpen(false)}
                  houseId={houseInfo.id}
                  onAddFeedback={handleAddFeedback}
               />
            </Box>
         </Box>
      </StyledContainer>
   )
}

export default InnerPage

const StyledContainer = styled(Box)(() => ({
   padding: '0 0 40px 0',
   '& .title': {
      textTransform: 'uppercase',
      fontFamily: 'inherit',
      fontWeight: 400,
      color: '#222',
      margin: '0 0 45px 0',
   },
   '& .slider-house': {
      display: 'flex',
      gap: '68px',
      '& .house-type, & .house-guests': {
         display: 'inline-block',
         backgroundColor: '#fff0f6',
         border: '1px solid #ffcbe0',
         padding: '6px 8px',
         margin: '0 15px 20px 0',
      },
      '& .house-name': {
         fontSize: '20px',
      },
      '& .house-location': {
         color: '#828282',
         margin: '0 0 20px 0',
      },
      '& .house-description': {
         margin: '0 0 20px 0',
         fontSize: '16px',
      },
      '& .user-info': {
         display: 'flex',
         gap: '16px',
         alignItems: 'center',
         margin: '0 0 60px 0',
         '& .user-avatar': {
            borderRadius: '50%',
            width: 56,
            height: 56,
            backgroundColor: '#ccc',
         },
         '& .user-name': {
            fontWeight: 500,
         },
         '& .user-email': {
            color: '#828282',
            fontSize: 14,
         },
      },
   },
   '& .second-container': {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '130px',
      marginTop: 40,
      '& .feedback-container': {
         maxWidth: '630px',
         minWidth: '500px',
         width: '100%',
      },
   },
}))
