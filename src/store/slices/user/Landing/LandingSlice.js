import { createSlice } from '@reduxjs/toolkit'
import { getLandingPageReguest } from './LandingThunk'

const initialState = {
   landing: [],
   loading: false,
   error: null,
}

const LandingSlice = createSlice({
   name: 'landing',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getLandingPageReguest.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getLandingPageReguest.fulfilled, (state, { payload }) => {
            state.loading = false
            state.landing = payload
         })
         .addCase(getLandingPageReguest.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload || 'Something went wrong'
         })
   },
})

const LANDING_INTEGRATION = LandingSlice.actions

export { LandingSlice, LANDING_INTEGRATION }
