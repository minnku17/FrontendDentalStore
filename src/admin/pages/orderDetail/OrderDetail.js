import styles from './OrderDetail.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import config from '~/config';
import jwt_decode from 'jwt-decode';
import { axiosMiddle } from '~/services/axiosJWT';
import { NumericFormat } from 'react-number-format';

import images from '~/assets/images';
import { useEffect, useState } from 'react';
import { getOrderInfo, handleEditStatusOrder } from '~/services';
import moment from 'moment/moment';

const cx = classNames.bind(styles);
function OrderDetail() {
    const { id } = useParams();

    const user = useSelector((state) => state.auth.login?.currentUser);

    const navigate = useNavigate();
    let [state, setState] = useState({
        order_number: '',
        name: '',
        phonenumber: '',
        note: '',
        status: '',
        date: '',
        time: '',
        coupon: 0,
        total: 0,
        address: '',
    });
    let [listProduct, setListProduct] = useState([]);
    let [selected, setSelected] = useState(state.status);

    useEffect(() => {
        const fetchApi = async () => {
            let res = await getOrderInfo(id);
            console.log('check state', res);

            if (res) {
                setState({
                    order_number: res.data?.order_number,
                    name: `${res.data.lastName} ${res.data.firstName}`,
                    phonenumber: res.data.phonenumber,
                    note: res.data.note,

                    status: res.data.status,
                    date: moment(res.data.createdAt).format('DD/MM/YYYY'),
                    time: moment(res.data.createdAt).format('HH:mm'),
                    coupon: res.data.coupon ? parseInt(res.data.coupon) : null,
                    total: res.data.sub_total,
                    address: res.data.address,
                });
                setListProduct(res.data.ProductOrders);
                setSelected(res.data.status);
            }
        };
        fetchApi();
    }, []);

    const handleOnChange = (e) => {
        setSelected(e.target.value);
    };
    const handleSubmit = async () => {
        console.log('check data:', selected);
        let data = {
            id: id,
            selected: selected,
        };
        let res = await handleEditStatusOrder(data);
        console.log(res);
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
            navigate(config.routes.order);
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('order-number')}>
                    M?? ????n <span>{`#${state.order_number}`}</span>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-left')}>
                        <div className={cx('item-summary')}>
                            <div className={cx('name-list')}>
                                <h4>T??n s???n ph???m</h4>
                                <p>S??? l?????ng</p>
                                <p>Ti???n</p>
                                <p>T???ng c???ng</p>
                            </div>
                            <span className={cx('line')}></span>
                            {listProduct &&
                                listProduct.map((item, index) => {
                                    return (
                                        <div className={cx('item')} key={index}>
                                            <div className={cx('product-name')}>
                                                <img
                                                    src={
                                                        item.imageData.Images[0].photo
                                                            ? item.imageData.Images[0].photo
                                                            : images.noImage
                                                    }
                                                    alt=""
                                                />
                                                <p>{item.imageData.title}</p>
                                            </div>
                                            <span className={cx('quality')}>{item.quantity}</span>
                                            <span>
                                                <NumericFormat
                                                    className="currency"
                                                    type="text"
                                                    value={item.imageData.price}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={'??'}
                                                />
                                            </span>
                                            <span>
                                                <NumericFormat
                                                    className="currency"
                                                    type="text"
                                                    value={item.imageData.price * item.quantity}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={'??'}
                                                />
                                            </span>
                                        </div>
                                    );
                                })}
                        </div>

                        <div className={cx('detail-summary')}>
                            <h3>Th??ng tin kh??ch</h3>
                            <span className={cx('line')}></span>

                            <div className={cx('list-info')}>
                                <p>T??n</p>
                                <span>{state.name}</span>
                            </div>
                            <span className={cx('line')}></span>

                            <div className={cx('list-info')}>
                                <p>S??? ??i???n tho???i</p>
                                <span>{state.phonenumber}</span>
                            </div>
                            <span className={cx('line')}></span>

                            <div className={cx('list-info')}>
                                <p>Ghi ch??</p>
                                <span>{state.note}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content-right')}>
                        <div className={cx('action')}>
                            <h3>Tr???ng th??i</h3>
                            <div className={cx('action-t')}>
                                <div className={cx('form-input')}>
                                    {state.status === 'new' && (
                                        <select value={selected} onChange={(e) => handleOnChange(e)}>
                                            <option value="new">M???i</option>
                                            <option value="process">Chu???n b???</option>
                                            <option value="shipping" disabled>
                                                V???n chuy???n
                                            </option>
                                        </select>
                                    )}
                                    {state.status === 'process' && (
                                        <select value={selected} onChange={(e) => handleOnChange(e)}>
                                            <option value="new" disabled>
                                                M???i
                                            </option>
                                            <option value="process">Chu???n b???</option>
                                            <option value="shipping">V???n chuy???n</option>
                                        </select>
                                    )}
                                    {state.status === 'shipping' && (
                                        <select value={selected} onChange={(e) => handleOnChange(e)}>
                                            <option value="new" disabled>
                                                M???i
                                            </option>
                                            <option value="process" disabled>
                                                Chu???n b???
                                            </option>
                                            <option value="shipping">V???n chuy???n</option>
                                        </select>
                                    )}
                                </div>
                                <button onClick={() => handleSubmit()}>Ch???nh s???a</button>
                            </div>
                        </div>

                        <div className={cx('order-summary')}>
                            <h4>H??a ????n</h4>
                            <div className={cx('wrapper-list')}>
                                <div className={cx('item')}>
                                    <p>Ng??y ?????t</p>
                                    <span>{state.date}</span>
                                </div>
                                <div className={cx('item')}>
                                    <p>Th???i gian ?????t</p>
                                    <span>{state.time}</span>
                                </div>
                                <div className={cx('item')}>
                                    <p>T???ng h??a ????n</p>
                                    <span>
                                        <NumericFormat
                                            className="currency"
                                            type="text"
                                            value={state.total}
                                            displayType="text"
                                            thousandSeparator={true}
                                            suffix={'??'}
                                        />
                                    </span>
                                </div>
                                <div className={cx('item')}>
                                    <p>Ph?? v???n chuy???n</p>
                                    <span>Mi???n ph??</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('total')}>
                            <h4>T???ng thanh to??n</h4>
                            <span>
                                <NumericFormat
                                    className="currency"
                                    type="text"
                                    value={state.total}
                                    displayType="text"
                                    thousandSeparator={true}
                                    suffix={'??'}
                                />
                            </span>
                        </div>
                        <div className={cx('delivery')}>
                            <h4>Th??ng tin v???n chuy???n</h4>
                            <div className={cx('wrapper-list')}>
                                <div className={cx('item')}>
                                    <p>?????i ch???:</p>
                                    <span>{state.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetail;
