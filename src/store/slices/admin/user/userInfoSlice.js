import { createSlice } from '@reduxjs/toolkit'
import {
   getHouseById,
   getAnnouncementFeedback,
   getAnnouncementRating,
   saveFeedback,
} from './userThunk'

const initialState = {
   announcement: null,
   feedbacks: [],
   rating: 0,
   user: null,
   feedbackStatus: null,
}

const userInfoSlice = createSlice({
   name: 'userInfo',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getHouseById.fulfilled, (state, action) => {
            state.announcement = action.payload
         })
         .addCase(getAnnouncementFeedback.fulfilled, (state, action) => {
            state.feedbacks = action.payload.feedbackResponses
            state.rating = action.payload.ratingResponse 
         })

         .addCase(getAnnouncementRating.fulfilled, (state, action) => {
            state.rating = action.payload.rating
         })

         .addCase(saveFeedback.pending, (state) => {
            state.feedbackStatus = 'loading'
         })
         .addCase(saveFeedback.fulfilled, (state, action) => {
            state.feedbackStatus = 'succeeded'
            if (action.payload) {
               state.feedbacks.unshift(action.payload)
            }
         })
         .addCase(saveFeedback.rejected, (state) => {
            state.feedbackStatus = 'failed'
         })
   },
})

export const userInfoReducer = userInfoSlice.reducer
