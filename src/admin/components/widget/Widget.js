import styles from './Widget.module.scss';
import classNames from 'classnames/bind';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    AccountBalanceWalletOutlined,
    MonetizationOnOutlined,
    PersonOutlineOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);
function Widget({ type }) {
    let allUsers = useSelector((state) => state.user.users.allUsers?.data);
    console.log(allUsers);
    let data;

    const amount = 100;
    const diff = 20;

    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                link: <Link to={config.routes.users}>See all users</Link>,
                icon: (
                    <PersonOutlineOutlined
                        className={cx('icon')}
                        style={{ backgroundColor: 'rgba(218, 165, 32 ,0.2)' }}
                    />
                ),
            };
            break;
        case 'order':
            data = {
                title: 'ORDERS',
                isMoney: false,
                link: 'See all orders',
                icon: (
                    <ShoppingCartOutlined
                        className={cx('icon')}
                        style={{ backgroundColor: 'rgba(218, 165, 32 ,0.2)', color: 'goldenrod' }}
                    />
                ),
            };
            break;
        case 'earning':
            data = {
                title: 'EARNINGS',
                isMoney: false,
                link: 'View net earning',
                icon: (
                    <MonetizationOnOutlined
                        className={cx('icon')}
                        style={{ backgroundColor: 'rgba(218, 165, 32 ,0.2)', color: 'green' }}
                    />
                ),
            };
            break;
        case 'balance':
            data = {
                title: 'BALANCE',
                isMoney: false,
                link: 'See details',
                icon: (
                    <AccountBalanceWalletOutlined
                        className={cx('icon')}
                        style={{ backgroundColor: 'rgba(218, 165, 32 ,0.2)', color: 'purple' }}
                    />
                ),
            };
            break;
        default:
            break;
    }
    return (
        <>
            <div className={cx('widget')}>
                <div className={cx('left')}>
                    <span className={cx('title')}>{data.title}</span>
                    <span className={cx('counter')}>
                        {data.isMoney && '$'} {data.title === 'USERS' ? allUsers?.length : amount}
                    </span>
                    <span className={cx('link')}>{data.link}</span>
                </div>
                <div className={cx('right')}>
                    <div className={cx('percentage')}>
                        <KeyboardArrowUpIcon />
                        {diff} %
                    </div>
                    {data.icon}
                </div>
            </div>
        </>
    );
}

export default Widget;
