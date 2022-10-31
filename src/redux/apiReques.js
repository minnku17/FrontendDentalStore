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
} from './userSlice';

export const loginUser = async (email, password, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await login(email, password);
        dispatch(loginSuccess(res));
        if (res.errCode === 0) {
            navigate(config.routes.dashboard);
        }
    } catch (e) {
        dispatch(loginFail);
    }
};

export const getAllUsersRedux = async (accessToken, dispatch, axiosJWT) => {
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
