import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SummarizeIcon from '@mui/icons-material/Summarize';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HubIcon from '@mui/icons-material/Hub';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import config from '~/config';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '~/redux/apiReques';
import { axiosMiddle } from '~/services/axiosJWT';
const cx = classNames.bind(styles);
function SideBar() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const idUser = user?.user.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (user) {
            let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);
            console.log(idUser);

            if (idUser) {
                let res = await logoutUser(dispatch, axiosJWT, idUser, user?.accessToken, navigate);
                console.log(res);
            }
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
                        {user && user.user.roleId === 'Admin' && (
                            <>
                                <p className={cx('title')}>CH??NH</p>
                                <Link to={config.routes.dashboard}>
                                    <li>
                                        <DashboardIcon className={cx('icon')} />
                                        <span>Dashboard</span>
                                    </li>
                                </Link>

                                <p className={cx('title')}>DANH M???C</p>

                                <Link to={config.routes.brands}>
                                    <li>
                                        <StorefrontIcon className={cx('icon')} />
                                        <span>H??ng</span>
                                    </li>
                                </Link>
                                <Link to={config.routes.category}>
                                    <li>
                                        <StorefrontIcon className={cx('icon')} />
                                        <span>Danh m???c</span>
                                    </li>
                                </Link>
                                <Link to={config.routes.manage_coupon}>
                                    <li>
                                        <StorefrontIcon className={cx('icon')} />
                                        <span>M?? gi???m gi??</span>
                                    </li>
                                </Link>
                                <Link to={config.routes.manage_banner}>
                                    <li>
                                        <StorefrontIcon className={cx('icon')} />
                                        <span>Banner</span>
                                    </li>
                                </Link>
                                <Link to={config.routes.manage_gift}>
                                    <li>
                                        <StorefrontIcon className={cx('icon')} />
                                        <span>Qu?? t???ng</span>
                                    </li>
                                </Link>
                                <p className={cx('title')}>S???N PH???M</p>

                                <Link to={config.routes.product}>
                                    <li>
                                        <AddBusinessIcon className={cx('icon')} />
                                        <span>S???n ph???m</span>
                                    </li>
                                </Link>
                                <p className={cx('title')}>????N H??NG</p>

                                <Link to={config.routes.order}>
                                    <li>
                                        <SummarizeIcon className={cx('icon')} />
                                        <span>????n h??ng</span>
                                    </li>
                                </Link>
                                <p className={cx('title')}>USER</p>
                                <Link to={config.routes.users}>
                                    <li>
                                        <PersonIcon className={cx('icon')} />
                                        <span>User</span>
                                    </li>
                                </Link>
                            </>
                        )}
                        {user && user.user.roleId === 'Doctor' && (
                            <>
                                <p className={cx('title')}>DANH M???C CHO B??C S?? </p>

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
                            </>
                        )}

                        <p className={cx('title')}>USER</p>
                        {user && user.user.roleId === 'Doctor' && (
                            <>
                                <Link to={config.routes.manage_doctor}>
                                    <li>
                                        <AccountBoxIcon className={cx('icon')} />

                                        <span>QU???N L?? B??C S??</span>
                                    </li>
                                </Link>
                                <Link to={config.routes.manage_schedule}>
                                    <li>
                                        <SettingsIcon className={cx('icon')} />
                                        <span>Ch???n l???ch kh??m</span>
                                    </li>
                                </Link>

                                <Link to={`/admin/doctor-schedule/${user.user.id}`}>
                                    <li>
                                        <HubIcon className={cx('icon')} />

                                        <span>L???ch h???n kh??m c???a b???n</span>
                                    </li>
                                </Link>
                                <Link to={`/admin/doctor-history/${user.user.id}`}>
                                    <li>
                                        <HubIcon className={cx('icon')} />

                                        <span>L???ch s??? kh??m b???nh</span>
                                    </li>
                                </Link>
                            </>
                        )}
                        <li onClick={() => handleLogout()}>
                            <LogoutIcon className={cx('icon')} />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
                {/* <div className={cx('bottom')}>
                    <div className={cx('colorOption')}></div>
                    <div className={cx('colorOption')}></div>
                </div> */}
            </div>
        </>
    );
}

export default SideBar;
