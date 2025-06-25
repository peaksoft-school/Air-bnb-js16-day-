import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../../configs/axiosInstance'
// Получить детали дома
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

// Получить отзывы
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

// Получить избранное
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

// Получить бронирования
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

// Удалить дом
export const deleteHouseById = createAsyncThunk(
   'announcementDetail/deleteHouseById',
   async (id, { rejectWithValue }) => {
      try {
         await axiosInstance.delete(`/api/house/delete/${id}`)
         return id
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

// Обновить дом
export const updateHouseById = createAsyncThunk(
   'announcementDetail/updateHouseById',
   async (payload, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.put('/api/house/update', payload)
         return data
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)
