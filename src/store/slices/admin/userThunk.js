import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const fetchAllUsers = createAsyncThunk(
   'user/fetchAllUsers',

   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/user/getAll')

         return data
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

export const fetchUserProfile = createAsyncThunk(
   'user/fetchUserProfile',
   async ({ choice, id }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/user/profile', {
            params: { choice },
         })
         return { data: response.data, choice }
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

export const deleteUser = createAsyncThunk(
   'user/deleteUser',
   async (userId, { rejectWithValue }) => {
      try {
         await axiosInstance.delete(`/api/user/deleteUser/${userId}`)
         return userId
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

export const deleteHouse = createAsyncThunk(
   'user/deleteHouse',
   async (houseId, { rejectWithValue }) => {
      try {
         await axiosInstance.delete(`/api/house/delete/${houseId}`)
         return houseId
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)
export const blockAllAnnoucement = createAsyncThunk(
   'blockAllAnnoucement',
   async (userId, { rejectWithValue }) => {
      try {
         await axiosInstance.put(`/api/house/block-allAnnouncement/${userId}`)
         return userId
      } catch (error) {
         return rejectWithValue(err.response?.data || error.message)
      }
   }
)
