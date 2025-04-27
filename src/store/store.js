import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth/authSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage' // <-- Добавлено

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
})

const persistConfig = {
   key: 'AIR-BNB',
   storage, // <-- Указали хранилище
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
