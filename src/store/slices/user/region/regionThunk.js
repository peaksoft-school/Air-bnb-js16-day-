import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

const getHouses = createAsyncThunk(
   'regionPage/getHouses',

   async (params, { rejectWithValue }) => {
      try {

         const requestParams = {
            region: params.region || undefined,
            popularity: params.popularity || undefined,
            houseType: params.houseType || undefined,
            priceSort: params.priceSort || undefined,
            search: params.search || undefined,
            page: params.page,
            size: params.size,
            lat: 0,
            lng: 0,
            radius: 1000,
         }


         const { data } = await axiosInstance.get('/api/house/for-users', {
            params: requestParams,
         })

         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const REGION_THUNK = { getHouses }
