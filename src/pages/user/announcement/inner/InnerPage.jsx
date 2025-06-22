import { useState } from 'react'
import { Avatar, Box, styled, Typography } from '@mui/material'

import Feedback from '../../../../components/UI/Feedback'
import HouseImageSlider from '../../../../components/house/HouseImageSlider'
import Rating from '../../../../components/UI/rating/Rating'
import FeedbackModal from '../../../../components/UI/feedback/FeedbackModal'
import Loading from '../../../Loading'
import Button from '../../../../components/UI/Button'

const InnerPage = ({ houseInfo, feedbacks = [], rating }) => {
   const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

   const toggleFeedbackModal = () => {
      setIsFeedbackOpen((prev) => !prev)
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
                     {houseInfo.addressDetail || 'No address provided'}
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

                  <h1>Payment component will be here</h1>
               </Box>
            </Box>

            <Box className="second-container">
               <Box className="feedback-container">
                  <h1 className="title">Feedback</h1>
                  {feedbacks.length > 0 ? (
                     feedbacks.map((item) => (
                        <Feedback key={item.id} {...item} />
                     ))
                  ) : (
                     <h2 className="title">There are no feedbacks yet</h2>
                  )}
               </Box>
               <Rating
                  rating={rating || 0}
                  toggleFeedbackModal={toggleFeedbackModal}
               />

               <Button />
               <FeedbackModal
                  width="500px"
                  open={isFeedbackOpen}
                  onClose={() => setIsFeedbackOpen(false)}
                  houseId={houseInfo.id}
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
      '& .button-container': {
         display: 'flex',
         gap: '20px',
         margin: '0 0 20px 0',
         '.MuiButtonBase-root': {
            width: '200px',
         },
      },
      '& .blocked-text': {
         textAlign: 'center',
         color: '#f00',
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
