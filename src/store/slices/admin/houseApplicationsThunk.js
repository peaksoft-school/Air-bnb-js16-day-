import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const fetchApplications = createAsyncThunk(
   'houseApplications/fetchApplications',
   async ({ page, size }, { dispatch, rejectWithValue }) => {
      console.log(page, size)
      try {
         const response = await axiosInstance.get(
            `/api/house/applications?page=${page}&size=${size}`
         )

         const responseData = response.data
         return {
            data: responseData.data || responseData.content,
            totalPages: responseData.totalPages,
            currentPage: responseData.currentPage || responseData.page || page,
         }
      } catch (error) {
         if (error.response?.status === 401) {
            dispatch(AUTH_ACTIONS.logOut())
         }
         return rejectWithValue(
            error.response?.data?.message || 'Ошибка загрузки данных'
         )
      }
   }
)
