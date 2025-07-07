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
         const imageUrl =
            payload?.Link || payload?.imageUrl || payload?.url || payload

         if (typeof imageUrl === 'string') {
            state.images.push(imageUrl)
         } else {
            console.warn(
               'Не удалось добавить изображение: неверный формат payload',
               payload
            )
         }
      })
   },
})

export const { clearImage, deleteImage } = addHouseSlice.actions
export const addHouseReducer = addHouseSlice.reducer
