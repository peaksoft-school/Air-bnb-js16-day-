import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

const singUp = createAsyncThunk(
   'auth/signUp',

   async ({ values }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/api/auth/register', values)
         return data
      } catch (error) {
         return rejectWithValue({ message: error.respons.data.message })
      }
   }
)

export const AUTH_THUNK = { singUp }

