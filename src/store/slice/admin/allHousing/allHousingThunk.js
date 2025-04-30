import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../axiosInstance'

export const getFilteredHousingRequest = createAsyncThunk(
   'housing/getFilteredHousing',
   async (
      { bookingStatus, popularity, priceSort, houseType },
      { rejectWithValue }
   ) => {
      try {
         const response = await axiosInstance.get(
            `/api/house/all-for-admin?bookingStatus=${bookingStatus}&popularity=${popularity}&houseType=${houseType}&priceSort=${priceSort}`
         )

         console.log(4)
         return response.data
      } catch (error) {
         console.log(5)
         const message =
            error.response?.data?.message || 'Failed to fetch housing list'
         return rejectWithValue(message)
      }
   }
)
