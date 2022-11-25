import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {
            arrCart: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        addProductStart: (state) => {
            state.cart.isFetching = true;
        },
        addProductSuccess: (state, action) => {
            console.log(action.payload);
            state.cart.isFetching = false;
            state.cart.arrCart = action.payload;
            state.cart.error = false;
        },
        addProductFail: (state) => {
            state.cart.isFetching = false;
            state.cart.error = true;
        },
    },
});

export const { addProductStart, addProductSuccess, addProductFail } = cartSlice.actions;

export default cartSlice.reducer;
