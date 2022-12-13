import { useEffect } from 'react';
import { getAllBrands, getAllUsersRedux } from '~/redux/apiReques';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ListScheduleDoctor.scss';
import config from '~/config';
import jwt_decode from 'jwt-decode';
import { axiosMiddle } from '~/services/axiosJWT';
import DatatableDoctorSchedule from '~/admin/components/datatable/DatatableDoctorSchedule';
function ListScheduleDoctor({ data }) {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(config.routes.loginAdmin);
        }
        const fetch = async () => {
            let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);

            await getAllBrands(user?.accessToken, dispatch, axiosJWT, navigate);
        };
        fetch();
    }, [user]);
    const action = {};
    if (data === 'history') {
        action.action = 'history';
        action.title = 'Lịch sử khám';
    }

    return (
        <>
            <DatatableDoctorSchedule action={data === 'history' ? action : null} />
        </>
    );
}

export default ListScheduleDoctor;
