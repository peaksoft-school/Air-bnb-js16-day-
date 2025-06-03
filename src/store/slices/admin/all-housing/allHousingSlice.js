import { createSlice } from '@reduxjs/toolkit'
import { ALL_HOUSING_THUNK } from './allHousingThunk'

const initialState = {
   housing: [],
   loading: false,
   error: null,
}

const allHousingSlice = createSlice({
   name: 'housing',
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(
            ALL_HOUSING_THUNK.getFilteredHousingRequest.pending,
            (state) => {
               state.loading = true
               state.error = null
            }
         )

         .addCase(
            ALL_HOUSING_THUNK.getFilteredHousingRequest.fulfilled,
            (state, { payload }) => {
               state.loading = false
               state.housing = payload
            }
         )

         .addCase(
            ALL_HOUSING_THUNK.getFilteredHousingRequest.rejected,
            (state, { payload }) => {
               state.loading = false
               state.error = payload || 'Something went wrong'
            }
         )
   },
})

const ALL_HOUSING_ACTIONS = allHousingSlice.actions

export { allHousingSlice, ALL_HOUSING_ACTIONS }
