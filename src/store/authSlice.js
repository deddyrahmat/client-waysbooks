import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name : "authReducer",
    initialState : {
        role : '',
        biodata : [],
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
        },
        authBiodata : (state, action) => {
            state.biodata = action.payload.biodata
        },
        authLogout : (state, action) => {
            state.statusAuth = false;
            state.login = false;
            state.role = '';
            state.biodata = [];
        }
    }
})

export const {authStore, authAccess, authBiodata, authLogout} = authSlice.actions;
export default authSlice.reducer;