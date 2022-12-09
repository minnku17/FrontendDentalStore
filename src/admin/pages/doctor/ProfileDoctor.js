import React, { useEffect, createContext, useContext } from 'react';
import './ProfileDoctor.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

import localization from 'moment/locale/vi';

import { dataScheduleTimeContext } from './DoctorSchedule';
import _ from 'lodash';
import moment from 'moment';
import { getProfileDoctorById } from '~/services';

function ProfileDoctor({ language, isShowDescriptionDoctor }) {
    const dataContext = useContext(dataScheduleTimeContext);

    let [dataProfile, setDataProfile] = useState({});

    let { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            setDataProfile(await getInfoDoctor(id));
        }
        fetchData();
    }, []);

    const getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }

            console.log(result);
        }

        return result;
    };

    let nameVi = '',
        nameEn = '';
    if (dataProfile && dataProfile.positionData) {
        nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    const renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueVi;

            let data = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY');

            return (
                <>
                    <div>
                        {time} {data}
                    </div>
                    <div>Miễn phí đặt lịch</div>
                </>
            );
        }
        return <></>;
    };
    return (
        <>
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-left">
                        <img src={dataProfile.image} alt="" />
                    </div>
                    <div className="content-right">
                        <div className="up">{nameVi}</div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ? (
                                <>
                                    {dataProfile.Markdown && dataProfile.Markdown.description && (
                                        <span>{dataProfile.Markdown.description}</span>
                                    )}
                                </>
                            ) : (
                                <>{renderTimeBooking(dataContext)}</>
                            )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    Giá khám:{' '}
                    {dataProfile && dataProfile.Doctor_info && (
                        <NumericFormat
                            className="currency"
                            type="text"
                            value={dataProfile.Doctor_info.priceTypeData.valueVi}
                            displayType="text"
                            thousandSeparator={true}
                            suffix={'VNĐ'}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default ProfileDoctor;
