import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import SideBar from '~/admin/components/sidebar/SideBar';
import NavBar from '~/admin/components/navbar/Navbar';
import Widget from '~/admin/components/widget/Widget';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsersRedux } from '~/redux/apiReques';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Home() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.accessToken) {
            navigate(config.routes.loginAdmin);
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
        </>
    );
}

export default Home;
