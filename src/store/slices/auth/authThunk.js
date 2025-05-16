import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'
import { showToast } from '../../../utils/helpers/showToast'
import { ROUTES } from '../../../routes/routes'

const login = createAsyncThunk(
   'auth/login',

   async (
      { values, navigate, setSubmitting, handleClose },
      { rejectWithValue }
   ) => {
      try {
         const { data } = await axiosInstance.post('/api/auth/login', values)

         showToast({
            title: 'Успешно!',
            message: 'Вы успешно вошли в систему!',
            type: 'success',
         })

         navigate(
            data.role === 'ADMIN' ? ROUTES.ADMIN.INDEX : ROUTES.USER.INDEX
         )

         handleClose()

         return data
      } catch (error) {
         console.log(error)

         showToast({
            title: 'Ошибка!',
            message:
               error.response?.data?.message || error.response?.data?.email,
            type: 'error',
         })

         return rejectWithValue({
            message: error.response?.data?.message || 'Login failed',
         })
      } finally {
         setSubmitting(false)
      }
   }
)

const googleSignIn = createAsyncThunk(
   'auth/googleSignIn',

   async ({ idToken, navigate, handleClose }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/auth/google?idToken=${idToken}`
         )

         showToast({
            title: 'Успешно!',
            message: 'Вы успешно вошли через Google!',
            type: 'success',
         })

         handleClose()

         navigate('/user')
         return data
      } catch (error) {
         showToast({
            title: 'Ошибка!',
            message:
               error.message ||
               'Не удалось войти через Google. Пожалуйста, попробуйте снова.',
            type: 'error',
         })

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
