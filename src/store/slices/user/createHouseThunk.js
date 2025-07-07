import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

const uploadImageToS3 = async (file) => {
   const formData = new FormData()
   formData.append('file', file)

   try {
      const response = await axiosInstance.post('/api/s3/upload', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })

      if (response.data && response.data.url) {
         return response.data.url
      } else if (response.data && response.data.imageUrl) {
         return response.data.imageUrl
      } else if (response.data && typeof response.data === 'string') {
         return response.data
      } else if (
         response.data &&
         Array.isArray(response.data) &&
         response.data.length > 0
      ) {
         return response.data[0]
      } else {
         throw new Error('Invalid S3 response structure')
      }
   } catch (error) {
      throw error
   }
}

export const createHouseBase = createAsyncThunk(
   'house/create',
   async (formData, { rejectWithValue }) => {
      try {
         const files = formData.getAll('images')

         const uploadPromises = files.map((file) => uploadImageToS3(file))
         const uploadedUrls = await Promise.all(uploadPromises)

         const requestData = {
            imageUrls: uploadedUrls,
            houseType: formData.get('houseType'),
            maxGuests: Number(formData.get('maxGuests')),
            price: Number(formData.get('price')),
            name: formData.get('name'),
            description: formData.get('description'),
            region: formData.get('region'),
            city: formData.get('city'),
            address: formData.get('address'),
         }

         const response = await axiosInstance.post(
            '/api/house/new',
            requestData,
            {
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         )

         return response.data
      } catch (error) {
         if (error.message === 'Invalid S3 response structure') {
            return rejectWithValue('Ошибка загрузки фото на сервер')
         }

         return rejectWithValue(
            error.response?.data?.message || 'Ошибка при создании дома'
         )
      }
   }
)
