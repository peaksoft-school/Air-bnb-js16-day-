import { createSlice } from '@reduxjs/toolkit'
import { REGION_THUNK } from './regionThunk'

const initialState = {
   allHouses: [],
   isLoading: false,
   error: null,
   search: '',
   selectedRegion: '',
}

const regionSlice = createSlice({
   name: 'region',
   initialState,
   reducers: {
      setSearch(state, action) {
         state.search = action.payload
      },
      setSelectedRegion(state, action) {
         console.log('setSelectedRegion reducer - payload:', action.payload)
         state.selectedRegion = action.payload
         console.log(
            'setSelectedRegion reducer - new state:',
            state.selectedRegion
         )
      },
   },

   extraReducers: (builder) => {
      builder

         .addCase(REGION_THUNK.getHouses.pending, (state) => {
            state.isLoading = true
            state.error = null
         })

         .addCase(REGION_THUNK.getHouses.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.allHouses = payload.allHouses
            state.error = null
         })

         .addCase(REGION_THUNK.getHouses.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
            state.allHouses = []
         })
   },
})

const REGION_ACTIONS = regionSlice.actions

export { regionSlice, REGION_ACTIONS }
