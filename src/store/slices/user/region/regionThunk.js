import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

const getHouses = createAsyncThunk(
   'regionPage/getHouses',

   async (params, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/house/for-users', {
            params: {
               region: params.region || 'all',
               popularity: params.popularity || 'all',
               houseType: params.houseType || 'all',
               priceSort: params.priceSort || 'all',
               search: params.search || '',
               page: params.page,
               size: params.size,
               lat: 0,
               lng: 0,
               radius: 1000,
            },
         })

         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const REGION_THUNK = { getHouses }
