import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth/authSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import { allHousingSlice } from './slices/admin/all-housing/allHousingSlice'
import userSlice from './slices/admin/users/userSlice'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [allHousingSlice.name]: allHousingSlice.reducer,
   [userSlice.name]: userSlice.reducer,
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
