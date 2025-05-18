import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const fetchAllUsers = createAsyncThunk(
   'user/fetchAllUsers',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/user')
         return data
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

export const fetchUserProfile = createAsyncThunk(
   'user/fetchUserProfile',
   async ({ choice }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/user/profile', {
            params: { choice },
         })
         return { data, choice }
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)

export const deleteUser = createAsyncThunk(
   'user/deleteUser',
   async (userId, { rejectWithValue }) => {
      try {
         await axiosInstance.delete(`/api/user/${userId}`)
         return userId
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message)
      }
   }
)
