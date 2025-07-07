import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../../configs/axiosInstance'
export const fetchHouseById = createAsyncThunk(
   'announcementDetail/fetchHouseById',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/house/get/${id}`)
         return data
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

export const fetchFeedbackByHouseId = createAsyncThunk(
   'announcementDetail/fetchFeedbackByHouseId',
   async (houseId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/feedback/all/${houseId}`
         )
         return data
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

export const fetchFavoritesByHouseId = createAsyncThunk(
   'announcementDetail/fetchFavoritesByHouseId',
   async (houseId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/favorite/house/${houseId}`
         )
         return data
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

export const fetchBookingsByHouseId = createAsyncThunk(
   'announcementDetail/fetchBookingsByHouseId',
   async (houseId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/booking/houses-for-user/${houseId}/bookings`
         )
         return data
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

export const deleteHouseById = createAsyncThunk(
   'announcementDetail/deleteHouseById',
   async (id, { rejectWithValue }) => {
      try {
         await axiosInstance.delete(`/api/house/houses/${id}`)
         return id
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

export const updateHouseById = createAsyncThunk(
   'announcementDetail/updateHouseById',
   async (payload, { rejectWithValue }) => {
      try {
         console.log('🚀 Sending update request to /api/house/update')
         console.log('📦 Payload:', JSON.stringify(payload, null, 2))

         const { data } = await axiosInstance.put('/api/house/update', payload)

         console.log('✅ Update response:', JSON.stringify(data, null, 2))
         return data
      } catch (err) {
         console.error('❌ Update error:', err.response?.data || err.message)
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)
