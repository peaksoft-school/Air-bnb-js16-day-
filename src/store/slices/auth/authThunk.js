import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'
import { showToast } from '../../../utils/helpers/showToast'
import { ROUTES } from '../../../routes/routes'

const signIn = createAsyncThunk(
   'auth/signIn',

   async (
      { values, navigate, setSubmitting, handleClose },
      { rejectWithValue }
   ) => {
      try {
         const { data } = await axiosInstance.post('/api/auth/login', values)

         navigate(
            data.role === 'ADMIN' ? ROUTES.ADMIN.APPLICATION : ROUTES.USER.INDEX
         )

         showToast({
            title: 'Успешно!',
            message: 'Вы успешно вошли!',
            type: 'success',
         })

         handleClose()

         return data
      } catch (error) {
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

const authWithGoogle = createAsyncThunk(
   'auth/authWithGoogle',

   async ({ idToken, navigate, handleClose }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/auth/google?idToken=${idToken}`
         )

         showToast({
            title: 'Успешно!',
            message: 'Вы успешно вошли!',
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

   async ({ email, handleClose }, { rejectWithValue }) => {
      try {
         const resetLinkBase = `${window.location.origin}/reset-password/`

         const { data } = await axiosInstance.post(
            '/api/auth/forgot-password',
            {
               email,
               link: resetLinkBase,
            }
         )

         showToast({
            title: 'Успешно!',
            message: 'Ссылка для сброса пароля отправлена на ваш email',
            type: 'success',
         })

         handleClose()

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

const resetPassword = createAsyncThunk(
   'auth/resetPassword',

   async ({ token, newPassword, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/api/auth/reset-password', {
            token,
            newPassword,
         })

         showToast({
            title: 'Успешно!',
            message: 'Пароль успешно изменен!',
            type: 'success',
         })

         navigate('/')

         return data
      } catch (error) {
         showToast({
            title: 'Ошибка!',
            message: error?.message || 'Ошибка при сбросе пароля',
            type: 'error',
         })

         return rejectWithValue({
            message:
               error.response?.data?.message || 'Ошибка при сбросе пароля',
         })
      }
   }
)

export const AUTH_THUNK = {
   signIn,
   authWithGoogle,
   forgotPassword,
   resetPassword,
}
