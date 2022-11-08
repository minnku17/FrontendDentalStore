import { loginFail, loginStart, loginSuccess } from './authSlice';
import { login, getAllUsers, getUserInfo } from '~/services/index';
import config from '~/config';
import {
    getUsersFail,
    getUsersStart,
    getUsersSuccess,
    getUsersInfoStart,
    getUsersInfoSuccess,
    getUsersInfoFail,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFail,
    createUserStart,
    createUserSuccess,
    createUserFail,
    editUserStart,
    editUserSuccess,
    editUserUserFail,
} from './userSlice';

import {
    getBrandsStart,
    getBrandsSuccess,
    getBrandsFail,
    createBrandStart,
    createBrandSuccess,
    createBrandFail,
    deleteBrandStart,
    deleteBrandSuccess,
    deleteBrandFail,
    editBrandStart,
    editBrandSuccess,
    editBrandFail,
} from './brandSlice';

export const loginUser = async (email, password, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await login(email, password);
        dispatch(loginSuccess(res));

        console.log('check res login>>>', res);
        if (res.errCode === 0) {
            if (res.user.roleId !== 'Admin') {
                navigate(config.routes.profile);
            } else {
                navigate(config.routes.dashboard);
            }
        }

        return res;
    } catch (e) {
        dispatch(loginFail);
    }
};

export const logoutUser = async (id, axiosJWT, accessToken, navigate) => {
    try {
        const res = await axiosJWT.post(`/api/logout?id=${id}`, { headers: { token: `Bearer ${accessToken}` } });

        console.log(res);

        if (res.errCode === 0) {
            navigate(config.routes.loginAdmin);
        } else {
            console.log(res);
        }
    } catch (e) {
        console.log(e);
        // navigate(config.routes.loginAdmin);
    }
};

export const getAllUsersRedux = async (accessToken, dispatch, axiosJWT, navigate) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get(`/api/getAllUsers`, { headers: { token: `Bearer ${accessToken}` } });

        if (res.data.errCode === 0) {
            dispatch(getUsersSuccess(res));
        } else {
            console.log(res);
        }
    } catch (e) {
        console.log(e);
        navigate(config.routes.loginAdmin);
        dispatch(getUsersFail());
    }
};

export const getDetailUser = async (id, accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersInfoStart());
    try {
        const res = await axiosJWT(`/api/getUserInfoById?id=${id}`, { headers: { token: `Bearer ${accessToken}` } });
        if (res.data.errCode === 0) {
            dispatch(getUsersInfoSuccess(res.data));
        } else {
            console.log(res);
        }
    } catch (e) {
        console.log(e);
        dispatch(getUsersInfoFail());
    }
};

export const handleEditUser = async (data, accessToken, dispatch, axiosJWT) => {
    dispatch(editUserStart());
    try {
        const res = await axiosJWT.put('/api/editUser', data, { headers: { token: `Bearer ${accessToken}` } });

        if (res.data.errCode === 0) {
            dispatch(editUserSuccess());
            dispatch(getUsersInfoSuccess(res.data));
            return res.data;
        } else {
            console.log(res.data);
            dispatch(editUserUserFail());
        }
    } catch (e) {
        console.log(e);
        dispatch(editUserUserFail());
    }
};

export const deleteUserById = async (id, accessToken, dispatch, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete(`http://localhost:3030/api/deleteUser?id=${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        if (res.data.errCode === 0) {
            dispatch(deleteUserSuccess(res.data));

            await getAllUsersRedux(accessToken, dispatch, axiosJWT);
        } else {
            console.log(res);
            dispatch(deleteUserFail());
        }

        return res.data;
    } catch (e) {
        console.log(e);
        dispatch(deleteUserFail());
    }
};

export const createNewUser = async (data, accessToken, dispatch, axiosJWT) => {
    dispatch(createUserStart());
    try {
        const res = await axiosJWT.post('http://localhost:3030/api/register', data, {
            headers: { token: `Bearer ${accessToken}` },
        });
        if (res.data.errCode === 0) {
            dispatch(createUserSuccess());

            await getAllUsersRedux(accessToken, dispatch, axiosJWT);
        } else {
            console.log(res);
            dispatch(createUserFail());
        }

        return res.data;
    } catch (e) {
        console.log(e);
        dispatch(createUserFail());
    }
};

export const createNewBrand = async (data, accessToken, dispatch, axiosJWT) => {
    dispatch(createBrandStart());
    try {
        const res = await axiosJWT.post(`/api/createNewBrand`, data, { headers: { token: `Bearer ${accessToken}` } });
        console.log(res);
        if (res.data.errCode === 0) {
            dispatch(createBrandSuccess(res));
            return res.data;
        } else {
            console.log(res);
            dispatch(createBrandFail());
            return res.data;
        }
    } catch (e) {
        console.log(e);
        dispatch(createBrandFail());
    }
};

export const getAllBrands = async (accessToken, dispatch, axiosJWT, navigate) => {
    dispatch(getBrandsStart());
    try {
        const res = await axiosJWT.get(`/api/getAllBrands`, { headers: { token: `Bearer ${accessToken}` } });
        if (res.data.errCode === 0) {
            dispatch(getBrandsSuccess(res));
        } else {
            console.log(res);
        }
    } catch (e) {
        console.log(e);
        navigate(config.routes.loginAdmin);
        dispatch(getBrandsFail());
    }
};

export const deleteBrand = async (dispatch, axiosJWT, id, accessToken) => {
    dispatch(deleteBrandStart());
    try {
        const res = await axiosJWT.delete(`/api/deleteBrand?id=${id}`, { headers: { token: `Bearer ${accessToken}` } });
        if (res.data.errCode === 0) {
            dispatch(deleteBrandSuccess());
            return res.data;
        } else {
            dispatch(deleteBrandFail());
            return res.data;
        }
    } catch (e) {
        console.log(e);
        dispatch(deleteBrandFail());
    }
};

export const editBrand = async (dispatch, axiosJWT, data, accessToken) => {
    dispatch(editBrandStart());
    try {
        const res = await axiosJWT.put('/api/editBrand', data, { headers: { token: `Bearer ${accessToken}` } });
        if (res.data.errCode === 0) {
            dispatch(editBrandSuccess());
            return res.data;
        } else {
            dispatch(editBrandFail());
            return res.data;
        }
    } catch (e) {
        console.log(e);
        dispatch(editBrandFail());
    }
};
