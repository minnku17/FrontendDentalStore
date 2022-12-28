import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import VisibilityIcon from '@mui/icons-material/Visibility';

import styles from './CustomerLogin.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createNewCustomer, loginCus } from '~/redux/apiReques';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
function CustomerLogin() {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Đăng nhập | Sàn Nha Khoa`;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    let [showPass, setShowPass] = useState(false);
    let [toggleForm, setToggleForm] = useState(true);
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [passwordSignup, setPasswordSignup] = useState('');
    let [comfirmPassword, setComfirmPassword] = useState('');
    let [showPassConfirm, setShowPassConfirm] = useState(false);

    const checkValidate = (obj) => {
        let isValid = true;

        const arrInput = ['firstName', 'lastName', 'email', 'password', 'comfirmPassword'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!obj[arrInput[i]]) {
                isValid = false;
                toast.warning(`Vui lòng nhập đầy đủ thông tin bên dưới!!!`);
                break;
            }
        }
        return isValid;
    };

    const onSubmit = async (data) => {
        let obj = {};
        obj.firstName = data.firstName;
        obj.lastName = data.lastName;
        obj.email = data.email;
        obj.password = passwordSignup;
        obj.comfirmPassword = comfirmPassword;
        obj.positionId = 'None';
        obj.roleId = 'Customer';

        let check = checkValidate(obj);

        if (check === false) return;

        if (passwordSignup !== comfirmPassword) return toast.warning('Mật khẩu nhập lại không khớp mật khẩu!!!');

        let res = await createNewCustomer(dispatch, obj);
        if (res.errCode === 0) {
            toast.success('Tạo tài khoản thành công!!!');
            setToggleForm(!toggleForm);
        }
        console.log(res);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email) return toast.warning('Vui lòng nhập email!!!');
        if (!password) return toast.warning('Vui lòng nhập password!!!');

        const res = await loginCus(dispatch, email, password, navigate);
        if (res.errCode === 1) {
            toast.warning('Sai email hoặc mật khẩu!!!, vui lòng nhập lại.');
        }
    };

    const toggleEye = () => {
        setShowPass(!showPass);
    };
    const toggleEyeConfirm = () => {
        setShowPassConfirm(!showPassConfirm);
    };
    const toggleFormSign = () => {
        setToggleForm(!toggleForm);
    };
    const handleOnchangeSign = (e, id) => {
        if (id === 'email') {
            setEmail(e.target.value);
        } else if (id === 'password') {
            setPassword(e.target.value);
        }
    };

    return (
        <>
            <section className={cx('container')}>
                {toggleForm === true ? (
                    <>
                        <div className={cx('form')}>
                            <div className="form-content">
                                <header>Đăng Nhập</header>

                                <form>
                                    <div className={cx('field')}>
                                        <input
                                            value={email}
                                            onChange={(e) => handleOnchangeSign(e, 'email')}
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className={cx('field')}>
                                        <input
                                            type={showPass === true ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => handleOnchangeSign(e, 'password')}
                                            placeholder="Mật khẩu"
                                        />
                                        <span onClick={() => toggleEye()}>
                                            <VisibilityIcon className={cx('eye-icon')} />
                                        </span>
                                    </div>
                                    <div className={cx('form-link')}>
                                        <Link to="#" className={cx('forgot-passs')}>
                                            Bạn quên mật khẩu?
                                        </Link>
                                    </div>
                                    <div className={cx('field')}>
                                        <button onClick={(e) => handleLogin(e)} className={cx('btnSave')}>
                                            Login
                                        </button>
                                    </div>
                                    <div className={cx('form-link')}>
                                        <span>
                                            Bạn chưa có tại khoản?
                                            <span onClick={() => toggleFormSign()} className={cx('login-link')}>
                                                Đăng ký
                                            </span>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={cx('form')}>
                            <div className="form-content">
                                <header>Đăng Ký</header>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className={cx('field')}>
                                        <input type="text" placeholder="Tên" {...register('firstName')} />
                                    </div>
                                    <div className={cx('field')}>
                                        <input type="text" placeholder="Họ và tên lót" {...register('lastName')} />
                                    </div>
                                    <div className={cx('field')}>
                                        <input type="email" placeholder="Email" {...register('email')} />
                                    </div>
                                    <div className={cx('field')}>
                                        <input
                                            type={showPass === true ? 'text' : 'password'}
                                            placeholder="Mật khẩu"
                                            value={passwordSignup}
                                            onChange={(e) => setPasswordSignup(e.target.value)}
                                        />
                                        <span onClick={() => toggleEye()}>
                                            <VisibilityIcon className={cx('eye-icon')} />
                                        </span>
                                    </div>
                                    <div className={cx('field')}>
                                        <input
                                            type={showPassConfirm === true ? 'text' : 'password'}
                                            placeholder="Nhập lại mật khẩu"
                                            value={comfirmPassword}
                                            onChange={(e) => setComfirmPassword(e.target.value)}
                                        />
                                        <span onClick={() => toggleEyeConfirm()}>
                                            <VisibilityIcon className={cx('eye-icon')} />
                                        </span>
                                    </div>

                                    <div className={cx('field')}>
                                        <button className={cx('btnSave')} type="submit">
                                            Đăng ký
                                        </button>

                                        {errors.exampleRequired && <p>This field is required</p>}
                                    </div>
                                    <div className={cx('form-link')}>
                                        <span>
                                            Bạn đã có tại khoản?
                                            <span onClick={() => toggleFormSign()} className={cx('login-link')}>
                                                Đăng nhập
                                            </span>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </>
    );
}

export default CustomerLogin;

// return (
//     <>

//     </>
// );
