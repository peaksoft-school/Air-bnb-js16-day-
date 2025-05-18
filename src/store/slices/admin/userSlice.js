import { createSlice } from '@reduxjs/toolkit'
import { fetchAllUsers, fetchUserProfile, deleteUser } from './userThunk'

const initialState = {
   users: [],
   userProfile: null,
   loading: false,
   error: null,
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllUsers.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
         })
         .addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(fetchUserProfile.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false
            state.userProfile = action.payload.data
         })
         .addCase(fetchUserProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deleteUser.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = state.users.filter((u) => u.id !== action.payload)
         })
         .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default userSlice.reducer
