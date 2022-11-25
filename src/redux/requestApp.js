import { addProductStart, addProductSuccess, addProductFail } from './cartSlice';

export const addProductToCart = async (dispatch, arr) => {
    dispatch(addProductStart());
    try {
        dispatch(addProductSuccess(arr));
        return {
            errCode: 0,
            errMessage: 'Thêm vào giỏ hàng thành công',
        };
    } catch (e) {
        console.log(e);
        dispatch(addProductFail());
    }
};
