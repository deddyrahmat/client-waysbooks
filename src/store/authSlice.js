import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name : "authModal",
    initialState : {
        login : false,
        register : false,
        statusAuth : true
    },
    reducers : {
        authStore : (state, action) => {
            state.login = action.payload.login;
            state.register = action.payload.register;
        }
    }
})

export const {authStore} = authSlice.actions;
export default authSlice.reducer;