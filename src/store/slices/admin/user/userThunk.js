import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

export const getUser = createAsyncThunk(
   'user/getUser',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/user/get/${id}`)

         return data
      } catch (error) {
         return rejectWithValue(error.response.message)
      }
   }
)

export const getHouseById = createAsyncThunk(
   'userAnnouncement/getAnnouncement',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/house/get/${id}`)

         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const getAnnouncementFeedback = createAsyncThunk(
   'announcementFeedback/getFeedback',
   async (houseId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/feedback/all/${houseId}`
         )

         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const getAnnouncementRating = createAsyncThunk(
   'announcementRating/getRating',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/feedbacks/${id}/ratings`
         )

         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const getAllFavorites = createAsyncThunk(
   'user/getAllFavorites',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/favorite/getById/${id}`)

         return data
      } catch (error) {
         return rejectWithValue(error.response.message)
      }
   }
)

export const deleteHouseAsync = createAsyncThunk(
   'user/deleteHouse',
   async (
      { id, showToast, getUserHouses, navigate },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.delete(`/api/house/delete/${id}`)

         if (navigate) {
            navigate(-1)
         }

         showToast({
            title: 'Delete',
            message: 'Successfully deleted',
            type: 'success',
         })
         if (getUserHouses) {
            return getUserHouses()
         }
         return dispatch(getHouseById(id))
      } catch (error) {
         showToast({
            title: 'Delete',
            message: error.response?.message,
            type: 'error',
         })
         return rejectWithValue(error.response.message)
      }
   }
)

export const blockedHouses = createAsyncThunk(
   'user/blockedHouses',
   async (
      { id, block, showToast, getUserHouses },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/house/block/${id}?blockOrUnblock=${block}`
         )

         showToast({
            title: 'Block',
            message: data.message,
            type: 'success',
         })
         if (getUserHouses) {
            return getUserHouses()
         }
         return dispatch(getHouseById(id))
      } catch (error) {
         showToast({
            title: 'Block',
            message: error.response?.message,
            type: 'error',
         })
         return rejectWithValue(error.response.message)
      }
   }
)
