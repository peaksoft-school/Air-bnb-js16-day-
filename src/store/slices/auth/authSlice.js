import { createSlice } from '@reduxjs/toolkit'
import { AUTH_THUNK } from './authThunk'

const initialState = {
   role: 'GUEST',
   email: null,
   token: null,
   isAuth: false,
   isLoading: false,
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logOut: (state) => {
         state.token = null
         state.isAuth = false
         state.role = 'GUEST'
         state.email = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(AUTH_THUNK.singUp.fulfilled, (state, actions) => {
            state.role = actions.payload?.role
            state.email = actions.payload?.email
            state.isAuth = true
            state.isLoading = false
            state.token = actions.payload?.token
         })
         .addCase(AUTH_THUNK.singUp.pending, (state) => {
            state.isLoading = true
         })
         .addCase(AUTH_THUNK.singUp.rejected, (state) => {
            state.isLoading = false
         })
   },
})

const AUTH_ACTIONS = authSlice.actions

export { authSlice, AUTH_ACTIONS }
