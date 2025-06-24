import { createSlice } from '@reduxjs/toolkit'
import { USERS_THUNKS } from './usersThunk'

const initialState = {
   users: [],
   userProfile: null,
   loading: false,
   error: null,
}

const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(USERS_THUNKS.getAllUsers.pending, (state) => {
            state.loading = true
            state.error = null
         })

         .addCase(USERS_THUNKS.getAllUsers.fulfilled, (state, { payload }) => {
            state.loading = false
            state.users = payload
         })

         .addCase(USERS_THUNKS.getAllUsers.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
         })

         .addCase(USERS_THUNKS.getUserProfile.pending, (state) => {
            state.loading = true
            state.error = null
         })

         .addCase(
            USERS_THUNKS.getUserProfile.fulfilled,
            (state, { payload }) => {
               state.loading = false
               state.userProfile = payload.data
            }
         )

         .addCase(
            USERS_THUNKS.getUserProfile.rejected,
            (state, { payload }) => {
               state.loading = false
               state.error = payload
            }
         )

         .addCase(USERS_THUNKS.deleteUser.pending, (state) => {
            state.loading = true
            state.error = null
         })

         .addCase(USERS_THUNKS.deleteUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.users = state.users.filter((u) => u.id !== payload)
         })

         .addCase(USERS_THUNKS.deleteUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
         })

         .addCase(USERS_THUNKS.deleteHouse.pending, (state) => {
            state.loading = true
            state.error = null
         })

         .addCase(USERS_THUNKS.deleteHouse.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userProfile.houses = state.userProfile.houses.filter(
               (house) => house.id !== payload
            )
         })

         .addCase(USERS_THUNKS.deleteHouse.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
         })

         .addCase(USERS_THUNKS.blockAllAnnoucement.pending, (state) => {
            state.loading = true
            state.error = null
         })

         .addCase(USERS_THUNKS.blockAllAnnoucement.fulfilled, (state) => {
            state.loading = false
         })

         .addCase(
            USERS_THUNKS.blockAllAnnoucement.rejected,
            (state, { payload }) => {
               state.loading = false
               state.error = payload
            }
         )
   },
})

export { usersSlice }
