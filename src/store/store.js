import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth/authSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import { allHousingSlice } from './slices/admin/all-housing/allHousingSlice'
import { regionSlice } from './slices/user/region/regionSlice'
import { profileSlice } from './slices/user/profile/profileSlice'
import { userInfoReducer } from './slices/admin/user/userInfoSlice'
import { addHouseSlice } from './slices/user/addHouse/addHouseSlice'
import { paymentSlice } from './slices/user/payment/paymentSlice'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [allHousingSlice.name]: allHousingSlice.reducer,
   [profileSlice.name]: profileSlice.reducer,
   [regionSlice.name]: regionSlice.reducer,
   userInfo: userInfoReducer,
   addHouseSlice: addHouseSlice.reducer,
   [paymentSlice.name]: paymentSlice.reducer,
})

const persistConfig = {
   key: 'AIR-BNB',
   storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   reducer: persistedReducer,

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
})

const persistor = persistStore(store)

export { store, persistor }
