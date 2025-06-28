import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

const getHouses = createAsyncThunk(
   'regionPage/getHouses',

   async (params, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/house/for-users', {
            params: {
               region: params.region || 'All',
               popularity: params.popularity || 'All',
               houseType: params.houseType || 'All',
               priceSort: params.priceSort || 'All',
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
