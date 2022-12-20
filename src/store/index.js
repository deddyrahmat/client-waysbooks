import {configureStore} from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from "redux-persist";
import { combineReducers } from "redux";

import authReducer from './authSlice';
import cartReducer from './cartSlice';

const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  
  const reducer = combineReducers({
    authReducer,
    cartReducer
  });
  
  const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer : persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})