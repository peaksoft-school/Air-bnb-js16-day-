import React, { useRef, useState } from 'react'
import { Box, Rating, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal'
import CameraIcon from '../../../assets/icons/CameraIcon.svg'
import CloseIcon from '../../../assets/icons/CloseIcon.svg'
import {
   clearImage,
   deleteImage,
} from '../../../store/slices/user/addHouse/addHouseSlice'
import { postImageFile } from '../../../store/slices/user/addHouse/addHouseThunk'
import Input from '../Input'
import Button from '../Button'
import { saveFeedback } from '../../../store/slices/admin/user/userThunk'

const FeedbackModal = ({ open, onClose, houseId }) => {
   const images = useSelector((state) => state.addHouseSlice.images)
   const feedbackStatus = useSelector((state) => state.userInfo.feedbackStatus)
   const dispatch = useDispatch()
   const imageRef = useRef(null)
   const [rating, setRating] = useState(0)
   const [feedback, setFeedback] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const handleDeleteImage = (index) => dispatch(deleteImage(index))
   const handleClick = () => imageRef.current.click()

   const handleFileChange = (e) => {
      const file = e.target.files[0]
      if (file) dispatch(postImageFile({ file }))
   }

   const postFeedback = async () => {
      if (!rating || !feedback.trim()) {
         alert('Please provide both a rating and feedback.')
         return
      }

      try {
         const resultAction = await dispatch(
            saveFeedback({ houseId, feedback, rating, images })
         )

         if (saveFeedback.fulfilled.match(resultAction)) {
            dispatch(clearImage())
            setFeedback('')
            setRating(0)
            onClose()

            window.location.reload()
         }
      } catch (error) {
         console.error('Error saving feedback:', error)
      }
   }

   return (
      <Modal open={open} onClose={onClose} width="720px">
         <StyledContainer>
            <Typography variant="h4" className="title">
               Leave feedback
            </Typography>

            <Box className="container">
               <Box className="images-box">
                  {images.map((image, index) => (
                     <Box key={index} className="image-container">
                        <img
                           src={image}
                           alt={`img-${index}`}
                           className="added-image"
                        />
                        <img
                           src={CloseIcon}
                           className="delete-icon"
                           onClick={() => handleDeleteImage(index)}
                           alt="delete"
                        />
                     </Box>
                  ))}
                  {images.length < 4 && (
                     <Box onClick={handleClick} className="add-photo">
                        <img src={CameraIcon} alt="Add" />
                        <input
                           ref={imageRef}
                           id="photo"
                           type="file"
                           accept=".png,.jpg,.jpeg"
                           onChange={handleFileChange}
                        />
                     </Box>
                  )}
               </Box>
            </Box>

            <Box className="rating">
               <Typography variant="h6">Rate</Typography>
               <Rating
                  size="large"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
               />
            </Box>

            <Box className="input">
               <Typography variant="h6">Feedback</Typography>
               <Input
                  placeholder="Share your impressions about this place"
                  onChange={(e) => setFeedback(e.target.value)}
                  value={feedback}
               />
            </Box>

            <Box className="btn-container">
               <Button
                  className="cancel"
                  width={'194px'}
                  variant="second"
                  onClick={onClose}
               >
                  Cancel
               </Button>
               <Button
                  className="public"
                  width={'194px'}
                  onClick={postFeedback}
                  disabled={feedbackStatus === 'loading'}
               >
                  {feedbackStatus === 'loading' ? 'Sending...' : 'Public'}
               </Button>
            </Box>
         </StyledContainer>
      </Modal>
   )
}

export default FeedbackModal

const StyledContainer = styled(Box)(({ theme }) => ({
   '& .title': {
      textAlign: 'center',
   },
   '& .container': {
      marginBottom: '1.75rem',
   },
   '& .image-container': {
      width: '8.438rem',
      height: '8.438rem',
      position: 'relative',
      '& .delete-icon': {
         position: 'absolute',
         top: '0.2rem',
         right: '0.2rem',
         width: '1.5rem',
         height: '1.5rem',
      },
      '&:hover .delete-icon': {
         display: 'block',
      },
   },
   '& .images-box': {
      display: 'flex',
      marginTop: '0.875rem',
      height: '8.438rem',
      alignItems: 'center',
      gap: '1rem',
      position: 'relative',
      '& .added-image': {
         width: '8.438rem',
         height: '8.438rem',
         objectFit: 'cover',
         borderRadius: '0.5rem',
      },
      '& .add-photo': {
         width: '8.438rem',
         height: '8.438rem',
         backgroundColor: theme.palette.tertiary.lightestGray,
         cursor: 'pointer',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: '0.5rem',
         '& #photo': {
            display: 'none',
         },
      },
      '& .add-photo:hover': {
         border: `1px solid ${theme.palette.tertiary.lightGray}`,
      },
   },
   '& .rating': {
      margin: '0 0 20px 0',
      color: '#363636',
   },
   '& .input': {
      margin: '0 0 20px 0',
      color: '#363636',
   },
   '& .btn-container': {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
      alignItems: 'center',
   },
}))
