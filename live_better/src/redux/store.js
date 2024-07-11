import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice.js'
import { persistReducer } from 'redux-persist' ;
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import listingReducer from './reducers/listingsSlice.js'



let rootReducers = combineReducers({
  user:userReducer,
  listings: listingReducer
})

let persistConfig = {
  key: 'root',
  storage,
  version: 1
}

let persistedReducer = persistReducer( persistConfig, rootReducers ) ;


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
  
})

export const persistor = persistStore(store);