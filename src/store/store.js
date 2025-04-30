import { configureStore } from '@reduxjs/toolkit'
import allHousingSlice from './slice/admin/allHousing/allHousingSlice'

const store = configureStore({
   reducer: {
      [allHousingSlice.name]: allHousingSlice.reducer,
   },
})

export default store
