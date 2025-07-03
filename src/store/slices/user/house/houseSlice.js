import { createSlice } from '@reduxjs/toolkit'
import {
   getAnnouncement,
   getAnnouncementById,
   getBookings,
   getModeration,
   globalSearchAsync,
} from './houseThunk'

const initialState = {
   isLoading: false,
   error: null,
   bookings: [],
   announcement: [],
   moderation: [],
   announcementById: null,
   houses: [],
}

const addAsyncCases = (builder, asyncThunk, dataField) => {
   builder
      .addCase(asyncThunk.pending, (state) => {
         state.isLoading = true
         state.error = null
      })
      .addCase(asyncThunk.fulfilled, (state, action) => {
         state[dataField] = action.payload
         state.isLoading = false
      })
      .addCase(asyncThunk.rejected, (state, action) => {
         state.isLoading = false
         state.error = action.payload
      })
}

export const houseSlice = createSlice({
   name: 'houses',
   initialState,
   reducers: {
      clearHouse: (state) => {
         state.houses = []
      },
   },
   extraReducers: (builder) => {
      addAsyncCases(builder, getBookings, 'bookings')
      addAsyncCases(builder, getAnnouncement, 'announcement')
      addAsyncCases(builder, getModeration, 'moderation')
      addAsyncCases(builder, getAnnouncementById, 'announcementById')
      addAsyncCases(builder, globalSearchAsync, 'houses')
   },
})

export const { clearHouse } = houseSlice.actions
