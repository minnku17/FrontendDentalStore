import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import SideBar from '~/admin/components/sidebar/SideBar';
import NavBar from '~/admin/components/navbar/Navbar';
import Widget from '~/admin/components/widget/Widget';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

import { getAllUsersRedux } from '~/redux/apiReques';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { axiosMiddle } from '~/services/axiosJWT';
import Featured from '~/admin/components/featured/Featured';
import Chart from '~/admin/components/chart/Chart';

const cx = classNames.bind(styles);

function Dashboard() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!user) {
        navigate(config.routes.loginAdmin);
    }
    useEffect(() => {
        async function fetchAllUser() {
            let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);
            await getAllUsersRedux(user?.accessToken, dispatch, axiosJWT, navigate);
        }
        fetchAllUser();
        if (!user) {
            navigate(config.routes.loginAdmin);
        } else if (user.user.roleId !== 'Admin') {
            navigate(config.routes.profile);
        }
    }, []);
    return (
        <>
            <div className={cx('widgets')}>
                <Widget type="user" />
                <Widget type="order" />
                <Widget type="earning" />
                <Widget type="balance" />
            </div>
            <div className={cx('charts')}>
                <Featured />
                <Chart />
            </div>
        </>
    );
}

export default Dashboard;
