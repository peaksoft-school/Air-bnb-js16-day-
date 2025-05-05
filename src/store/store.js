import { configureStore } from '@reduxjs/toolkit'
import allHousingReducer from './slice/admin/allHousing/allHousingSlice'
import { injectStore } from './slice/axiosInstance'

const store = configureStore({
   reducer: {
      housing: allHousingReducer,
   },
})

injectStore(store)

export default store
