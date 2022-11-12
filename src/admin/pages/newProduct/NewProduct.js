import styles from './New.module.scss';
import classNames from 'classnames/bind';
import SideBar from '~/admin/components/sidebar/SideBar';
import NavBar from '~/admin/components/navbar/Navbar';
import images from '~/assets/images';
import { ConnectingAirportsOutlined, DriveFolderUploadOutlined } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import CommonUtils from '~/utils/CommonUtlis';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import { useNavigate } from 'react-router-dom';

import config from '~/config';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { createNewProduct, createNewUser, getAllBrands, getAllCategory, getAllProduct } from '~/redux/apiReques';
import { toast } from 'react-toastify';
import { axiosMiddle } from '~/services/axiosJWT';
import { useForm } from 'react-hook-form';
import ModalAddNew from '~/admin/components/Modal/ModalAddNew';
import ModalDescription from '~/admin/components/Modal/modalMarkdown/ModalDescription';
import ModalSpecification from '~/admin/components/Modal/modalMarkdown/ModalSpecification';
import ModalFeature from '~/admin/components/Modal/modalMarkdown/ModalFeature';
import ModalAssign from '~/admin/components/Modal/modalMarkdown/ModalAssign';

const cx = classNames.bind(styles);
function NewProduct() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dataBrand = useSelector((state) => state.brands.allBrand.brands?.data.data);
    const dataCategory = useSelector((state) => state.categories.allCategory.categories?.data.data);

    let [data, setData] = useState({
        descriptionHtml: '',
        specificationHtml: null,
        featureHtml: null,
        assignHtml: null,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const brand = register('brand_id');
    const category = register('cat_id');
    const type = register('type');
    const condition = register('condition');
    const status = register('status');

    let [openDesc, setOpenDesc] = useState(false);
    let [openFeau, setOpenFeau] = useState(false);
    let [openSpec, setOpenSpec] = useState(false);
    let [openAss, setOpenAss] = useState(false);

    let [desc, setDesc] = useState();
    let [spec, setSpec] = useState();
    let [feau, setFeau] = useState();
    let [ass, setAss] = useState();

    let [reviewAvatar, setReviewAvatar] = useState('');
    let [photo, setPhoto] = useState('');

    useEffect(() => {
        async function fetchData() {
            let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);
            await getAllBrands(user?.accessToken, dispatch, axiosJWT, navigate);
            await getAllCategory(user?.accessToken, dispatch, axiosJWT, navigate);
        }

        fetchData();
    }, []);
    let subtitle;

    const afterOpenModal = () => {
        subtitle.style.color = '#f00';
    };
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

    const OpenModal = (e, id) => {
        if (id === 'a') {
            setOpenDesc(true);
        } else if (id === 'b') {
            setOpenSpec(true);
        } else if (id === 'c') {
            setOpenFeau(true);
        } else if (id === 'd') {
            setOpenAss(true);
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnchangeImg = async (e) => {
        let data = e.target.files;
        let files = data[0];

        if (files) {
            let base64 = await CommonUtils.getBase64(files);
            console.log(base64);
            setPhoto(base64);
            let objectUrl = URL.createObjectURL(files);
            setReviewAvatar(objectUrl);
        }
    };
    const handleOnchangeInput = (e, id) => {};

    const handleGetDateFromChildren = (data, id) => {
        console.log(data, id);
        if (id === 'desc') {
            setDesc(data);
        } else if (id === 'spec') {
            setSpec(data);
        } else if (id === 'feau') {
            setFeau(data);
        } else if (id === 'ass') {
            setAss(data);
        }
    };

    const onSubmit = async (brand) => {
        let data = {
            cat_id: +brand.cat_id,
            brand_id: +brand.brand_id,
            title: brand.title,
            photo: photo,
            type: brand.type,
            stock: +brand.stock,
            unit_of_product: brand.unit_of_product,
            expiry: brand.expiry,
            price: +brand.price,
            discount: +brand.discount,
            condition: brand.condition,
            status: brand.status,

            descriptionHtml: desc,
            specificationHtml: spec,
            featureHtml: feau,
            assignHtml: ass,

            action: 'CREATE',
        };
        let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);
        let res = await createNewProduct(data, user?.accessToken, dispatch, axiosJWT);
        if (res.errCode === 0) {
            toast.success(res.errMessage);
            await getAllProduct(user?.accessToken, dispatch, axiosJWT, navigate);
            navigate(config.routes.product);
        } else {
            toast.error(res.errMessage);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('top')}>
                    <h1>Thêm sản phẩm mới</h1>
                </div>
                <div className={cx('bottom')}>
                    <div className={cx('left')}>
                        <img src={reviewAvatar ? reviewAvatar : images.noImage} alt="" />
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('form-input')}>
                            <label htmlFor="file">
                                Ảnh: <DriveFolderUploadOutlined className={cx('icon')} />
                            </label>
                            <input
                                onChange={(e) => handleOnchangeImg(e)}
                                type="file"
                                id="file"
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className={cx('form-input')}>
                            <label>Tên sản phẩm</label>
                            <input placeholder="John" {...register('title', { required: true })} />
                            {errors.exampleRequired && <p>This field is required</p>}
                        </div>
                        <div className={cx('form-input')}>
                            <label>Mô tả</label>
                            <ModalDescription
                                handleGetDateFromChildren={(data, id) => handleGetDateFromChildren(data, id)}
                                isOpen={openDesc}
                                desc={desc}
                                FuncToggleModal={() => setOpenDesc(!OpenModal)}
                            />
                            <div
                                onClick={(e) => OpenModal(e, 'a')}
                                className={cx('text')}
                                dangerouslySetInnerHTML={{
                                    __html: desc,
                                }}
                            ></div>
                            {errors.exampleRequired && <p>This field is required</p>}
                        </div>
                        <div className={cx('form-input')}>
                            <label>Thông số/ Thành phần</label>
                            <ModalSpecification
                                handleGetDateFromChildren={(data, id) => handleGetDateFromChildren(data, id)}
                                isOpen={openSpec}
                                FuncToggleModal={() => setOpenSpec(!openSpec)}
                            />
                            <div
                                onClick={(e) => OpenModal(e, 'b')}
                                className={cx('text')}
                                dangerouslySetInnerHTML={{
                                    __html: spec,
                                }}
                            ></div>
                            {errors.exampleRequired && <p>This field is required</p>}
                        </div>
                        <div className={cx('form-input')}>
                            <label>Đặc điểm chính</label>
                            <ModalFeature
                                handleGetDateFromChildren={(data, id) => handleGetDateFromChildren(data, id)}
                                isOpen={openFeau}
                                FuncToggleModal={() => setOpenFeau(!openFeau)}
                            />
                            <div
                                onClick={(e) => OpenModal(e, 'c')}
                                className={cx('text')}
                                dangerouslySetInnerHTML={{
                                    __html: feau,
                                }}
                            ></div>
                            {errors.exampleRequired && <p>This field is required</p>}
                        </div>
                        <div className={cx('form-input')}>
                            <label>Chỉ định</label>
                            <ModalAssign
                                handleGetDateFromChildren={(data, id) => handleGetDateFromChildren(data, id)}
                                isOpen={openAss}
                                FuncToggleModal={() => setOpenAss(!openAss)}
                            />
                            <div
                                onClick={(e) => OpenModal(e, 'd')}
                                className={cx('text')}
                                dangerouslySetInnerHTML={{
                                    __html: ass,
                                }}
                            ></div>
                            {errors.exampleRequired && <p>This field is required</p>}
                        </div>
                        <div className={cx('form-input')}>
                            <label>Hãng</label>
                            <select
                                onChange={(e) => {
                                    brand.onChange(e); // react hook form onChange
                                    console.log('Here would go the my onChange'); // my onChange
                                }}
                                {...register('brand_id')}
                                onBlur={brand.onBlur}
                                ref={brand.ref}
                            >
                                {dataBrand ? (
                                    dataBrand.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.title}
                                            </option>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </select>
                        </div>
                        <div className={cx('form-input')}>
                            <label>Danh mục</label>
                            <select
                                onChange={(e) => {
                                    category.onChange(e); // react hook form onChange
                                    console.log('Here would go the my onChange'); // my onChange
                                }}
                                {...register('cat_id')}
                                onBlur={category.onBlur}
                                ref={category.ref}
                            >
                                {dataCategory ? (
                                    dataCategory.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.title}
                                            </option>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </select>
                        </div>
                        <div className={cx('form-input')}>
                            <label>Loại</label>
                            <select
                                onChange={(e) => {
                                    type.onChange(e); // react hook form onChange
                                    console.log('Here would go the my onChange'); // my onChange
                                }}
                                {...register('type')}
                                onBlur={type.onBlur}
                                ref={type.ref}
                            >
                                <option value="0">ss</option>
                                <option value="1">a</option>
                                <option value="2">ccss</option>
                                <option value="3">sssssss</option>
                            </select>
                        </div>
                        <div className={cx('form-input')}>
                            <label>Hạn sử dụng (nếu có)</label>
                            <input type="text" {...register('expiry', { required: true })} />
                        </div>
                        <div className={cx('form-input')}>
                            <label>Số lượng</label>
                            <input type="number" {...register('stock', { required: true })} />
                        </div>
                        <div className={cx('form-input')}>
                            <label>Quy cách</label>
                            <input {...register('unit_of_product', { required: true })} />
                        </div>
                        <div className={cx('form-input')}>
                            <label>Giá tiền</label>
                            <input type="number" {...register('price', { required: true })} />
                        </div>
                        <div className={cx('form-input')}>
                            <label>Giảm giá</label>
                            <input type="number" {...register('discount', { required: true })} />
                        </div>
                        <div className={cx('form-input')}>
                            <label>Tình trạng</label>
                            <select
                                onChange={(e) => {
                                    condition.onChange(e); // react hook form onChange
                                    console.log('Here would go the my onChange'); // my onChange
                                }}
                                {...register('condition')}
                                onBlur={condition.onBlur}
                                ref={condition.ref}
                            >
                                <option value="hot">HOT</option>
                                <option value="new">NEW</option>
                            </select>
                        </div>
                        <div className={cx('form-input')}>
                            <label>Trạng thái</label>
                            <select
                                onChange={(e) => {
                                    status.onChange(e); // react hook form onChange
                                    console.log('Here would go the my onChange'); // my onChange
                                }}
                                {...register('status')}
                                onBlur={status.onBlur}
                                ref={status.ref}
                            >
                                <option value="1">Active</option>
                                <option value="0">Disable</option>
                            </select>
                        </div>
                        <input className={cx('btnSave')} type="submit" />
                    </div>
                </div>
            </form>
        </>
    );
}

export default NewProduct;
