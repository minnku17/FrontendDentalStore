import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        allProduct: {
            data: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getAllProductStart: (state) => {
            state.allProduct.isFetching = true;
        },
        getAllProductSuccess: (state, action) => {
            state.allProduct.isFetching = false;
            state.allProduct.data = action.payload;
            state.allProduct.error = false;
        },
        getAllProductFail: (state) => {
            state.allProduct.isFetching = false;
            state.allProduct.error = true;
        },
    },
});

export const { getAllProductStart, getAllProductSuccess, getAllProductFail } = productSlice.actions;

export default productSlice.reducer;
