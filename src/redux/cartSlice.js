import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {
            data: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        addProductStart: (state) => {
            state.cart.isFetching = true;
        },
        addProductSuccess: (state, action) => {
            state.cart.isFetching = false;
            state.cart.data = action.payload;
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
