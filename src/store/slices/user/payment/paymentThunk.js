import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

export const createPayment = createAsyncThunk(
   'payment/create',

   async (paymentData, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/api/payments/create',
            paymentData
         )

         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Payment failed'
         )
      }
   }
)
