import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DiscountIcon from '@mui/icons-material/Discount';
import 'tippy.js/dist/tippy.css';
import 'react-image-gallery/styles/scss/image-gallery.scss';

import images from '~/assets/images';

import styles from './CheckOut.module.scss';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '~/redux/requestApp';
const cx = className.bind(styles);

function CheckOut() {
    const productCart = useSelector((state) => state.cartRedux.cart?.arrCart);

    const dispatch = useDispatch();
    let [listProduct, setListProduct] = useState([]);

    console.log(listProduct);

    let [render, setRender] = useState(0);

    useEffect(() => {
        if (productCart.length > 0) {
            setListProduct(productCart);
        } else {
            setRender(render++);
        }
    }, [productCart]);

    const handleIncrease = async (id) => {
        let arr = [...listProduct];

        arr.map(async (item, index) => {
            let data = {
                id: id,
                title: item.title,
                quality: item.quality,
                total: item.total,
                discount: item.discount,
                price: item.price,
                brand: item.brand,
                unit: item.unit,
                priceSale: item.priceSale,
                image: item.image,
                writable: true,
            };
            if (item.id === id) {
                const increase = () => {
                    let sum = item.quality;
                    sum += 1;
                    return sum;
                };
                data.quality = increase();

                if (item.discount > 0) {
                    const sumPriceSale = () => {
                        let sum = item.total;
                        sum += item.priceSale;

                        return sum;
                    };
                    data.total = sumPriceSale();
                    console.log(item.total);
                } else {
                    const sumPrice = () => {
                        let sum = item.total;
                        sum += item.price;

                        return sum;
                    };
                    data.total = sumPrice();
                }
                arr[index] = data;
                await addProductToCart(dispatch, arr);
                return item;
            }
        });
    };

    const handleDecrease = (id) => {
        listProduct.map(async (item, index) => {
            let arr = [...listProduct];
            let data = {
                id: id,
                title: item.title,
                quality: item.quality,
                brand: item.brand,
                unit: item.unit,
                total: item.total,
                discount: item.discount,
                price: item.price,
                priceSale: item.priceSale,
                image: item.image,

                writable: true,
            };
            if (item.id === id) {
                if (item.quality === 1) {
                    arr = [...arr.slice(0, index), ...arr.slice(index + 1)];
                    setListProduct(arr);
                    await addProductToCart(dispatch, arr);
                    return;
                }
                const decrease = () => {
                    let sum = item.quality;
                    sum -= 1;
                    return sum;
                };
                data.quality = decrease();

                if (item.discount > 0) {
                    const subPriceSale = () => {
                        let sub = item.total;
                        sub -= item.priceSale;

                        return sub;
                    };
                    data.total = subPriceSale();
                    console.log(item.total);
                } else {
                    const subPrice = () => {
                        let sub = item.total;
                        sub -= item.price;

                        return sub;
                    };
                    data.total = subPrice();
                }
                arr[index] = data;
                await addProductToCart(dispatch, arr);
                return item;
            }
        });
    };

    const handleTotal = () => {
        let arr = [];
        listProduct.forEach((item) => {
            arr.push(item.total);
        });
        if (arr.length > 0) {
            return arr.reduce((a, b) => {
                return a + b;
            });
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <Link to={config.routes.home}>
                    <div className={cx('category')}>Trang chủ</div>
                </Link>
                <div className={cx('main-content')}>
                    <div className={cx('content-left')}>
                        <div className={cx('top-left')}>
                            <h1>Thông tin giỏ hàng</h1>
                            <span className={cx('trick')}>
                                Mẹo: nhấn nút <span className={cx('red')}>(-)</span> màu đỏ để xóa sản phẩm
                            </span>
                            {listProduct && listProduct.length > 0 ? (
                                listProduct.map((item, index) => {
                                    return (
                                        <>
                                            <div key={index} className={cx('product')}>
                                                <img src={item.image ? item.image : images.noImage} alt="" />
                                                <div className={cx('info')}>
                                                    <div className={cx('top-info')}>
                                                        {`${item.title} (${item.brand})`}
                                                    </div>
                                                    <span className={cx('line')}></span>
                                                    <div className={cx('body-info')}>
                                                        <p>{`${item.title} (${item.unit})`}</p>
                                                        <span className={cx('price')}>
                                                            <NumericFormat
                                                                className="currency"
                                                                type="text"
                                                                value={item.priceSale ? item.priceSale : item.price}
                                                                displayType="text"
                                                                thousandSeparator={true}
                                                                suffix={'đ'}
                                                            />
                                                        </span>
                                                        <div className={cx('action')}>
                                                            <button
                                                                onClick={() => handleDecrease(item.id)}
                                                                className={cx('button-decrease')}
                                                            >
                                                                <RemoveIcon />
                                                            </button>
                                                            <input value={item.quality} />
                                                            <button
                                                                onClick={() => handleIncrease(item.id)}
                                                                className={cx('button-increase')}
                                                            >
                                                                <AddIcon />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })
                            ) : (
                                <>
                                    <div className={cx('product')}></div>
                                </>
                            )}
                        </div>
                        <div className={cx('bottom-left')}>
                            <h1>Thông tin vận chuyển</h1>
                            <div className={cx('form')}>
                                <div className={cx('name')}>
                                    <input placeholder="Họ & Tên người nhận" />
                                </div>
                                <div className={cx('sdt-mail')}>
                                    <input className={cx('sdt')} placeholder="Số điện thoại" />
                                    <input className={cx('email')} placeholder="Email nhận thông tin đơn hàng" />
                                </div>
                                <div className={cx('address')}>
                                    <input placeholder="Địa chỉ nhận hàng (ghi cụ thể số nhà, tên đường, thành phố!!!)" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content-right')}>
                        <div className={cx('top-right')}>
                            <div className={cx('coupon')}>
                                <input placeholder="Nhập mã giảm giá (nếu có)" />

                                <DiscountIcon className={cx('icon')} />

                                <button>Áp dụng</button>
                            </div>
                        </div>
                        <div className={cx('bottom-right')}>
                            <h1>Thông tin đơn hàng</h1>
                            <div className={cx('total')}>
                                <p>Tổng tiền hàng</p>
                                <span>
                                    <NumericFormat
                                        className="currency"
                                        type="text"
                                        value={handleTotal() > 0 ? handleTotal() : 0}
                                        displayType="text"
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                    />
                                </span>
                            </div>
                            <span className={cx('line')}></span>
                            <div className={cx('shipping')}>
                                <p>Phí vận chuyển (GHTK)</p>
                                <span>0đ</span>
                            </div>
                            <span className={cx('line-t')}></span>

                            <div className={cx('pay')}>
                                <p>Tổng thanh toán</p>
                                <span className={cx('red')}>
                                    <NumericFormat
                                        className="currency"
                                        type="text"
                                        value={handleTotal() > 0 ? handleTotal() : 0}
                                        displayType="text"
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                    />
                                </span>
                            </div>
                            <textarea placeholder="Ghi chú đơn hàng" />
                            <div className={cx('button')}>
                                <button>Đặt mua</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckOut;
