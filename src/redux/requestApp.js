import { addProductStart, addProductSuccess, addProductFail } from './cartSlice';

export const addProductToCart = async (dispatch, data) => {
    dispatch(addProductStart());
    try {
        dispatch(addProductSuccess(data));
        return {
            errCode: 0,
            errMessage: 'Thêm vào giỏ hàng thành công',
        };
    } catch (e) {
        console.log(e);
        dispatch(addProductFail());
    }
};
