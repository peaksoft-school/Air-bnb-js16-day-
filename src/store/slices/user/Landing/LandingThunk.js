import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

export const getLandingPageReguest = createAsyncThunk(
   'Landing/getLandingPage',
   async (houseStatus, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            '/api/auth/latest-or-popular',
            {
               params: houseStatus,
            }
         )
         return data
      } catch (error) {
         const message =
            error.response?.data?.massage || 'Failed to fetch landing page data'
         return rejectWithValue(message)
      }
   }
)
