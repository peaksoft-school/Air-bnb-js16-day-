import { createSlice } from '@reduxjs/toolkit'
import { createPayment } from './paymentThunk'

const initialState = {
   paymentDetails: null,
   loading: false,
   error: null,
}
export const paymentSlice = createSlice({
   name: 'payment',
   initialState,
   reducers: {
      setPaymentDetails: (state, action) => {
         state.paymentDetails = action.payload
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(createPayment.pending, (state) => {
            state.loading = true
         })

         .addCase(createPayment.fulfilled, (state, action) => {
            state.loading = false
            state.paymentDetails = action.payload
         })

         .addCase(createPayment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})
export default paymentSlice.reducer
