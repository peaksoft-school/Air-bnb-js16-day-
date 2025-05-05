import { createSlice } from '@reduxjs/toolkit'
import {
   getHouseById,
   getAnnouncementFeedback,
   getAnnouncementRating,
} from './announcementThunk'

const announcementSlice = createSlice({
   name: 'userInfo',
   initialState: {
      user: null,
      announcement: {},
      feedbacks: [],
      rating: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getHouseById.fulfilled, (state, action) => {
            state.announcement = action.payload
         })
         .addCase(getAnnouncementFeedback.fulfilled, (state, action) => {
            state.feedbacks = action.payload
         })
         .addCase(getAnnouncementRating.fulfilled, (state, action) => {
            state.rating = action.payload
         })
   },
})

export default announcementSlice.reducer
