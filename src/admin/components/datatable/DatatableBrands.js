import styles from './DatatableBrands.module.scss';
import classNames from 'classnames/bind';
import { DataGrid } from '@mui/x-data-grid';
import { useMovieData } from '@mui/x-data-grid-generator';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { refreshToken } from '~/services';
import { loginSuccess } from '~/redux/authSlice';
import { deleteBrand, deleteUserById, getAllBrands } from '~/redux/apiReques';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ModalBrands from '../Modal/ModalBrands';

const cx = classNames.bind(styles);
function DatatableBrands() {
    let allBrands = useSelector((state) => state.brands.allBrand.brands?.data.data);
    const user = useSelector((state) => state.auth.login?.currentUser);

    let [rows, setRows] = useState([]);
    let [checkBoxSelection, setCheckBoxSelection] = useState(false);
    let [isOpen, setIsOpen] = useState(false);

    const [idUser, setIdUser] = useState();
    const data = useMovieData();

    const handleRowClick = (params) => {
        setIdUser(idUser ? null : params.row.id);
        setCheckBoxSelection(!checkBoxSelection);
    };
    useEffect(() => {
        if (allBrands) {
            let allBrand = allBrands.map((item) => {
                return {
                    id: item.id,
                    title: item.title,
                    photo: item.photo,
                    status: item.status,
                };
            });

            setRows(allBrand);
        }
    }, [allBrands]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'title',
            headerName: 'Title',
            width: 230,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cellWithImg')}>
                            <img
                                className={cx('cellImg')}
                                src={params.row.image ? params.row.image : images.noImage}
                                alt="avatar"
                            />
                            {params.row.title}
                        </div>
                    </>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('status')}>
                            {params.row.status === 1 ? (
                                <div className={cx('active')}>Active</div>
                            ) : (
                                <div className={cx('disable')}>Disable</div>
                            )}
                        </div>
                    </>
                );
            },
        },

        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cell-action')}>
                            <div className={cx('view-button')} onClick={() => handleSubmit(params.row)}>
                                Edit
                            </div>
                            <div className={cx('delete-button')} onClick={() => handleDeleteUser(params.row.id)}>
                                Delete
                            </div>
                        </div>
                    </>
                );
            },
        },
    ];

    const dispatch = useDispatch();

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

    let [idBrand, setIdBrand] = useState(0);
    const handleSubmit = (id) => {
        setIdBrand(id);
        setIsOpen(true);
    };

    const handleDeleteUser = async (id) => {
        let res = await deleteBrand(dispatch, axiosJWT, id, user?.accessToken);
        console.log('check res from handleDeleteUser:>>>', res);

        if (res.errCode === 0) {
            await getAllBrands(user?.accessToken, dispatch, axiosJWT);
            toast.success(res.errMessage);
        } else {
            toast.error(res.errMessage);
        }
    };

    const OpenModal = () => {
        setIdBrand(null);
        setIsOpen(true);
    };
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={cx('datatable')}>
                <div className={cx('datatable-title')}>
                    List Brands
                    <div className={cx('link')} onClick={() => OpenModal()}>
                        Add New Brand
                    </div>
                </div>
                <DataGrid
                    className={cx('customTable')}
                    onRowClick={handleRowClick}
                    {...data}
                    rows={rows}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                />
                <ModalBrands data={idBrand} isOpen={isOpen} FuncToggleModal={() => toggleModal()} />
            </div>
        </>
    );
}

export default DatatableBrands;
