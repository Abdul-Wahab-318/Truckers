import { configureStore } from '@reduxjs/toolkit'
import user from '../slices/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'user',
  storage,
}

const persistedReducer = persistReducer(persistConfig, user)

export const store = configureStore({
  reducer: {
    persistedReducer
  },
})
export const persistor = persistStore(store)