import styles from './List.module.scss';
import classNames from 'classnames/bind';

import NavBar from '~/admin/components/navbar/Navbar';
import SideBar from '~/admin/components/sidebar/SideBar';
import Datatable from '~/admin/components/datatable/Datatable';
import { useEffect } from 'react';
import { getAllUsersRedux } from '~/redux/apiReques';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { refreshToken } from '~/services';
import { loginSuccess } from '~/redux/authSlice';

const cx = classNames.bind(styles);
function List() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    axiosJWT.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodeToken = jwt_decode(user?.accessToken);
            if (decodeToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(loginSuccess(refreshUser));
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    useEffect(() => {
        if (!user) {
            navigate(config.routes.loginAdmin);
        }
        const fetch = async () => {
            await getAllUsersRedux(user?.accessToken, dispatch, axiosJWT);
        };
        fetch();
    }, [user]);
    return (
        <>
            <Datatable />
        </>
    );
}

export default List;
