import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosinstace'

export const getHouseById = createAsyncThunk(
   'user/getHouseById',
   async (announcementId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/announcements/${announcementId}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data || 'Ошибка при получении объявления'
         )
      }
   }
)

export const getAnnouncementFeedback = createAsyncThunk(
   'user/getAnnouncementFeedback',
   async (announcementId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/announcements/${announcementId}/feedback`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data || 'Ошибка при получении отзывов'
         )
      }
   }
)

export const getAnnouncementRating = createAsyncThunk(
   'user/getAnnouncementRating',
   async (announcementId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/announcements/${announcementId}/rating`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data || 'Ошибка при получении рейтинга'
         )
      }
   }
)

export const blockedHouses = createAsyncThunk(
   'user/blockedHouses',
   async ({ id, block = true }, { rejectWithValue }) => {
      try {
         await axiosInstance.put(`/houses/block/${id}`, { block })
         return id
      } catch (error) {
         return rejectWithValue(
            error.response?.data || 'Ошибка при блокировке объявления'
         )
      }
   }
)

export const deleteHouseAsync = createAsyncThunk(
   'user/deleteHouseAsync',
   async ({ id }, { rejectWithValue }) => {
      try {
         await axiosInstance.delete(`/houses/${id}`)
         return id
      } catch (error) {
         return rejectWithValue(
            error.response?.data || 'Ошибка при удалении объявления'
         )
      }
   }
)
