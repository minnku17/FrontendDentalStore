import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SummarizeIcon from '@mui/icons-material/Summarize';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HubIcon from '@mui/icons-material/Hub';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import config from '~/config';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '~/services';
import { loginSuccess } from '~/redux/authSlice';
import { logoutUser } from '~/redux/apiReques';
const cx = classNames.bind(styles);
function SideBar() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const idUser = user?.user.id;

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

    const handleLogout = async () => {
        console.log(idUser);

        if (idUser) {
            await logoutUser(idUser, axiosJWT, user?.accessToken, navigate);
        }
    };
    return (
        <>
            <div className={cx('SideBar')}>
                <div className={cx('top')}>
                    <Link to={config.routes.dashboard}>
                        <span className={cx('logo')}>Dental Admin</span>
                    </Link>
                </div>
                <hr />
                <div className={cx('center')}>
                    <ul>
                        <p className={cx('title')}>MAIN</p>
                        <Link to={config.routes.dashboard}>
                            <li>
                                <DashboardIcon className={cx('icon')} />
                                <span>Dashboard</span>
                            </li>
                        </Link>

                        <p className={cx('title')}>LISTS</p>
                        <Link to={config.routes.users}>
                            <li>
                                <PersonIcon className={cx('icon')} />
                                <span>User</span>
                            </li>
                        </Link>
                        <Link to={config.routes.brands}>
                            <li>
                                <StorefrontIcon className={cx('icon')} />
                                <span>Brands</span>
                            </li>
                        </Link>

                        <li>
                            <AddBusinessIcon className={cx('icon')} />
                            <span>Products</span>
                        </li>
                        <li>
                            <SummarizeIcon className={cx('icon')} />
                            <span>Orders</span>
                        </li>
                        <p className={cx('title')}>USEFUL</p>

                        <li>
                            <QueryStatsIcon className={cx('icon')} />
                            <span>Stats</span>
                        </li>
                        <li>
                            <LocalShippingIcon className={cx('icon')} />
                            <span>Delivery</span>
                        </li>
                        <li>
                            <CircleNotificationsIcon className={cx('icon')} />
                            <span>Notifications</span>
                        </li>
                        <p className={cx('title')}>SERVICE</p>

                        <li>
                            <MedicalInformationIcon className={cx('icon')} />
                            <span>System Health</span>
                        </li>
                        <li>
                            <HubIcon className={cx('icon')} />
                            <span>Logs</span>
                        </li>
                        <li>
                            <SettingsIcon className={cx('icon')} />
                            <span>Settings</span>
                        </li>
                        <p className={cx('title')}>USER</p>

                        <li>
                            <AccountBoxIcon className={cx('icon')} />
                            <span>Profile</span>
                        </li>

                        <li onClick={() => handleLogout()}>
                            <LogoutIcon className={cx('icon')} />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('bottom')}>
                    <div className={cx('colorOption')}></div>
                    <div className={cx('colorOption')}></div>
                </div>
            </div>
        </>
    );
}

export default SideBar;
