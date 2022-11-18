import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';

import styles from './CustomerLogin.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function NewProduct() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {};

    return (
        <>
            <section className={cx('container')}>
                <div className={cx('form')}>
                    <div className="form-content">
                        <header>Login</header>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={cx('field')}>
                                <input type="email" placeholder="Email" {...register('email', { required: true })} />
                                {errors.exampleRequired && <p>This field is required</p>}
                            </div>
                            <div className={cx('field')}>
                                <input
                                    type="password"
                                    placeholder="password"
                                    {...register('password', { required: true })}
                                />
                                <VisibilityIcon className={cx('eye-icon')} />
                                {errors.exampleRequired && <p>This field is required</p>}
                            </div>
                            <div className={cx('form-link')}>
                                <Link to="#" className={cx('forgot-passs')}>
                                    Bạn quên mật khẩu?
                                </Link>
                            </div>
                            <div className={cx('field')}>
                                <button className={cx('btnSave')} type="submit">
                                    Login
                                </button>

                                {errors.exampleRequired && <p>This field is required</p>}
                            </div>
                            <div className={cx('form-link')}>
                                <span>
                                    Bạn đã có tại khoản?
                                    <Link to="#" className={cx('signup-link')}>
                                        Signup
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </div>
                    <div className={cx('line')}></div>
                    <div className={cx('media-options')}>
                        <Link to="#" className={cx('google')}>
                            <GoogleIcon className={cx('google-icon')} />
                            <span>Đăng nhập với Google</span>
                        </Link>
                    </div>
                </div>

                <div className={cx('form')}>
                    <div className="form-content">
                        <header>Sign Up</header>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={cx('field')}>
                                <input type="email" placeholder="Email" {...register('email', { required: true })} />
                                {errors.exampleRequired && <p>This field is required</p>}
                            </div>
                            <div className={cx('field')}>
                                <input
                                    type="password"
                                    placeholder="password"
                                    {...register('password', { required: true })}
                                />
                                <VisibilityIcon className={cx('eye-icon')} />
                                {errors.exampleRequired && <p>This field is required</p>}
                            </div>
                            <div className={cx('field')}>
                                <input
                                    type="password"
                                    placeholder="password"
                                    {...register('password', { required: true })}
                                />
                                <VisibilityIcon className={cx('eye-icon')} />
                                {errors.exampleRequired && <p>This field is required</p>}
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
                                    <Link to="#" className={cx('login-link')}>
                                        Đăng nhập
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </div>
                    <div className={cx('line')}></div>
                    <div className={cx('media-options')}>
                        <Link to="#" className={cx('google')}>
                            <GoogleIcon className={cx('google-icon')} />
                            <span>Đăng nhập với Google</span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NewProduct;

// return (
//     <>

//     </>
// );
