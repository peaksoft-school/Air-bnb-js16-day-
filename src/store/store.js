import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userInfoReducer } from './slices/admin/user/userInfoSlice'
import { addHouseSlice } from './slices/user/addHouse/addHouseSlice'
import { houseSlice } from './slices/user/house/houseSlice'
import houseApplicationsReducer from './slices/admin/user/houseApplicationsSlice'

import persistStore from 'redux-persist/es/persistStore'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { allHousingSlice } from './slices/admin/all-housing/allHousingSlice'
import { LandingSlice } from './slices/user/Landing/landingSlice'
import { regionSlice } from './slices/user/region/regionSlice'
import { profileSlice } from './slices/user/profile/profileSlice'
import { usersSlice } from './slices/admin/users/usersSlice'
import { authSlice } from './slices/auth/authSlice'

const rootReducer = combineReducers({
   userInfo: userInfoReducer,
   addHouseSlice: addHouseSlice.reducer,
   houseSlice: houseSlice.reducer,
   applicationSlice: houseApplicationsReducer,
   [authSlice.name]: authSlice.reducer,
   [allHousingSlice.name]: allHousingSlice.reducer,
   landing: LandingSlice.reducer,
   [profileSlice.name]: profileSlice.reducer,
   [regionSlice.name]: regionSlice.reducer,
   [usersSlice.name]: usersSlice.reducer,
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
