import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

export const toggleFavorite = createAsyncThunk(
   'favorite/toggle',
   async (houseId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/api/favorite/action', {
            houseId,
         })
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data)
      }
   }
)

export const getFavorites = createAsyncThunk(
   'favorite/get',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/favorite/all')
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data)
      }
   }
)
