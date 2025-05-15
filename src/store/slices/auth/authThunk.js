import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

const login = createAsyncThunk(
   'auth/login',
   async (formData, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/api/auth/login', formData)
         return data
      } catch (error) {
         return rejectWithValue({
            message: error.response?.data?.message || 'Login failed',
         })
      }
   }
)

const googleSignIn = createAsyncThunk(
   'auth/googleSignIn',
   async ({ idToken, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/auth/google?idToken=${idToken}`
         )
         navigate('/user')
         return data
      } catch (error) {
         return rejectWithValue({
            message: error.response?.data?.message || 'Google sign in failed',
         })
      }
   }
)

const forgotPassword = createAsyncThunk(
   'auth/forgotPassword',
   async ({ email, onSuccess }, { rejectWithValue }) => {
      try {
         const resetLinkBase = `${window.location.origin}/reset-password/`
         const { data } = await axiosInstance.post(
            '/api/auth/forgot-password',
            {
               email,
               link: resetLinkBase,
            }
         )
         if (onSuccess) onSuccess()
         return data
      } catch (error) {
         return rejectWithValue({
            message:
               error.response?.data?.message ||
               'Ошибка при запросе сброса пароля',
         })
      }
   }
)

export const resetPassword = createAsyncThunk(
   'auth/resetPassword',
   async ({ token, newPassword, onSuccess, onError }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/api/auth/reset-password', {
            token,
            newPassword,
         })

         if (onSuccess) onSuccess()
         return data
      } catch (error) {
         if (onError) onError(error.response?.data || error)
         return rejectWithValue({
            message:
               error.response?.data?.message || 'Ошибка при сбросе пароля',
         })
      }
   }
)

export const AUTH_THUNK = {
   login,
   googleSignIn,
   forgotPassword,
   resetPassword,
}
