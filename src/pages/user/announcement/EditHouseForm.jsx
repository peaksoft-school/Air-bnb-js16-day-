import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   Box,
   Typography,
   TextField,
   FormControl,
   RadioGroup,
   Select,
   MenuItem,
   Alert,
   styled,
   IconButton,
} from '@mui/material'
import Radio from '../../../components/UI/Radio'
import Button from '../../../components/UI/Button'
import { updateHouseById } from '../../../store/slices/user/profile/announcementDetail/announcementDetailThunk'
import { showToast } from '../../../utils/helpers/showToast'
import { postImageFile } from '../../../store/slices/user/addHouse/addHouseThunk'
import {
   clearImage,
   deleteImage,
} from '../../../store/slices/user/addHouse/addHouseSlice'
import CameraIcon from '../../../assets/icons/CameraIcon.svg'
import CloseIcon from '../../../assets/icons/CloseIcon.svg'

const regions = [
   'BISHKEK',
   'CHUY',
   'YSYKKOL',
   'NARYN',
   'TALAS',
   'OSH',
   'JALAL_ABAD',
   'BATKEN',
]

const EditHouseForm = ({ initialData, onClose, onSuccess }) => {
   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.announcementDetail)
   const images = useSelector((state) => state.addHouseSlice.images)
   const [formData, setFormData] = useState({ ...initialData })
   const imageRef = useRef(null)

   useEffect(() => {
      console.log('🔄 Initial data received:', initialData)
      console.log('🔄 Initial imageUrls:', initialData.imageUrls)

      const cleanInitialData = {
         ...initialData,
         imageUrls: (initialData.imageUrls || []).filter(
            (url) => url && url !== null && url !== 'null' && url.trim() !== ''
         ),
      }

      console.log('🔄 Clean initial data:', cleanInitialData)
      setFormData(cleanInitialData)

      dispatch(clearImage())
   }, [initialData, dispatch])

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }))
   }

   const handleFileChange = async (e) => {
      const file = e.target.files[0]
      if (file) {
         try {
            console.log('Uploading file:', file.name)
            const result = await dispatch(postImageFile({ file })).unwrap()
            console.log('Upload result:', result)
            showToast({
               title: 'Успешно!',
               message: 'Изображение загружено!',
               type: 'success',
            })
         } catch (err) {
            console.error('Upload error:', err)
            showToast({
               title: 'Ошибка!',
               message: 'Ошибка при загрузке изображения!',
               type: 'error',
            })
         }
      }
   }

   const handleDeleteImage = (index) => {
      dispatch(deleteImage(index))
   }

   const handleClick = () => {
      imageRef.current.click()
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         console.log('Form data before submit:', formData)
         console.log('New images:', images)

         const existingImages = (formData.imageUrls || []).filter(
            (url) => url && url !== null && url !== 'null' && url.trim() !== ''
         )
         const newImages = images.filter(
            (url) => url && url !== null && url !== 'null' && url.trim() !== ''
         )

         const updatedImageUrls = [...existingImages, ...newImages]

         console.log('Existing images (filtered):', existingImages)
         console.log('New images (filtered):', newImages)
         console.log('Updated image URLs:', updatedImageUrls)

         const submitData = {
            ...formData,
            imageUrls: updatedImageUrls,
         }

         console.log('Submit data:', submitData)

         const result = await dispatch(updateHouseById(submitData)).unwrap()
         console.log('Update result:', result)

         showToast({
            title: 'Успешно!',
            message: 'Данные обновлены!',
            type: 'success',
         })
         dispatch(clearImage())
         if (onSuccess) onSuccess()
         if (onClose) onClose()
      } catch (err) {
         console.error('Update error:', err)
         showToast({
            title: 'Ошибка!',
            message: err?.message || 'Ошибка при обновлении!',
            type: 'error',
         })
      }
   }

   return (
      <FormContainer>
         <MainTitle>EDIT YOUR HOUSE</MainTitle>
         <Box component="form" onSubmit={handleSubmit}>
            <SectionContainer>
               <FieldLabel>Images</FieldLabel>
               <ImagesContainer>
                  {formData.imageUrls
                     ?.filter((url) => url && url !== null && url !== 'null')
                     .map((image, index) => (
                        <ImageContainer key={`existing-${index}`}>
                           <img
                              src={image}
                              alt={`existing-${index}`}
                              className="added-image"
                           />
                           <DeleteButton
                              onClick={() => {
                                 const newImageUrls = formData.imageUrls.filter(
                                    (_, i) => i !== index
                                 )
                                 setFormData((prev) => ({
                                    ...prev,
                                    imageUrls: newImageUrls,
                                 }))
                              }}
                           >
                              <img src={CloseIcon} alt="delete" />
                           </DeleteButton>
                        </ImageContainer>
                     ))}

                  {images
                     .filter((url) => url && url !== null && url !== 'null')
                     .map((image, index) => (
                        <ImageContainer key={`new-${index}`}>
                           <img
                              src={image}
                              alt={`new-${index}`}
                              className="added-image"
                           />
                           <DeleteButton
                              onClick={() => handleDeleteImage(index)}
                           >
                              <img src={CloseIcon} alt="delete" />
                           </DeleteButton>
                        </ImageContainer>
                     ))}

                  {(formData.imageUrls?.filter(
                     (url) => url && url !== null && url !== 'null'
                  ).length || 0) +
                     (images.filter(
                        (url) => url && url !== null && url !== 'null'
                     ).length || 0) <
                     10 && (
                     <AddImageButton onClick={handleClick}>
                        <img src={CameraIcon} alt="cameraIcon" />
                        <input
                           ref={imageRef}
                           type="file"
                           accept=".png,.jpg,.jpeg"
                           onChange={handleFileChange}
                           style={{ display: 'none' }}
                        />
                     </AddImageButton>
                  )}
               </ImagesContainer>

               {(formData.imageUrls?.filter(
                  (url) => url && url !== null && url !== 'null'
               ).length || 0) +
                  (images.filter((url) => url && url !== null && url !== 'null')
                     .length || 0) ===
                  0 && (
                  <ImagesDescription>
                     <Typography className="add-photos-text">
                        Add photos to your house
                     </Typography>
                     <Typography className="add-photos-description">
                        You can upload up to 10 photos. The first photo will be
                        the main one.
                     </Typography>
                  </ImagesDescription>
               )}

               <Box
                  sx={{
                     mt: 2,
                     p: 1,
                     bgcolor: '#f5f5f5',
                     borderRadius: 1,
                     fontSize: '12px',
                  }}
               >
                  <Typography variant="caption">
                     Debug: Existing images:{' '}
                     {formData.imageUrls?.filter(
                        (url) => url && url !== null && url !== 'null'
                     ).length || 0}
                     , New images:{' '}
                     {images.filter(
                        (url) => url && url !== null && url !== 'null'
                     ).length || 0}
                     , Total:{' '}
                     {(formData.imageUrls?.filter(
                        (url) => url && url !== null && url !== 'null'
                     ).length || 0) +
                        (images.filter(
                           (url) => url && url !== null && url !== 'null'
                        ).length || 0)}
                  </Typography>
               </Box>
            </SectionContainer>

            <SectionContainer>
               <FieldLabel>Home type</FieldLabel>
               <FormControl>
                  <RadioGroup
                     row
                     name="houseType"
                     value={formData.houseType}
                     onChange={handleInputChange}
                  >
                     <Radio
                        options={[
                           { value: 'APARTMENT', label: 'Apartment' },
                           { value: 'HOUSE', label: 'House' },
                        ]}
                        value={formData.houseType}
                        onChange={(value) =>
                           setFormData((prev) => ({
                              ...prev,
                              houseType: value,
                           }))
                        }
                        row
                     />
                  </RadioGroup>
               </FormControl>
            </SectionContainer>

            <FlexContainer>
               <FlexItem>
                  <FieldLabel>Max of Guests</FieldLabel>
                  <StyledTextField
                     type="number"
                     name="maxGuests"
                     value={formData.maxGuests}
                     onChange={handleInputChange}
                     fullWidth
                     size="small"
                  />
               </FlexItem>
               <FlexItem>
                  <FieldLabel>Price</FieldLabel>
                  <PriceContainer>
                     <StyledTextField
                        placeholder="$ 0"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                     />
                  </PriceContainer>
               </FlexItem>
            </FlexContainer>

            <SectionContainer>
               <FieldLabel>Title</FieldLabel>
               <StyledTextField
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
               />
            </SectionContainer>

            <SectionContainer>
               <FieldLabel>Description of listing</FieldLabel>
               <StyledTextField
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  fullWidth
                  size="small"
               />
            </SectionContainer>

            <SectionContainer>
               <FieldLabel>Region</FieldLabel>
               <FormControl fullWidth size="small">
                  <StyledSelect
                     name="region"
                     value={formData.region}
                     onChange={handleInputChange}
                     displayEmpty
                  >
                     <MenuItem value="">Please, select the region</MenuItem>
                     {regions.map((region) => (
                        <MenuItem key={region} value={region}>
                           {region.replace(/_/g, ' ')}
                        </MenuItem>
                     ))}
                  </StyledSelect>
               </FormControl>
            </SectionContainer>

            <SectionContainer>
               <FieldLabel>Town / Province</FieldLabel>
               <StyledTextField
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
               />
            </SectionContainer>

            <SectionContainer>
               <FieldLabel>Address</FieldLabel>
               <StyledTextField
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
               />
            </SectionContainer>
            <SubmitButton>
               <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  width={790}
               >
                  {loading ? 'СОХРАНЕНИЕ...' : 'SAVE'}
               </Button>
            </SubmitButton>
            {error && <Alert severity="error">{error}</Alert>}
         </Box>
      </FormContainer>
   )
}

export default EditHouseForm

const FormContainer = styled(Box)(() => ({
   maxWidth: '100%',
   margin: '0 auto',
   backgroundColor: 'initial',
   padding: '20px',
   overflow: 'auto',
   maxHeight: '100%',
}))

const MainTitle = styled(Typography)(() => ({
   fontSize: '16px',
   fontWeight: 500,
   marginBottom: '20px',
   lineHeight: '100%',
   color: '#363636',
   textTransform: 'uppercase',
}))

const SectionContainer = styled(Box)(() => ({
   marginBottom: '20px',
}))

const FieldLabel = styled(Typography)(() => ({
   fontSize: '16px',
   fontWeight: 500,
   marginBottom: '8px',
   color: '#363636',
}))

const FlexContainer = styled(Box)(() => ({
   display: 'flex',
   gap: '15px',
   marginBottom: '20px',
}))

const FlexItem = styled(Box)(() => ({
   flex: 1,
}))

const PriceContainer = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const StyledTextField = styled(TextField)(() => ({
   '::placeholder': '#C4C4C4',
   '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      fontSize: '14px',
   },
}))

const StyledSelect = styled(Select)(() => ({
   backgroundColor: 'white',
   fontSize: '14px',
   '& .MuiSelect-icon': {
      right: '1rem',
   },
}))

const SubmitButton = styled(Box)(() => ({
  display:'flex',
  justifyContent:'center'
}))

const ImagesContainer = styled(Box)(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '10px',
   marginBottom: '10px',
}))

const ImageContainer = styled(Box)(() => ({
   position: 'relative',
   width: '120px',
   height: '80px',
   borderRadius: '8px',
   overflow: 'hidden',
   '& .added-image': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
   },
}))

const DeleteButton = styled(IconButton)(() => ({
   position: 'absolute',
   top: '5px',
   right: '5px',
   width: '20px',
   height: '20px',
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   borderRadius: '50%',
   padding: '0',
   '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
   },
   '& img': {
      width: '12px',
      height: '12px',
   },
}))

const AddImageButton = styled(Box)(() => ({
   width: '120px',
   height: '80px',
   border: '2px dashed #ccc',
   borderRadius: '8px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   cursor: 'pointer',
   transition: 'all 0.3s ease',
   '&:hover': {
      borderColor: '#666',
      backgroundColor: '#f5f5f5',
   },
   '& img': {
      width: '24px',
      height: '24px',
      opacity: 0.6,
   },
}))

const ImagesDescription = styled(Box)(() => ({
   textAlign: 'center',
   padding: '20px',
   backgroundColor: '#f9f9f9',
   borderRadius: '8px',
   '& .add-photos-text': {
      fontSize: '14px',
      fontWeight: 500,
      color: '#666',
      marginBottom: '5px',
   },
   '& .add-photos-description': {
      fontSize: '12px',
      color: '#999',
   },
}))
