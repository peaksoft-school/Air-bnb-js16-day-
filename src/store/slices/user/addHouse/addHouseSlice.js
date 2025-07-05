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
      builder
         .addCase(postImageFile.fulfilled, (state, { payload }) => {
            console.log('📸 Image upload payload:', payload)
            console.log('📸 Payload type:', typeof payload)
            console.log('📸 Payload is array:', Array.isArray(payload))
            console.log('📸 Full payload keys:', Object.keys(payload))

            let imageUrl = null

            if (typeof payload === 'string') {
               imageUrl = payload
               console.log('📸 Payload is string URL:', imageUrl)
            } else if (Array.isArray(payload)) {
               imageUrl = payload[0] || payload.url || payload.link
               console.log('📸 Payload is array, first item:', imageUrl)
            } else if (typeof payload === 'object' && payload !== null) {
               imageUrl =
                  payload.Link ||
                  payload.link ||
                  payload.url ||
                  payload.imageUrl ||
                  payload.image ||
                  payload.file ||
                  payload.data ||
                  payload.result
               console.log('📸 Payload is object, extracted URL:', imageUrl)
            }

            console.log('📸 Final image URL:', imageUrl)

            if (imageUrl && imageUrl !== null && imageUrl !== 'null') {
               state.images.push(imageUrl)
               console.log('📸 Added to state.images:', state.images)
            } else {
               console.error('❌ No valid image URL found in payload')
               console.error('❌ Payload was:', payload)
            }
         })
         .addCase(postImageFile.rejected, (state, { payload }) => {
            console.error('❌ Image upload failed:', payload)
         })
   },
})

export const { clearImage, deleteImage } = addHouseSlice.actions
