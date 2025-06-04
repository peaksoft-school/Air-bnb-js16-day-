import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authSlice'
import { userInfoReducer } from './slices/admin/user/userInfoSlice'
import { addHouseSlice } from './slices/user/addHouse/addHouseSlice'
import { houseSlice } from './slices/user/house/houseSlice'
import houseApplicationsReducer from './slices/admin/user/houseApplicationsSlice'

import persistStore from 'redux-persist/es/persistStore'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { allHousingSlice } from './slices/admin/all-housing/allHousingSlice'

const rootReducer = combineReducers({
   userInfo: userInfoReducer,
   addHouseSlice: addHouseSlice.reducer,
   houseSlice: houseSlice.reducer,
   applicationSlice: houseApplicationsReducer,
   auth: authReducer,
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
