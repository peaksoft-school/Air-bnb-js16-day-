import { createSlice } from '@reduxjs/toolkit'
import { fetchAnnouncementById } from './announcementThunk'

const initialState = {
   data: null,
   isLoading: false,
   error: null,
}

const announcementSlice = createSlice({
   name: 'announcement',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAnnouncementById.pending, (state) => {
            state.isLoading = true
         })
         .addCase(fetchAnnouncementById.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
         })
         .addCase(fetchAnnouncementById.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
         })
   },
})

export default announcementSlice.reducer
