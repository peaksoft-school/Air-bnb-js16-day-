import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authSlice'
import userReducer from './slices/admin/userSlice'

import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
   auth: authReducer,
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
