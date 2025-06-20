import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { ROUTES } from '../../../../routes/routes'

export const getBookings = createAsyncThunk(
   'house/getBookings',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/users/bookings')
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

export const getAnnouncement = createAsyncThunk(
   'house/getAnnouncement',
   async ({ houseType, rating, price }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/users/filter', {
            params: { houseType, rating, price },
         })
         return data.responses
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

export const getAnnouncementById = createAsyncThunk(
   'house/getAnnouncementById',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/house/get/${id}`)
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

export const getModeration = createAsyncThunk(
   'house/getModeration',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            '/api/users/moderation/houses'
         )
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

export const deleteAnnouncement = createAsyncThunk(
   'house/deleteAnnouncement',
   async (id, { dispatch, rejectWithValue }) => {
      try {
         await axiosInstance.delete(`/api/house/get/${id}`)
         return dispatch(
            getAnnouncement({ houseType: '', rating: '', price: '' })
         )
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)

export const globalSearchAsync = createAsyncThunk(
   'house/searchHouse',
   async ({ searchInput, isNearby, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/houses/global-search', {
            params: { word: searchInput, isNearby },
         })

         navigate(
            data.houseResponses.length > 0
               ? ROUTES.USER.innerRegion
               : ROUTES.USER.innerRegionNotFound,
            { state: { text: searchInput, houseData: data.houseResponses } }
         )
         return data.houseResponses
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
