import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name : "authModal",
    initialState : {
        popup : false,
        login : false,
        register : false,
        statusAuth : true,
        totalCart : 0
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