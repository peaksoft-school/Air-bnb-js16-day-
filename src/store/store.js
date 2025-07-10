import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth/authSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storageSession from 'redux-persist/lib/storage/session'
import { allHousingSlice } from './slices/admin/all-housing/allHousingSlice'
import createHouseReducer from '../store/slices/user/createHouseSlice'
import { regionSlice } from './slices/user/region/regionSlice'
import { profileSlice } from './slices/user/profile/profileSlice'
import { userInfoReducer } from './slices/admin/user/userInfoSlice'
import { addHouseSlice } from './slices/user/addHouse/addHouseSlice'
import { paymentSlice } from './slices/user/payment/paymentSlice'
import { LandingSlice } from './slices/user/Landing/LandingSlice'
import announcementDetailReducer from './slices/user/profile/announcementDetail/announcementDetailSlice'
import houseApplicationsReducer from './slices/admin/houseApplicationsSlice'
import { usersSlice } from './slices/admin/users/usersSlice'
import { favoriteSlice } from './slices/user/favorite/favoriteSlise'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [allHousingSlice.name]: allHousingSlice.reducer,
   createHouse: createHouseReducer,
   [profileSlice.name]: profileSlice.reducer,
   [regionSlice.name]: regionSlice.reducer,
   userInfo: userInfoReducer,
   addHouseSlice: addHouseSlice.reducer,
   [paymentSlice.name]: paymentSlice.reducer,
   [LandingSlice.name]: LandingSlice.reducer,
   announcementDetail: announcementDetailReducer,
   houseApplications: houseApplicationsReducer,
   [usersSlice.name]: usersSlice.reducer,
   [favoriteSlice.name]: favoriteSlice.reducer,
})

const persistConfig = {
   key: 'AIR-BNB',
   storage: storageSession,
   whitelist: ['auth'],
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
