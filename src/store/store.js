import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth/authSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import regionPageReducer from './slices/user/regionPageSlice' 
import { allHousingSlice } from './slices/admin/all-housing/allHousingSlice'

const rootReducer = combineReducers({
   regionPage: regionPageReducer, 

   [authSlice.name]: authSlice.reducer,
   [allHousingSlice.name]: allHousingSlice.reducer,
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
