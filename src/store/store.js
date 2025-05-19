import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import announcementReducer from './slice/admin/user/announcementSlice'

export const store = configureStore({
   reducer: {
      auth: authReducer,
      announcement: announcementReducer,
   },
})
