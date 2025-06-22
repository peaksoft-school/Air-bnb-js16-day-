import { createSlice } from '@reduxjs/toolkit'
import { getFavorites } from './favoriteThunk'

const initialState = {
   isLoading: false,
   favorites: [],
}

export const favoriteSlice = createSlice({
   name: 'favorite',
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(getFavorites.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getFavorites.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.favorites = payload
         })

         .addCase(getFavorites.rejected, (state) => {
            state.isLoading = false
         })
   },
})
