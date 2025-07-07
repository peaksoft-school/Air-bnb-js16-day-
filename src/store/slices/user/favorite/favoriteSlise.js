import { createSlice } from '@reduxjs/toolkit'
import { getFavorites, toggleFavorite } from './favoriteThunk'

const initialState = {
   favorites: [],
   isLoading: false,
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
            state.favorites = payload
            state.isLoading = false
         })
         .addCase(getFavorites.rejected, (state) => {
            state.isLoading = false
         })
         .addCase(toggleFavorite.fulfilled, (state, { payload }) => {
            const existing = state.favorites.find(
               (item) => item.id === payload.id
            )
            if (existing) {
               state.favorites = state.favorites.filter(
                  (item) => item.id !== payload.id
               )
            } else {
               state.favorites.push(payload)
            }
         })
   },
})
