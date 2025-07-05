import React, { useState } from 'react'
import { Avatar, Box, styled, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import HouseImageSlider from './HouseImageSlider'
import Button from '../UI/Button'
import {
   blockedHouses,
   deleteHouseAsync,
} from '../../store/slices/admin/user/userThunk'
import FeedbackModal from '../UI/feedback/FeedbackModal'
import { showToast } from '../../utils/helpers/showToast'
import {
   acceptOrDeleteHouse,
   acceptOrRejectHouse,
} from '../../store/slices/admin/assept/asseptInRejectThunk'
import { ROUTES } from '../../routes/routes'

const ApplicationInner = ({ houseInfo }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { role } = useSelector((state) => state.auth)
   const { houseId, id } = useParams()
   const [openFeedback, setOpenFeedback] = useState(false)

   const toggleFeedbackModal = () => setOpenFeedback((prev) => !prev)

   const deleteHouse = () => {
      dispatch(deleteHouseAsync({ id: houseInfo.id, showToast, navigate }))
   }

   const handleAccept = async (houseId) => {
      try {
         await dispatch(
            acceptOrRejectHouse({ houseId, isAccepted: true, rejectInfo: '' })
         ).unwrap?.()
         showToast({
            title: 'Успешно!',
            message: 'Заявка одобрена',
            type: 'success',
         })
         navigate(ROUTES.ADMIN.APPLICATION)
      } catch (error) {
         showToast({
            title: 'Ошибка',
            message: error?.message || 'Не удалось одобрить заявку',
            type: 'error',
         })
      }
   }

   const handleReject = async (houseId, reason) => {
      try {
         await dispatch(
            acceptOrRejectHouse({
               houseId,
               isAccepted: false,
               rejectInfo: reason,
            })
         ).unwrap?.()
         showToast({
            title: 'Успешно!',
            message: 'Заявка отклонена',
            type: 'success',
         })
         navigate(ROUTES.ADMIN.APPLICATION)
      } catch (error) {
         showToast({
            title: 'Ошибка',
            message: error?.message || 'Не удалось отклонить заявку',
            type: 'error',
         })
      }
   }

   const blocked = houseInfo?.isBlocked

   const blockHouse = () => {
      dispatch(
         blockedHouses({
            id: houseInfo.id,
            showToast,
         })
      )
   }

   if (!houseInfo) return <div>Loading...</div>

   const location = window.location.pathname.split('/')[2]

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
                        {houseInfo.addressDetail}
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
                        location === 'users' ? (
                           <>
                              <Box className="button-container">
                                 <Button variant="second" onClick={deleteHouse}>
                                    Delete
                                 </Button>

                                 <Button onClick={blockHouse}>
                                    {blocked ? 'Unblock' : 'Block'}
                                 </Button>
                              </Box>

                              <Typography className="blocked-text">
                                 {blocked
                                    ? 'This house is currently blocked'
                                    : ''}
                              </Typography>
                           </>
                        ) : (
                           <>
                              <Box className="button-container">
                                 <Button
                                    variant="second"
                                    onClick={() => {
                                       const reason =
                                          'Ваш дом отклонён. Не соответствует требованиям публикации'

                                       if (reason)
                                          handleReject(houseInfo.id, reason)
                                    }}
                                 >
                                    Reject
                                 </Button>

                                 <Button
                                    onClick={() => handleAccept(houseInfo.id)}
                                 >
                                    Accept
                                 </Button>
                              </Box>
                           </>
                        )
                     ) : (
                        <h1>Здесь будет компонент для оплаты</h1>
                     )}
                  </Box>
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

export default ApplicationInner

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
