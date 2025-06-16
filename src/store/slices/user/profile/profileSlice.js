import { createSlice } from '@reduxjs/toolkit'
import { PROFILE_THUNK } from './profileThunk'

const initialState = {
   users: [],
   userProfile: {},
   loading: false,
   error: null,
}

const profileSlice = createSlice({
   name: 'profile',
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(PROFILE_THUNK.getUserProfile.pending, (state) => {
            state.loading = true
            state.error = null
         })

         .addCase(
            PROFILE_THUNK.getUserProfile.fulfilled,
            (state, { payload }) => {
               state.loading = false
               state.userProfile = payload.data
            }
         )

         .addCase(
            PROFILE_THUNK.getUserProfile.rejected,
            (state, { payload }) => {
               state.loading = false
               state.error = payload
            }
         )
   },
})

export { profileSlice }
