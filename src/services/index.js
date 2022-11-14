import * as request from '~/utils/request';
import axios from 'axios';

export const search = async (q, type = 'less') => {
    try {
        const res = await request.get(`users/search`, {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const searchUser = async (q, type = 'less') => {
    try {
        const res = await request.get(`users/search`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (email, password) => {
    try {
        const res = await request.post('/api/login', { email, password }, { withCredentials: true });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getAllUsers = async (accessToken) => {
    try {
        const res = await request.get(`/api/getAllUsers`, { headers: { token: `Bearer ${accessToken}` } });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getUserInfo = async (id) => {
    try {
        const res = await request.get(`/api/getUserInfoById?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const refreshToken = async () => {
    try {
        const res = await request.post('/api/refreshToken', {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getAllParentCategory = async (accessToken) => {
    try {
        const res = await request.get('/api/getAllParentCategory', { headers: { token: `Bearer ${accessToken}` } });
        return res;
    } catch (error) {
        console.log(error);
    }
};
