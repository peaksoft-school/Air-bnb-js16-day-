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
import { axiosInstance } from '../../../configs/axiosInstance'
import { getAnnouncementById } from '../../../store/slices/user/house/houseThunk'
import { getAnnouncementFeedback } from '../../../store/slices/admin/user/userThunk'

const FeedbackModal = ({ open, onClose, houseId }) => {
   const images = useSelector((state) => state.addHouseSlice.images)
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
         setIsLoading(true)
         await axiosInstance.post(`/api/feedback/save/${houseId}`, {
            images,
            rating,
            feedback,
         })
         onClose()
         setFeedback('')
         setRating(0)
         dispatch(getAnnouncementById(houseId))
         dispatch(getAnnouncementFeedback(houseId))
         dispatch(clearImage())
      } catch (error) {
         console.error('Error posting feedback:', error)
      } finally {
         setIsLoading(false)
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
                     <Box key={image} className="image-container">
                        <img
                           src={image}
                           alt="uploaded"
                           className="added-image"
                        />
                        <img
                           src={CloseIcon}
                           className="delete-icon"
                           onClick={() => handleDeleteImage(index)}
                           alt="remove"
                        />
                     </Box>
                  ))}

                  {images.length < 4 && (
                     <Box onClick={handleClick} className="add-photo">
                        <img src={CameraIcon} alt="camera" />
                        <input
                           ref={imageRef}
                           id="photo"
                           type="file"
                           accept=".png,.jpg,.jpeg"
                           onChange={handleFileChange}
                        />
                     </Box>
                  )}

                  {images.length < 1 && (
                     <Box className="images-description">
                        <label htmlFor="photo" className="add-photos-text">
                           Add photos to the review
                        </label>
                        <Typography className="add-photos-description">
                           It will become more noticeable and even more useful.
                           You can upload up to 4 photos.
                        </Typography>
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
                  variant="second"
                  onClick={onClose}
                  width="200px"
               >
                  Cancel
               </Button>
               <Button
                  className="public"
                  onClick={postFeedback}
                  disabled={isLoading}
                  width="200px"
               >
                  {isLoading ? 'Publishing...' : 'Public'}
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
         cursor: 'pointer',
         display: 'none',
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

      '& .added-image': {
         width: '8.438rem',
         height: '8.438rem',
         objectFit: 'cover',
         borderRadius: '4px',
      },

      '& .add-photo': {
         width: '8.438rem',
         height: '8.438rem',
         backgroundColor: theme.palette.tertiary.lightestGray,
         cursor: 'pointer',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: '4px',

         '& #photo': {
            display: 'none',
         },
      },

      '& .add-photo:hover': {
         border: `1px solid ${theme.palette.tertiary.lightGray}`,
      },

      '& .images-description': {
         width: '23rem',

         '& .add-photos-text': {
            fontFamily: 'Inter',
            fontSize: '1rem',
            fontWeight: '500',
            lineHeight: '1.188rem',
            color: theme.palette.tertiary.blue,
            cursor: 'pointer',
         },

         '& .add-photos-description': {
            fontSize: '0.875rem',
            color: theme.palette.tertiary.middleGray,
            marginTop: '0.5rem',
         },
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
      gap: '20px',
   },
}))
