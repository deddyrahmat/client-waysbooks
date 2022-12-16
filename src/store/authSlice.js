import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name : "authReducer",
    initialState : {
        role : '',
        loading : true,
        login : false,
        register : false,
        statusAuth : false
    },
    reducers : {
        authStore : (state, action) => {
            state.login = action.payload.login;
            state.register = action.payload.register;
        },
        authAccess : (state, action) => {
            state.role = action.payload.role;
            state.loading = action.payload.loading;
            state.statusAuth = action.payload.statusAuth;
        }
    }
})

export const {authStore, authAccess} = authSlice.actions;
export default authSlice.reducer;