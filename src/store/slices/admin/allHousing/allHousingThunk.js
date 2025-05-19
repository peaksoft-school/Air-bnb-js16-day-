import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../axiosInstance'

export const getFilteredHousingRequest = createAsyncThunk(
   'housing/getFilteredHousing',
   async (
      { bookingStatus, popularity, priceSort, houseType },
      { rejectWithValue }
   ) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/house/all-for-admin?bookingStatus=${bookingStatus}&popularity=${popularity}&houseType=${houseType}&priceSort=${priceSort}`
         )

         return data
      } catch (error) {
         const message =
            error.response?.data?.message || 'Failed to fetch housing list'
         return rejectWithValue(message)
      }
   }
)
