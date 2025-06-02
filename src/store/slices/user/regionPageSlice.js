import { createSlice } from '@reduxjs/toolkit'
import { getHouses } from './regionPageThunk'

const initialState = {
   allHouses: [],
   isLoading: false,
   error: null,
   search: '',
}

const regionPageSlice = createSlice({
   name: 'regionPage',
   initialState,
   reducers: {
      setSearch(state, action) {
         state.search = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getHouses.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(getHouses.fulfilled, (state, action) => {
            state.isLoading = false
            state.allHouses = action.payload.allHouses
            state.error = null
         })
         .addCase(getHouses.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            state.allHouses = []
         })
   },
})

export const { setSearch } = regionPageSlice.actions
export default regionPageSlice.reducer
