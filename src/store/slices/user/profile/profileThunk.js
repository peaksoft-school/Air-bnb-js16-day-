import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

const getUserProfile = createAsyncThunk(
   'profile/fetchUserProfile',

   async ({ choice }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/user/profile', {
            params: { choice },
         })

         return { data, choice }
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

export const PROFILE_THUNK = { getUserProfile }
