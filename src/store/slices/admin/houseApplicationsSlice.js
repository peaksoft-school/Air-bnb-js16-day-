import { createSlice } from '@reduxjs/toolkit'
import { fetchApplications } from './houseApplicationsThunk'

const initialState = {
   applications: [],
   loading: false,
   error: null,
   currentPage: 1,
   totalPages: 1,
}

const houseApplicationsSlice = createSlice({
   name: 'houseApplications',
   initialState,
   reducers: {
      resetApplications: (state) => {
         state.applications = []
         state.currentPage = 1
         state.totalPages = 1
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchApplications.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchApplications.fulfilled, (state, action) => {
            state.loading = false
            state.applications = action.payload.data
            state.totalPages = action.payload.totalPages
            state.currentPage = action.payload.currentPage
         })
         .addCase(fetchApplications.rejected, (state, action) => {
            state.loading = false
            state.error = { message: action.payload }
         })
   },
})

export const { resetApplications } = houseApplicationsSlice.actions
export default houseApplicationsSlice.reducer
