import React, { useState } from 'react'
import { Avatar, Box, styled, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import Feedback from '../UI/Feedback'
import HouseImageSlider from './HouseImageSlider'
import Button from '../UI/Button'
import Rating from '../UI/rating/Rating'
import {
   blockedHouses,
   deleteHouseAsync,
} from '../../store/slices/admin/user/userThunk'
import FeedbackModal from '../UI/feedback/FeedbackModal'
import { showToast } from '../../utils/helpers/showToast'

const HouseInner = ({ houseInfo, feedbacks = [], rating }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { role } = useSelector((state) => state.auth)
   const { houseId, id } = useParams()
   const [openFeedback, setOpenFeedback] = useState(false)

   const toggleFeedbackModal = () => {
      setOpenFeedback((prev) => !prev)
   }

   const deleteHouse = () => {
      dispatch(deleteHouseAsync({ id: houseInfo.id, showToast, navigate }))
   }

   const blocked = houseInfo?.isBlocked

   const blockHouse = () => {
      dispatch(
         blockedHouses({
            id: houseInfo.id,
            block: !blocked,
            showToast,
         })
      )
   }

   if (!houseInfo) return <div>Loading...</div>

   return (
      <>
         <StyledContainer>
            <h1 className="title">{houseInfo.name}</h1>
            <Box>
               <Box className="slider-house">
                  <HouseImageSlider images={houseInfo.imageUrls} />
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
                        {houseInfo.addressDetail?.address}
                     </Typography>
                     <Typography className="house-description">
                        {houseInfo.description}
                     </Typography>

                     <Box className="user-info">
                        <Avatar
                           src={houseInfo.userResponse?.image || ''}
                           alt={houseInfo.userResponse?.fullName || 'Owner'}
                           className="user-avatar"
                        />
                        <Box>
                           <Typography className="user-name">
                              {houseInfo.userResponse?.fullName || 'Owner'}
                           </Typography>
                           <Typography className="user-email">
                              {houseInfo.userResponse?.email ||
                                 'owner@example.com'}
                           </Typography>
                        </Box>
                     </Box>

                     {role === 'ADMIN' ? (
                        <>
                           <Box className="button-container">
                              <Button variant="outlined" onClick={deleteHouse}>
                                 Delete
                              </Button>
                              <Button onClick={blockHouse}>
                                 {blocked ? 'Unblock' : 'Block'}
                              </Button>
                           </Box>
                           <Typography className="blocked-text">
                              {blocked ? 'This house is currently blocked' : ''}
                           </Typography>
                        </>
                     ) : (
                        <h1>Здесь будет компонент для оплаты</h1>
                     )}
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
                     rating={rating?.rating || 0}
                     toggleFeedbackModal={toggleFeedbackModal}
                  />
               </Box>
            </Box>
         </StyledContainer>

         <FeedbackModal
            open={openFeedback}
            onClose={toggleFeedbackModal}
            houseId={houseId || id}
         />
      </>
   )
}

export default HouseInner

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
