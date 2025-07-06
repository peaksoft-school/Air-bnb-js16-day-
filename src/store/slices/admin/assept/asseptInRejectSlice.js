import { createSlice } from '@reduxjs/toolkit'
import { acceptOrRejectHouse } from './asseptInRejectThunk'

const initialState = {
   loading: false,
   error: null,
   success: false,
}

const asseptInRejectSlice = createSlice({
   name: 'asseptInReject',
   initialState,
   reducers: {
      resetStatus: (state) => {
         state.loading = false
         state.error = null
         state.success = false
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(acceptOrRejectHouse.pending, (state) => {
            state.loading = true
            state.error = null
            state.success = false
         })
         .addCase(acceptOrRejectHouse.fulfilled, (state) => {
            state.loading = false
            state.success = true
         })
         .addCase(acceptOrRejectHouse.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { resetStatus } = asseptInRejectSlice.actions
export default asseptInRejectSlice.reducer
