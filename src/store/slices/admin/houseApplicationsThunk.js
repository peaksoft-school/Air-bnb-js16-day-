import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'
import { AUTH_ACTIONS } from '../auth/authSlice'

export const fetchApplications = createAsyncThunk(
   'houseApplications/fetchApplications',
   async ({ page = 1, size = 18 }, { dispatch, rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/house/applications', {
            params: { page, size },
         })

         const responseData = response.data

         if (Array.isArray(responseData)) {
            return {
               data: responseData,
               totalPages: Math.ceil(responseData.length / size),
               currentPage: page,
            }
         }

         if (responseData && responseData.content) {
            return {
               data: responseData.content,
               totalPages: responseData.totalPages || 1,
               currentPage: page,
            }
         }

         return {
            data: responseData.data || responseData || [],
            totalPages: responseData.totalPages || 1,
            currentPage: page,
         }
      } catch (error) {
         console.error('API Error:', error.response?.data)

         if (error.response?.status === 401) {
            dispatch(AUTH_ACTIONS.logOut())
         }
         return rejectWithValue(
            error.response?.data?.message || 'Ошибка загрузки данных'
         )
      }
   }
)

