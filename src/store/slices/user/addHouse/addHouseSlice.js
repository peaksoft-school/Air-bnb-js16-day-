import { createSlice } from '@reduxjs/toolkit'
import { postImageFile } from './addHouseThunk'

const initialState = {
   images: [],
}

export const addHouseSlice = createSlice({
   name: 'addHouse',
   initialState,
   reducers: {
      clearImage: (state) => {
         state.images = []
      },
      deleteImage: (state, { payload }) => {
         state.images.splice(payload, 1)
      },
   },
   extraReducers: (builder) => {
      builder.addCase(postImageFile.fulfilled, (state, { payload }) => {
         state.images.push(payload.Link)
      })
   },
})

export const { clearImage, deleteImage } = addHouseSlice.actions
