import { createSlice } from '@reduxjs/toolkit'
import { getFilteredHousingRequest } from './allHousingThunk'

const initialState = {
   data: [],
   loading: false,
   error: null,
}

const allHousingSlice = createSlice({
   name: 'housing',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getFilteredHousingRequest.pending, (state) => {
            state.loading = true
            state.error = null
         })

         .addCase(getFilteredHousingRequest.fulfilled, (state, { payload }) => {
            state.loading = false
            state.data = payload
         })

         .addCase(getFilteredHousingRequest.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload || 'Something went wrong'
         })
   },
})

export default allHousingSlice.reducer
