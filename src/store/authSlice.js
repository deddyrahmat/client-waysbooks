import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { setAuthToken } from 'config/Axios';
import ApiAuth  from 'config/Endpoint/auth';


export const fetchLogin = createAsyncThunk('auth/login', async ({email, password}) => {
    try {
    const body = JSON.stringify({
        email,
        password
    });
    const config = {
        headers: {
            "content-type": "application/json",
        },
    };
    // eksekusi api login dengan mengirim body dan config
    const response = await ApiAuth.login(body, config);
    // console.log('response', response)

    if (response.status === 1) {
        setAuthToken(response.token);
        return response
    }else{
        return [];
    }
    
    } catch (error) {
        console.log("Your System ", error);
    }
})

const authSlice = createSlice({
    name : "authReducer",
    initialState : {
        role : '',
        token : '',
        refresh : '',
        biodata : [],
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
            state.statusAuth = action.payload.statusAuth;
        },
        authLogout : (state, action) => {
            state.statusAuth = false;
            state.login = false;
            state.role = '';
            state.biodata = [];
            state.token = '';
            state.refresh = '';
        }
    },
    extraReducers: {
        [fetchLogin.fulfilled]: (state, action) => {
          state.biodata = action.payload.data;
          state.statusAuth = true;
          state.role = action.payload.data.role;
          state.token =action.payload.token;
          state.refresh =action.payload.refresh_token;
          state.login =false;
          state.register =false;
        },
    }
})

export const {authStore, authAccess, authLogout} = authSlice.actions;
export default authSlice.reducer;