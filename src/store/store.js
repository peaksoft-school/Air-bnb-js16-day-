import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/admin/userSlice'

import { authSlice } from './slices/auth/authSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import { allHousingSlice } from './slices/admin/all-housing/allHousingSlice'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [allHousingSlice.name]: allHousingSlice.reducer,
   user: userReducer,
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
