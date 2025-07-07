import { createSlice } from '@reduxjs/toolkit'
import { createHouseBase } from './createHouseThunk'

const createHouseSlice = createSlice({
   name: 'createHouse',
   initialState: {
      loading: false,
      success: false,
      error: null,
      uploadProgress: 0,
   },
   reducers: {
      resetState: (state) => {
         state.loading = false
         state.success = false
         state.error = null
         state.uploadProgress = 0
      },
      setUploadProgress: (state, action) => {
         state.uploadProgress = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createHouseBase.pending, (state) => {
            state.loading = true
            state.error = null
            state.uploadProgress = 0
         })
         .addCase(createHouseBase.fulfilled, (state) => {
            state.loading = false
            state.success = true
            state.error = null
            state.uploadProgress = 100
         })
         .addCase(createHouseBase.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload || 'Ошибка при создании дома'
            state.uploadProgress = 0
         })
   },
})

export const { resetState, setUploadProgress } = createHouseSlice.actions
export default createHouseSlice.reducer
