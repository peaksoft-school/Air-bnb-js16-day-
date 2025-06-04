import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const fetchUserProfile = createAsyncThunk(
   'user/fetchUserProfile',
   async ({ choice, id }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/user/profile', {
            params: { choice },
         })
         return { data: response.data, choice }
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)
