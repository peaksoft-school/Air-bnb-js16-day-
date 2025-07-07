import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userInfoReducer } from './slices/admin/user/userInfoSlice'
import { addHouseSlice } from './slices/user/addHouse/addHouseSlice'
import { houseSlice } from './slices/user/house/houseSlice'

import persistStore from 'redux-persist/es/persistStore'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { allHousingSlice } from './slices/admin/all-housing/allHousingSlice'
import createHouseReducer from '../store/slices/user/createHouseSlice'
import { LandingSlice } from './slices/user/Landing/landingSlice'
import { regionSlice } from './slices/user/region/regionSlice'
import { profileSlice } from './slices/user/profile/profileSlice'
import announcementDetailReducer from './slices/user/profile/announcementDetail/announcementDetailSlice'
import houseApplicationsReducer from './slices/admin/houseApplicationsSlice'
import { usersSlice } from './slices/admin/users/usersSlice'
import { authSlice } from './slices/auth/authSlice'
import { favoriteSlice } from './slices/user/favorite/favoriteSlise'

const rootReducer = combineReducers({
   userInfo: userInfoReducer,
   addHouseSlice: addHouseSlice.reducer,
   houseSlice: houseSlice.reducer,
   applicationSlice: houseApplicationsReducer,
   [authSlice.name]: authSlice.reducer,
   [allHousingSlice.name]: allHousingSlice.reducer,
   createHouse: createHouseReducer,
   landing: LandingSlice.reducer,
   [profileSlice.name]: profileSlice.reducer,
   [regionSlice.name]: regionSlice.reducer,
   announcementDetail: announcementDetailReducer,
   houseApplications: houseApplicationsReducer,
   [usersSlice.name]: usersSlice.reducer,
   [favoriteSlice.name]: favoriteSlice.reducer,
})

const persistConfig = {
   key: 'AIR-BNB',
   storage,
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
