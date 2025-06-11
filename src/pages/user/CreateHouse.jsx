import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetState } from '../../store/slices/user/createHouseSlice'
import Radio from '../../components/UI/Radio'
import {
   Box,
   Typography,
   TextField,
   Button,
   FormControl,
   FormLabel,
   RadioGroup,
   FormControlLabel,
   Select,
   MenuItem,
   Alert,
   styled,
} from '@mui/material'
import { createHouseBase } from '../../store/slices/user/createHouseThunk'
import Loading from '../Loading'

const CreateHouseForm = () => {
   const dispatch = useDispatch()
   const { success, error, loading } = useSelector(
      (state) => state.createHouse || {}
   )

   const [formData, setFormData] = useState({
      imageUrls: [],
      houseType: 'HOUSE',
      maxGuests: 0,
      price: 0,
      name: '',
      description: '',
      region: '',
      city: '',
      address: '',
   })

   const [imageFiles, setImageFiles] = useState([])

   const regions = [
      'BISHKEK',
      'CHUY',
      'ISSYK_KUL',
      'NARYN',
      'TALAS',
      'OSH',
      'JALAL_ABAD',
      'BATKEN',
   ]

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }))
   }

   const handleImageUpload = (e) => {
      const files = Array.from(e.target.files)
      if (files.length + imageFiles.length > 4) {
         alert('Максимум 4 фотографии')
         return
      }

      setImageFiles((prev) => [...prev, ...files])

      const newUrls = files.map((file) => URL.createObjectURL(file))
      setFormData((prev) => ({
         ...prev,
         imageUrls: [...prev.imageUrls, ...newUrls],
      }))
   }

   const removeImage = (index) => {
      const newFiles = [...imageFiles]
      const newUrls = [...formData.imageUrls]

      newFiles.splice(index, 1)
      newUrls.splice(index, 1)

      setImageFiles(newFiles)
      setFormData((prev) => ({
         ...prev,
         imageUrls: newUrls,
      }))
   }
   const handleSubmit = async (e) => {
      e.preventDefault()

      if (
         !formData.name ||
         !formData.description ||
         !formData.region ||
         !formData.city ||
         !formData.address ||
         imageFiles.length === 0
      ) {
         alert('Пожалуйста, заполните все обязательные поля')
         return
      }

      const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB
      const isValidSize = imageFiles.every((file) => file.size <= MAX_FILE_SIZE)
      if (!isValidSize) {
         alert('Размер каждого файла должен быть не более 3MB')
         return
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
      const isValidType = imageFiles.every((file) =>
         allowedTypes.includes(file.type)
      )
      if (!isValidType) {
         alert('Разрешены только файлы типа JPEG, JPG или PNG')
         return
      }

      try {
         const formDataToSend = new FormData()

         formDataToSend.append('houseType', formData.houseType)
         formDataToSend.append('maxGuests', formData.maxGuests)
         formDataToSend.append('price', formData.price)
         formDataToSend.append('name', formData.name)
         formDataToSend.append('description', formData.description)
         formDataToSend.append('region', formData.region)
         formDataToSend.append('city', formData.city)
         formDataToSend.append('address', formData.address)

         imageFiles.forEach((file) => {
            formDataToSend.append('images', file)
         })

         await dispatch(createHouseBase(formDataToSend)).unwrap()
      } catch (error) {
         console.error('Error:', error)
      }
   }

   const resetForm = () => {
      dispatch(resetState())
      setFormData({
         imageUrls: [],
         houseType: 'HOUSE',
         maxGuests: 0,
         price: 0,
         name: '',
         description: '',
         region: '',
         city: '',
         address: '',
      })
      setImageFiles([])
   }

   if (success) {
      return (
         <SuccessContainer>
            <SuccessTitle variant="h5">Дом успешно создан!</SuccessTitle>
            <SuccessButton onClick={resetForm}>
               Создать еще один дом
            </SuccessButton>
         </SuccessContainer>
      )
   }

   if (loading) {
      return (
         <>
            <Loading />
         </>
      )
   }

   return (
      <FormContainer>
         <MainTitle>HI! LET'S GET STARTED LISTING YOUR PLACE.</MainTitle>

         <SubTitle>
            In this form, we'll collect some basic and additional information
            about your listing.
         </SubTitle>

         {error && (
            <Alert severity="error" sx={{ marginBottom: '20px' }}>
               {typeof error === 'string' ? error : 'Ошибка при создании дома'}
            </Alert>
         )}

         <Box component="form" onSubmit={handleSubmit}>
            <SectionContainer>
               <FieldLabel>
                  Image{' '}
                  <Box component="span" sx={{ color: '#A9A9A9' }}>
                     Max 4 photo
                  </Box>
               </FieldLabel>

               {imageFiles.length < 4 && (
                  <ImageUploadContainer>
                     <HiddenFileInput
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                     />
                     <ImageIconContainer>
                        <svg
                           width="43.2"
                           height="32.3"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="#ccc"
                           strokeWidth="2"
                        >
                           <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                           <circle cx="12" cy="13" r="4" />
                        </svg>
                     </ImageIconContainer>
                     <Box>
                        <UploadText>Add photos to the review</UploadText>
                        <UploadSubtext>
                           It will become more noticeable and even more useful.
                           <br />
                           You can upload up to 4 photos.
                        </UploadSubtext>
                     </Box>
                  </ImageUploadContainer>
               )}

               {imageFiles.length > 0 && (
                  <ImagePreviewContainer>
                     {formData.imageUrls.map((url, index) => (
                        <Box key={index} sx={{ position: 'relative' }}>
                           <ImagePreview
                              src={url}
                              alt={`Preview ${index + 1}`}
                           />
                           <RemoveImageButton
                              onClick={() => removeImage(index)}
                           >
                              ×
                           </RemoveImageButton>
                        </Box>
                     ))}
                  </ImagePreviewContainer>
               )}
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
                     <RadioContainer>
                        <Radio
                           options={[
                              {
                                 value: 'APARTMENT',
                                 label: 'Apartment',
                              },
                              {
                                 value: 'HOUSE',
                                 label: 'House',
                              },
                           ]}
                           value={formData.houseType}
                           onChange={(value) => {
                              setFormData((prev) => ({
                                 ...prev,
                                 houseType: value,
                              }))
                           }}
                           row
                        />
                     </RadioContainer>
                  </RadioGroup>
               </FormControl>
            </SectionContainer>

            <FlexContainer>
               <FlexItem>
                  <FieldLabel>Max of Guests</FieldLabel>
                  <StyledTextField
                     type="number"
                     name="maxGuests"
                     inputProps={{ min: 1 }}
                     value={formData.maxGuests}
                     onChange={handleInputChange}
                     placeholder="0"
                     fullWidth
                     size="small"
                  />
               </FlexItem>
               <FlexItem>
                  <FieldLabel>Price</FieldLabel>
                  <PriceContainer>
                     <DollarSign>$</DollarSign>
                     <StyledTextField
                     
                        type="number"
                        name="price"
                        inputProps={{ min: 0, step: 0.1 }}
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
                  placeholder="Enter listing title"
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
                  placeholder="Describe your listing"
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
                  placeholder="Enter town or province"
                  fullWidth
                  size="small"
               />
            </SectionContainer>

            <SectionContainer sx={{ marginBottom: '30px' }}>
               <FieldLabel>Address</FieldLabel>
               <StyledTextField
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                  fullWidth
                  size="small"
               />
            </SectionContainer>

            <SubmitButton type="submit" disabled={loading} loading={loading}>
               {loading ? 'СОЗДАНИЕ...' : 'SUBMIT'}
            </SubmitButton>
         </Box>
      </FormContainer>
   )
}

export default CreateHouseForm

const FormContainer = styled(Box)(() => ({
   maxWidth: '610px',
   margin: '0 auto',
   backgroundColor: 'initial',
   padding: '20px',
}))

const MainTitle = styled(Typography)(() => ({
   fontSize: '16px',
   fontWeight: 500,
   marginBottom: '20px',
   lineHeight: '100%',
   color: '#363636',
   textTransform: 'uppercase',
}))

const SubTitle = styled(Typography)(() => ({
   width: '480px',
   fontSize: '16px',
   fontWeight: 400,
   color: '#717171',
   marginBottom: '20px',
   lineHeight: '100%',
}))

const SuccessContainer = styled(Box)(() => ({
   padding: '20px',
   textAlign: 'center',
   backgroundColor: '#f0f9ff',
   border: '1px solid #0ea5e9',
   borderRadius: '8px',
   margin: '20px',
}))

const SuccessTitle = styled(Typography)(() => ({
   color: '#0ea5e9',
   marginBottom: '10px',
   fontWeight: 'bold',
}))

const SuccessButton = styled(Button)(() => ({
   backgroundColor: '#f97316',
   color: 'white',
   padding: '10px 20px',
   fontWeight: 'bold',
   '&:hover': {
      backgroundColor: '#ea580c',
   },
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

const ImageUploadContainer = styled(Box)(() => ({
   height: '135px',
   display: 'flex',
   alignItems: 'center',
   textAlign: 'start',
   backgroundColor: 'white',
   cursor: 'pointer',
}))

const HiddenFileInput = styled('input')(() => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   opacity: 0,
   cursor: 'pointer',
}))

const ImageIconContainer = styled(Box)(() => ({
   width: '135px',
   height: '135px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

const UploadText = styled(Typography)(() => ({
   textAlign: 'start',
   color: '#266BD3',
   fontSize: '16px',
   fontWeight: '500',
   margin: '0 0 8px',
}))

const UploadSubtext = styled(Typography)(() => ({
   textAlign: 'start',
   color: '#828282',
   fontSize: '14px',
   fontWeight: '400',
   lineHeight: '1.4',
}))

const ImagePreviewContainer = styled(Box)(() => ({
   display: 'flex',
   gap: '10px',
   marginTop: '10px',
   flexWrap: 'wrap',
}))

const ImagePreview = styled('img')(() => ({
   width: '80px',
   height: '80px',
   objectFit: 'cover',
   borderRadius: '4px',
   border: '1px solid #eee',
}))

const RemoveImageButton = styled(Button)(() => ({
   position: 'absolute',
   top: '-5px',
   right: '-5px',
   backgroundColor: '#ef4444',
   color: 'white',
   border: 'none',
   borderRadius: '50%',
   width: '20px',
   height: '20px',
   minWidth: '20px',
   fontSize: '12px',
   padding: 0,
   '&:hover': {
      backgroundColor: '#dc2626',
   },
}))

const RadioContainer = styled(Box)(() => ({
   display: 'flex',
   gap: '15px',
}))

const HouseRadioLabel = styled(FormControlLabel)(() => ({
   '& .MuiFormControlLabel-label': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
   },
}))

const OrangeDot = styled(Box)(() => ({
   width: '8px',
   height: '8px',
   backgroundColor: '#f97316',
   borderRadius: '50%',
   marginRight: '8px',
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

const DollarSign = styled(Typography)(() => ({
   marginRight: '8px',
   fontWeight: 'bold',
   color: '#666',
}))

const StyledTextField = styled(TextField)(() => ({

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

const SubmitButton = styled(Button)(({ loading }) => ({
   width: '100%',
   padding: '12px',
   backgroundColor: loading ? '#ccc' : '#f97316',
   color: 'white',
   fontSize: '14px',
   fontWeight: 'bold',
   textTransform: 'uppercase',
   '&:hover': {
      backgroundColor: loading ? '#ccc' : '#ea580c',
   },
   '&:disabled': {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
   },
}))
