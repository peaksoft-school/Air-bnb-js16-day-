import { createSlice } from '@reduxjs/toolkit'
import {
   fetchHouseById,
   fetchFeedbackByHouseId,
   fetchFavoritesByHouseId,
   fetchBookingsByHouseId,
   deleteHouseById,
   updateHouseById,
} from './announcementDetailThunk'

const initialState = {
   house: null,
   feedback: null,
   favorites: [],
   bookings: [],
   loading: false,
   error: null,
   updateSuccess: false,
   deleteSuccess: false,
}

const announcementDetailSlice = createSlice({
   name: 'announcementDetail',
   initialState,
   reducers: {
      resetUpdateSuccess(state) {
         state.updateSuccess = false
      },
      resetDeleteSuccess(state) {
         state.deleteSuccess = false
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchHouseById.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchHouseById.fulfilled, (state, action) => {
            state.house = action.payload
            state.loading = false
         })
         .addCase(fetchHouseById.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(fetchFeedbackByHouseId.fulfilled, (state, action) => {
            state.feedback = action.payload
         })
         .addCase(fetchFavoritesByHouseId.fulfilled, (state, action) => {
            state.favorites = action.payload
         })
         .addCase(fetchBookingsByHouseId.fulfilled, (state, action) => {
            state.bookings = action.payload
         })
         .addCase(deleteHouseById.fulfilled, (state) => {
            state.deleteSuccess = true
         })
         .addCase(updateHouseById.fulfilled, (state, action) => {
            state.house = action.payload
            state.updateSuccess = true
         })
   },
})

export const { resetUpdateSuccess, resetDeleteSuccess } =
   announcementDetailSlice.actions
export default announcementDetailSlice.reducer
