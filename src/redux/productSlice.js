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
        delete: {
            isFetching: false,
            error: false,
        },
        product_info: {
            data: null,
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
        deleteProductStart: (state) => {
            state.delete.isFetching = true;
        },
        deleteProductSuccess: (state, action) => {
            state.delete.isFetching = false;
            state.delete.error = false;
        },
        deleteProductFail: (state) => {
            state.delete.isFetching = false;
            state.delete.error = true;
        },
        getProductInfoStart: (state) => {
            state.product_info.isFetching = true;
        },
        getProductInfoSuccess: (state) => {
            state.product_info.isFetching = false;
            state.product_info.error = false;
        },
        getProductInfoFail: (state) => {
            state.product_info.isFetching = false;
            state.product_info.error = true;
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
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFail,
    getProductInfoStart,
    getProductInfoSuccess,
    getProductInfoFail,
} = productSlice.actions;

export default productSlice.reducer;
