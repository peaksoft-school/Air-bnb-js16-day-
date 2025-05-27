import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authSlice'
import houseApplicationsReducer from './slices/admin/houseApplicationsSlice'

import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  auth: authReducer,
  houseApplications: houseApplicationsReducer,
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
