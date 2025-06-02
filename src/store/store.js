import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import regionPageReducer from './slices/user/regionPageSlice' // Changed this line

const rootReducer = combineReducers({
   auth: authReducer,
   regionPage: regionPageReducer, // Changed this line
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
