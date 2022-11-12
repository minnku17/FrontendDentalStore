import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        allProduct: {
            data: null,
            isFetching: false,
            error: false,
        },
        create: {
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
        createProductStart: (state) => {
            state.allProduct.isFetching = true;
        },
        createProductSuccess: (state, action) => {
            state.allProduct.isFetching = false;
            state.allProduct.data = action.payload;
            state.allProduct.error = false;
        },
        createProductFail: (state) => {
            state.allProduct.isFetching = false;
            state.allProduct.error = true;
        },
    },
});

export const {
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFail,
    createProductStart,
    createProductSuccess,
    createProductFail,
} = productSlice.actions;

export default productSlice.reducer;
