import className from 'classnames/bind';
import styles from './loginAdmin.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '~/redux/apiReques';
import { useDispatch } from 'react-redux';
import routes from '~/config/routes';
import config from '~/config';

const cx = className.bind(styles);

function LoginAdmin() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnchangeInput = (e, id) => {
        if (id === 'email') {
            setEmail(e.target.value);
        }
        if (id === 'password') {
            setPassword(e.target.value);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        let res = await loginUser(email, password, dispatch, navigate);
        console.log('check res from login:>>>', res);

        if (res && res.errCode === 3) {
            setMessage(res.errMessage);
        } else if (res && res.errCode === 1) {
            setMessage(res.errMessage);
        } else if (res && res.errCode === 0 && res.user.roleId === 'Doctor') {
            navigate(config.routes.dashboard);
        } else if (res && res.errCode === 0 && res.user.roleId === 'Admin') {
            navigate(config.routes.dashboard);
        }

        if (!res) {
            setMessage('An error occurred, please try again laterhaha!!!');
        }

        console.log('check res from login:>>>', res);
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('center')}>
                    <h1>LOGIN</h1>
                    <form>
                        <div className={cx('txt_field')}>
                            <input
                                value={email}
                                onChange={(e) => handleOnchangeInput(e, 'email')}
                                type="text"
                                required
                            />
                            <span></span>
                            <label>Email</label>
                        </div>
                        <div className={cx('txt_field')}>
                            <input
                                value={password}
                                onChange={(e) => handleOnchangeInput(e, 'password')}
                                type="password"
                                required
                            />
                            <span></span>
                            <label>Password</label>
                        </div>
                        {message ? (
                            <>
                                <div className={cx('message')}>{message}</div>
                            </>
                        ) : (
                            ''
                        )}
                        <input type="submit" onClick={(e) => handleSubmit(e)} value="Login" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginAdmin;
