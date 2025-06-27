import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

export const acceptOrRejectHouse = createAsyncThunk(
   'admin/acceptOrRejectHouse',
   async ({ houseId, isAccepted, rejectInfo }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/api/acceptReject/accept-reject',
            {
               houseId,
               isAccepted,
               rejectInfo,
            }
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

export const acceptOrDeleteHouse = createAsyncThunk(
   'admin/acceptOrDeleteHouse',
   async (houseId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/house/houses/${houseId}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
