import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer : {
        authReducer,
        cartReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})