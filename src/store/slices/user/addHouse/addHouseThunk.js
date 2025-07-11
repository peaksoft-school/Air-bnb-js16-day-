import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

export const postImageFile = createAsyncThunk(
   'post/imageFile',
   async ({ files }, { rejectWithValue }) => {
      try {
         const formData = new FormData()
         files.forEach((file) => formData.append('files', file))

         const response = await axiosInstance.post('/api/s3/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
         })

         return response.data // массив ссылок
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

export const saveHouse = createAsyncThunk(
   'post/saveHouse',
   async (
      { newData, reset, dispatch, clearImage, showToast },
      { rejectWithValue }
   ) => {
      try {
         const response = await axiosInstance.post('/api/house/get/', newData)
         reset()
         dispatch(clearImage())
         'post/saveHouse',
            async (
               { newData, reset, dispatch, clearImage, showToast },
               { rejectWithValue }
            ) => {
               try {
                  const response = await axiosInstance.post(
                     '/api/house/get/',
                     newData
                  )
                  reset()
                  dispatch(clearImage())

                  showToast({
                     title: 'Success',
                     message: 'You have successfully added an image :)',
                     type: 'success',
                  })
                  showToast({
                     title: 'Success',
                     message: 'You have successfully added an image :)',
                     type: 'success',
                  })

                  return response.data
               } catch (error) {
                  return rejectWithValue(error.response?.data || error.message)
               }
            }
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
