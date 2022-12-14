import React from 'react';
import './ManageDoctor.scss';
import { useState, useEffect } from 'react';
import { CKEditor } from 'ckeditor4-react';
import { toast } from 'react-toastify';

import Select from 'react-select';
import { getAllCodeService, getAllDoctors, getDetailInfoDoctor, saveDetailDoctorService } from '~/services';
import { useSelector } from 'react-redux';

function ManageDoctor() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    //save to Markdown table
    const [contentHTML, setContentHTML] = useState('');
    const [description, setDescription] = useState('');
    const [hasOldData, setHasOldData] = useState(false);

    //save to doctor_info table
    let [listPrice, setListPrice] = useState([]);
    let [listPayment, setListPayment] = useState([]);
    let [listProvince, setListProvince] = useState([]);

    let [selectedPrice, setselectedPrice] = useState('');
    let [selectedPayment, setselectedPayment] = useState('');
    let [selectedProvince, setselectedProvince] = useState('');

    let [nameClinic, setNameClinic] = useState('');
    let [addressClinic, setAddressClinic] = useState('');
    let [note, setNote] = useState('');

    let [allRequiredDoctorInfo, setAllRequiredDoctorInfo] = useState();

    useEffect(() => {
        const fetchApiRequired = async () => {
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                };

                setAllRequiredDoctorInfo(data);
            }
        };

        fetchApiRequired();
    }, []);

    useEffect(() => {
        if (allRequiredDoctorInfo) {
            let dataSelectPrice = buildDataInputSelect(allRequiredDoctorInfo.resPrice, 'PRICE');
            let dataSelectPayment = buildDataInputSelect(allRequiredDoctorInfo.resPayment, 'PAYMENT');
            let dataSelectProvince = buildDataInputSelect(allRequiredDoctorInfo.resProvince, 'PROVINCE');
            setListPrice(dataSelectPrice);
            setListPayment(dataSelectPayment);
            setListProvince(dataSelectProvince);

            const fetchApi = async () => {
                let res = await getDetailInfoDoctor(user.user.id);

                console.log('check resss', res);

                if (res && res.errCode === 0 && res.data && res.data.Markdown) {
                    let markdown = res.data.Markdown;
                    let addressClinic = '',
                        nameClinic = '',
                        note = '',
                        paymentId = '',
                        priceId = '',
                        provinceId = '',
                        selectedPayment = '',
                        selectedPrice = '',
                        selectedProvinceId = '';
                    if (res.data.Doctor_info) {
                        console.log('check', res.data.Doctor_info);
                        console.log('check list payment', listPayment);

                        addressClinic = res.data.Doctor_info.addressClinic;
                        nameClinic = res.data.Doctor_info.nameClinic;
                        note = res.data.Doctor_info.note;
                        paymentId = res.data.Doctor_info.paymentId;
                        priceId = res.data.Doctor_info.priceId;
                        provinceId = res.data.Doctor_info.provinceId;

                        selectedPayment = listPayment.find((item) => {
                            return item && item.value === paymentId;
                        });
                        selectedPrice = listPrice.find((item) => {
                            return item && item.value === priceId;
                        });
                        selectedProvinceId = listProvince.find((item) => {
                            return item && item.value === provinceId;
                        });
                    }

                    setAddressClinic(addressClinic);
                    setNameClinic(nameClinic);
                    setNote(note);
                    setContentHTML(markdown.specificationHtml);
                    setDescription(markdown.descriptionHtml);
                    setHasOldData(true);
                    setselectedPayment(dataSelectPayment);
                    setselectedPrice(dataSelectPrice);
                    setselectedProvince(dataSelectProvince);
                }
            };
            fetchApi();
        }
    }, [allRequiredDoctorInfo]);

    useEffect(() => {}, []);

    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;

                    object.label = labelVi;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;

                    object.label = labelVi;
                    object.value = item.key;
                    result.push(object);
                });
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;

                    object.label = labelVi;
                    object.value = item.key;
                    result.push(object);
                });
            }
        }
        return result;
    };

    const handleEditorChange = (e) => {
        setContentHTML(e.editor.getData());
    };

    const handleSaveContentMarkdown = async () => {
        let res = await saveDetailDoctorService({
            addressClinic: addressClinic,
            contentHTML: contentHTML,
            description: description,
            doctorId: user.user.id,
            action: hasOldData === true ? 'EDIT' : 'CREATE',
            selectedPrice: selectedPrice.value,
            selectedPayment: selectedPayment.value,
            selectedProvince: selectedProvince.value,
            nameClinic: nameClinic,
            note: note,
        });
        if (res.errCode === 0) {
            toast.success(res.errMessage);
        } else {
            toast.error(res.errMessage);
        }
    };
    const handleChangeSelectDoctorInfo = (selectedOptions, name) => {
        let stateName = name.name;

        if (stateName === 'selectedPrice') {
            selectedPrice = selectedOptions;
            setselectedPrice(selectedPrice);
        } else if (stateName === 'selectedPayment') {
            selectedPayment = selectedOptions;
            setselectedPayment(selectedPayment);
        } else if (stateName === 'selectedProvince') {
            selectedProvince = selectedOptions;
            setselectedProvince(selectedProvince);
        }
    };

    const handleOnchangeText = (e, id) => {
        if (id === 'description') {
            setDescription(e.target.value);
        }
        if (id === 'nameClinic') {
            setNameClinic(e.target.value);
        }
        if (id === 'addressClinic') {
            setAddressClinic(e.target.value);
        }
        if (id === 'note') {
            setNote(e.target.value);
        }
    };

    console.log('checkkk', contentHTML);
    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-title">T???o th??m th??ng tin b??c s??</div>
            <div className="more-info">
                <div className="content-left form-group">
                    <label>B??c s??: </label>
                    <span>{`${user.user.lastName} ${user.user.firstName}`}</span>
                </div>
                <div className="content-right">
                    <label>Th??ng tin gi???i thi???u</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => handleOnchangeText(e, 'description')}
                    ></textarea>
                </div>
            </div>
            <div className="more-infor-extra row">
                <div className="col-4 form-group">
                    <label>Gi?? kh??m b???nh</label>
                    <Select
                        value={selectedPrice}
                        onChange={handleChangeSelectDoctorInfo}
                        options={listPrice}
                        placeholder="Gi?? kh??m b???nh"
                        name="selectedPrice"
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Ph????ng th???c thanh to??n</label>

                    <Select
                        value={selectedPayment}
                        onChange={handleChangeSelectDoctorInfo}
                        options={listPayment}
                        placeholder="Ph????ng th???c thanh to??n"
                        name="selectedPayment"
                    />
                </div>
                <div className="col-4 form-group">
                    <label>T???nh th??nh</label>
                    <Select
                        value={selectedProvince}
                        onChange={handleChangeSelectDoctorInfo}
                        options={listProvince}
                        placeholder="T???nh th??nh"
                        name="selectedProvince"
                    />
                </div>
                <div className="col-4 form-group">
                    <label>T??n ph??ng kh??m</label>
                    <input
                        className="form-control"
                        value={nameClinic}
                        onChange={(e) => handleOnchangeText(e, 'nameClinic')}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>?????a ch??? ph??ng kh??m</label>
                    <input
                        className="form-control"
                        value={addressClinic}
                        onChange={(e) => handleOnchangeText(e, 'addressClinic')}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Ghi ch??</label>
                    <input className="form-control" value={note} onChange={(e) => handleOnchangeText(e, 'note')} />
                </div>
            </div>

            <div className="manage-doctor-editor">
                <form>
                    <CKEditor
                        initData={contentHTML}
                        style={{
                            'margin-top': '0',
                            width: '100%',
                            height: '100%',
                        }}
                        onChange={(e) => handleEditorChange(e)}
                    />
                    <div>{contentHTML}</div>
                </form>
            </div>

            <button
                // className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                onClick={() => handleSaveContentMarkdown()}
            >
                {hasOldData === true ? <span>L??u th??ng tin</span> : <span>T???o th??ng tin</span>}
            </button>
        </div>
    );
}

export default ManageDoctor;
