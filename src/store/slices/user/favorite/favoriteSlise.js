import { createSlice } from '@reduxjs/toolkit'
import { getFavorites, addFavorite } from './favoriteThunk'

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
         .addCase(addFavorite.fulfilled, (state, { payload }) => {
            const exists = state.favorites.some((fav) => fav.id === payload.id)
            if (!exists) {
               state.favorites.push(payload)
            } else {
               state.favorites = state.favorites.filter(
                  (fav) => fav.id !== payload.id
               )
            }
         })
   },
})
