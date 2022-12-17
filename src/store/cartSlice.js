import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name : "cartReducer",
    initialState : {
        cart : [],
        totalCart : 0
    },
    reducers : {
        cartStore : (state, action) => {
            // state.cart = [...state.cart, action.payload.cart]
            const filterExistedProduct = state.cart.filter(
                (product) => product.id === action.payload.cart.id
              );
              if (filterExistedProduct.length > 0) {
                const newCart = state.cart.map((product) => {
                  if (product.id === action.payload.cart.id) {
                    return { ...product };
                  } else {
                    return product;
                  }
                });
                return {
                  ...state,
                  cart: newCart,
                };
              }
              const newCart = [...state.cart, { ...action.payload.cart }];
              return {
                ...state,
                cart: newCart,
              };
        },
        cartRemove : (state, action) => {
            state.cart = state.cart.filter(function(item) {
                return item.id !== action.payload.id;
            });
        }
    }
})

export const {cartStore, cartRemove} = cartSlice.actions;
export default cartSlice.reducer;