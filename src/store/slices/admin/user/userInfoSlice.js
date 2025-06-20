import { createSlice } from '@reduxjs/toolkit'
import {
   getHouseById,
   getAnnouncementFeedback,
   getAnnouncementRating,
} from './userThunk'

const initialState = {
   house: null,
   feedbacks: [],
   rating: null,
   isLoading: false,
   error: null,
}

export const userInfoSlice = createSlice({
   name: 'userInfo',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getHouseById.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(getHouseById.fulfilled, (state, action) => {
            state.house = action.payload
            state.isLoading = false
         })
         .addCase(getHouseById.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
         })
         .addCase(getAnnouncementFeedback.fulfilled, (state, action) => {
            state.feedbacks = action.payload.feedbackResponses
            state.rating = action.payload.ratingResponse.rating
         })
         .addCase(getAnnouncementRating.fulfilled, (state, action) => {
            state.rating = action.payload.rating
         })
   },
})
