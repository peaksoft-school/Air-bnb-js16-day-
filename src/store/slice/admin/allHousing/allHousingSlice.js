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
            console.log(6)
            state.loading = true
            state.error = null
         })

         .addCase(getFilteredHousingRequest.fulfilled, (state, action) => {
            console.log(7)
            state.loading = false
            state.data = action.payload
         })

         .addCase(getFilteredHousingRequest.rejected, (state, action) => {
            console.log(8)
            state.loading = false
            state.error = action.payload || 'Something went wrong'
         })
   },
})

export default allHousingSlice
