import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const createHouseBase = createAsyncThunk(
   'house/create',
   async (formData, { rejectWithValue }) => {
      try {
         const files = formData.getAll('images')

         const imageUrls = files.map((file) => file.name)

         const requestData = {
            imageUrls,
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
         console.error('Full error:', error)
         return rejectWithValue(
            error.response?.data?.message || 'Ошибка при создании дома'
         )
      }
   }
)
