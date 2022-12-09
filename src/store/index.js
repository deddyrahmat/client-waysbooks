import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
    reducer : {
        authModal : authReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})