import styles from './ModalBrands.module.scss';
import classNames from 'classnames/bind';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import images from '~/assets/images';
import { ConstructionOutlined, DriveFolderUploadOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import CommonUtils from '~/utils/CommonUtlis';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { loginSuccess } from '~/redux/authSlice';
import { refreshToken } from '~/services';
import { createNewBrand, editBrand, getAllBrands, handleEditUser } from '~/redux/apiReques';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { DataGridPremium } from '@mui/x-data-grid-premium';

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        height: '350px',
        width: '900px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function ModalBrands({ isOpen, FuncToggleModal, data }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    let [brand, setBrand] = useState('');
    useEffect(() => {
        setBrand(data);
        let defaultValues = {};
        defaultValues.title = data?.title ? data?.title : '';
        defaultValues.status = data?.status ? data?.status : '1';
        reset({ ...defaultValues });
    }, [data]);

    const user = useSelector((state) => state.auth.login?.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let axiosJWT = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
    });

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

    let subtitle;

    const afterOpenModal = () => {
        subtitle.style.color = '#f00';
    };

    const onSubmit = async (brand) => {
        if (data) {
            let obj = {
                id: data.id,
                title: brand.title,
                status: brand.status,
            };
            let res = await editBrand(dispatch, axiosJWT, obj, user?.accessToken);
            if (res.errCode === 0) {
                toast.success(res.errMessage);
                await getAllBrands(user?.accessToken, dispatch, axiosJWT, navigate);
                FuncToggleModal();
            } else {
                toast.error(res.errMessage);
            }
        } else {
            let res = await createNewBrand(brand, user?.accessToken, dispatch, axiosJWT);
            if (res.errCode === 0) {
                toast.success(res.errMessage);
                await getAllBrands(user?.accessToken, dispatch, axiosJWT, navigate);
                FuncToggleModal();
            } else {
                toast.error(res.errMessage);
            }
        }
    };
    return (
        <>
            <div>
                <Modal
                    isOpen={isOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={FuncToggleModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className={cx('header')}>
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>BRAND</h2>
                        <button className={cx('close')} onClick={FuncToggleModal}>
                            close
                        </button>
                    </div>
                    <div className={cx('top')}>
                        <>{brand ? <h1>Edit New Brand</h1> : <h1>Add New Brand</h1>}</>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('right')}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={cx('form-input')}>
                                    <label>Title</label>
                                    {brand ? (
                                        <input placeholder="Headway" {...register('title', { required: true })} />
                                    ) : (
                                        <input placeholder="Headway" {...register('title', { required: true })} />
                                    )}

                                    {errors.exampleRequired && <p>This field is required</p>}
                                </div>
                                <div className={cx('form-input')}>
                                    <label>Status</label>
                                    <select {...register('status')}>
                                        <option value="1">Active</option>
                                        <option value="0">Disable</option>
                                    </select>
                                </div>
                                <input className={cx('btnSave')} type="submit" />
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default ModalBrands;
