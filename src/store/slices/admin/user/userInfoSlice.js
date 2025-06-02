import { createSlice } from '@reduxjs/toolkit'
import {
   getHouseById,
   getAnnouncementFeedback,
   getAnnouncementRating,
} from './userThunk'

const initialState = {
   announcement: null,
   feedbacks: [],
   rating: 0,
   user: null,
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
            state.rating = action.payload.ratingResponse.rating
         })
         .addCase(getAnnouncementRating.fulfilled, (state, action) => {
            state.rating = action.payload.rating
         })
   },
})

export const userInfoReducer = userInfoSlice.reducer
