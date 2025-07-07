import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

export const getFavorites = createAsyncThunk(
   'get/favorites',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/favorite/all')
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data)
      }
   }
)

export const addFavorite = createAsyncThunk(
   'post/favorite',
   async (houseId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            '/api/favorite/action',
            {},
            { params: { houseId } }
         )
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data)
      }
   }
)

export const deleteFavorite = createAsyncThunk(
   'delete/favorite',
   async (houseId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete('/api/favorite/action', {
            params: { houseId },
         })
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data)
      }
   }
)
