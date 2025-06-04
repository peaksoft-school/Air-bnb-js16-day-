import { createSlice } from '@reduxjs/toolkit'
import { fetchUserProfile } from './userProfileThunk'

const initialState = {
   users: [],
   userProfile: null,
   loading: false,
   error: null,
}

const userSlice = createSlice({
   name: 'userProfile',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
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
   },
})

export default userSlice.reducer
