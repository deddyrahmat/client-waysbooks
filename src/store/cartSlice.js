import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name : "cartReducer",
    initialState : {
        cart : [],
        totalCart : 0
    },
    reducers : {
        cartStore : (state, action) => {
            state.cart = [...state.cart, action.payload.cart]
        }
    }
})

export const {cartStore} = cartSlice.actions;
export default cartSlice.reducer;