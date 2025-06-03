import { createSlice } from '@reduxjs/toolkit'
import { AUTH_THUNK } from './authThunk'

const initialState = {
   role: 'GUEST',
   email: null,
   token: null,
   isAuth: false,
   isLoading: false,
   error: null,
   forgotPasswordStatus: 'idle',
   resetPasswordStatus: 'idle',
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logOut: (state, { payload }) => {
         state.token = null
         state.isAuth = false
         state.role = 'GUEST'
         state.email = null

         payload.navigate('/')
      },

      resetError: (state) => {
         state.error = null
      },

      resetPasswordStatus: (state) => {
         state.resetPasswordStatus = 'idle'
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(AUTH_THUNK.signIn.pending, (state) => {
            state.isLoading = true
         })

         .addCase(AUTH_THUNK.signIn.fulfilled, (state, action) => {
            Object.assign(state, {
               ...action.payload,
               isAuth: true,
               isLoading: false,
            })
         })

         .addCase(AUTH_THUNK.signIn.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(AUTH_THUNK.authWithGoogle.pending, (state) => {
            state.isLoading = true
         })

         .addCase(AUTH_THUNK.authWithGoogle.fulfilled, (state, action) => {
            Object.assign(state, {
               ...action.payload,
               isAuth: true,
               isLoading: false,
            })
         })

         .addCase(AUTH_THUNK.authWithGoogle.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(AUTH_THUNK.forgotPassword.pending, (state) => {
            state.forgotPasswordStatus = 'loading'
            state.error = null
         })

         .addCase(AUTH_THUNK.forgotPassword.fulfilled, (state) => {
            state.forgotPasswordStatus = 'succeeded'
         })

         .addCase(AUTH_THUNK.forgotPassword.rejected, (state, { payload }) => {
            state.forgotPasswordStatus = 'failed'
            state.error = payload?.message
         })

         .addCase(AUTH_THUNK.resetPassword.pending, (state) => {
            state.resetPasswordStatus = 'loading'
            state.error = null
         })

         .addCase(AUTH_THUNK.resetPassword.fulfilled, (state) => {
            state.resetPasswordStatus = 'succeeded'
         })

         .addCase(AUTH_THUNK.resetPassword.rejected, (state, { payload }) => {
            state.resetPasswordStatus = 'failed'
            state.error = payload?.message
         })
   },
})

export const AUTH_ACTIONS = authSlice.actions
export const authReducer = authSlice.reducer
