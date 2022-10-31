import styles from './Datatable.module.scss';
import classNames from 'classnames/bind';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { refreshToken } from '~/services';
import { loginSuccess } from '~/redux/authSlice';
import { deleteUserById } from '~/redux/apiReques';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
function Datatable() {
    let allUsers = useSelector((state) => state.user.users.allUsers?.data);
    const user = useSelector((state) => state.auth.login?.currentUser);

    let [rows, setRows] = useState([]);

    useEffect(() => {
        if (allUsers) {
            let allUser = allUsers.map((item) => {
                return {
                    id: item.id,
                    username: `${item.firstName} ${item.lastName}`,
                    status: 'active',
                    email: item.email,
                    image: item.image,
                    gender: item.gender,
                    address: item.address,
                    role: item.roleId,
                    phoneNumber: item.phonenumber,
                };
            });

            setRows(allUser);
        }
    }, [allUsers]);

    // if (stateAllUser) {
    //     rows = stateAllUser.map((user) => {
    //         return {
    //             id: user.id,
    //             username: `${user.firstName} ${user.lastName}`,
    //             status: 'active',
    //             email: user.email,
    //             image: user.image,
    //             gender: user.gender,
    //             address: user.address,
    //             role: user.roleId,
    //             phoneNumber: user.phonenumber,
    //         };
    //     });
    // }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'user',
            headerName: 'User',
            width: 230,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cellWithImg')}>
                            <img className={cx('cellImg')} src={images.noImage} alt="avatar" />
                            {params.row.username}
                        </div>
                    </>
                );
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 150,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 170,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 100,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 100,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cell-action')}>
                            <div className={cx('view-button')} onClick={() => handleSubmit(params.row.id)}>
                                View
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

    const handleSubmit = (user) => {
        navigate(`details/${user}`);
    };

    const handleDeleteUser = async (id) => {
        let res = await deleteUserById(id, user?.accessToken, dispatch, axiosJWT);
        console.log('check res from handleDeleteUser:>>>', res);

        if (res.errCode === 0) {
            toast.success(res.errMessage);
        } else {
            toast.error(res.errMessage);
        }
    };

    return (
        <>
            <div className={cx('datatable')}>
                <div className={cx('datatable-title')}>
                    List User
                    <Link to={config.routes.new} className={cx('link')}>
                        Add New User
                    </Link>
                </div>
                <DataGrid
                    className={cx('customTable')}
                    rows={rows}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </div>
        </>
    );
}

export default Datatable;
