import className from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { NumericFormat } from 'react-number-format';

import images from '~/assets/images';

import styles from './FilterCategory.module.scss';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
const cx = className.bind(styles);

function FilterCategory() {
    const currentUser = useSelector((state) => state.auth.loginCustomer?.currentCustomer?.user);
    let [toggleCategory, setToggleCategory] = useState(true);
    let [togglePrice, setTogglePrice] = useState(true);
    let [toggleBrand, setToggleBrand] = useState(true);
    let [loadMore, setLoadMore] = useState(false);
    let [loadPrice, setLoadPrice] = useState(false);
    let [loadBrand, setLoadBrand] = useState(false);

    const viewDetailProduct = (id) => {};

    return (
        <>
            <div className={cx('wrapper')}>
                <Link to="#">
                    <div className={cx('category')}>Trang chủ</div>
                </Link>
                <div className={cx('wrapper-content')}>
                    <div className={cx('sidebar')}>
                        <div className={cx('filter')}>
                            <div className={cx('top')}>
                                <h3>Bộ lọc (2)</h3>
                                <button>Xóa hết</button>
                            </div>
                            <div className={cx('selectedCate')}>
                                <p>
                                    Cements <span>x</span>
                                </p>
                                <p>
                                    Cementsjhaijdhjahdjajdahjk <span>x</span>
                                </p>
                                <p>
                                    Cements <span>x</span>
                                </p>
                            </div>
                        </div>
                        <span className={cx('line')}></span>
                        <div className={cx('wrapper-list-category')}>
                            <div onClick={() => setToggleCategory(!toggleCategory)} className={cx('btn-category')}>
                                <span>Danh mục</span>
                                <span>{toggleCategory === true ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
                            </div>
                            {toggleCategory === true && (
                                <div className={cx('list-category')}>
                                    <div
                                        className={cx('item-category')}
                                        style={{
                                            overflow: loadMore === false ? 'hidden' : 'hidden',
                                            height: loadMore === false ? '126px' : 'fit-content',
                                        }}
                                    >
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <button
                                            onClick={() => {
                                                setLoadMore(!loadMore);
                                            }}
                                        >
                                            Thu gọn
                                            <span>
                                                {loadMore === true ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                            </span>
                                        </button>
                                    </div>
                                    <button
                                        style={{ display: loadMore === true ? 'none' : 'block' }}
                                        onClick={() => {
                                            setLoadMore(!loadMore);
                                        }}
                                    >
                                        Xem thêm
                                        <span>{loadMore === true ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <span className={cx('line')}></span>
                        <div className={cx('wrapper-list-category')}>
                            <div onClick={() => setTogglePrice(!togglePrice)} className={cx('btn-category')}>
                                <span>Khoảng giá</span>
                                <span>{togglePrice === true ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
                            </div>
                            {togglePrice === true && (
                                <div className={cx('list-category')}>
                                    <div
                                        className={cx('item-category')}
                                        style={{
                                            overflow: loadPrice === false ? 'hidden' : 'hidden',
                                            height: loadPrice === false ? '126px' : 'fit-content',
                                        }}
                                    >
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <label className={cx('container')}>
                                            <input type="checkbox" />
                                            <span className={cx('checkmark')}></span>
                                            Two
                                        </label>
                                        <button
                                            onClick={() => {
                                                setLoadPrice(!loadPrice);
                                            }}
                                        >
                                            Thu gọn
                                            <span>
                                                {loadPrice === true ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                            </span>
                                        </button>
                                    </div>
                                    <button
                                        style={{ display: loadPrice === true ? 'none' : 'block' }}
                                        onClick={() => {
                                            setLoadPrice(!loadPrice);
                                        }}
                                    >
                                        Xem thêm
                                        <span>{loadPrice === true ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <span className={cx('line')}></span>
                        <div className={cx('wrapper-list-brand')}>
                            <div onClick={() => setToggleBrand(!toggleBrand)} className={cx('btn-brand')}>
                                <span>Thương hiệu</span>
                                <span>{toggleBrand === true ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
                            </div>
                            {toggleBrand === true && (
                                <div className={cx('list-brand')}>
                                    <div className={cx('item')}>
                                        <img src={images.noImage} alt="" />
                                        <img src={images.noImage} alt="" />
                                        <img src={images.noImage} alt="" />
                                        <img src={images.noImage} alt="" />
                                        <img src={images.noImage} alt="" />
                                        <img src={images.noImage} alt="" />
                                        <img src={images.noImage} alt="" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('header-list')}>
                            <div className={cx('top')}>
                                <p>Nha khoa tổng quát</p>
                                <span>(80 trên 80 sản phẩm)</span>
                            </div>
                            <div className={cx('bottom')}>
                                <div className={cx('bot-left')}>
                                    <span className={cx('text')}>Sắp xếp theo: </span>
                                    <div className={cx('list-btn')}>
                                        <button>Phổ biến</button>
                                        <button>Bán chạy</button>
                                        <button>Giảm giá nhiều</button>
                                        <button>Giá thấp</button>
                                        <button>Giá cao</button>
                                    </div>
                                </div>

                                <span className={cx('number-page')}>1/1</span>
                            </div>
                        </div>
                        <div className={cx('main-content')}>
                            {/* <div className={cx('wrapper')}> */}
                            {/* <div key={index}> */}
                            <div>
                                <div onClick={() => viewDetailProduct()} className={cx('wrapper')}>
                                    <div className={cx('top')}>
                                        {/* <img src={item.image ? item.image : images.product1} alt="" /> */}
                                        <img src={images.product1} alt="" />
                                        <div style={{ display: 'none' }} className={cx('sale')}>
                                            0
                                        </div>
                                        {/* {item.discount > 0 ? (
                                                <div className={cx('sale')}>{`-${item.discount}%`}</div>
                                            ) : (
                                                <div
                                                    style={{ display: 'none' }}
                                                    className={cx('sale')}
                                                >{`-${item.discount}%`}</div>
                                            )} */}
                                        <span className={cx('unit')}>bộ</span>
                                        <div className={cx('event')}>
                                            <img src={images.eventsale} alt="" />
                                        </div>
                                    </div>

                                    <div className={cx('bottom')}>
                                        {/* <p>{item.title}</p> */}
                                        <p>aaaaaaaaaaaaaaaaaaaaaa</p>
                                        <div className={cx('wrapper-price')}>
                                            <div className={cx('price')}>
                                                <NumericFormat
                                                    className="currency"
                                                    type="text"
                                                    // value={item.price * ((100 - item.discount) / 100)}
                                                    value="10"
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={'đ'}
                                                />
                                            </div>
                                            <div className={cx('old-price')}>
                                                <NumericFormat
                                                    className="currency"
                                                    type="text"
                                                    // value={item.price}
                                                    value="12212222"
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={'đ'}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('wrapper-brand')}>
                                            {/* <div className={cx('brand')}>{item.brand}</div> */}
                                            <div className={cx('brand')}>coxo</div>
                                            {/* <div className={cx('sold')}>Đã bán: {item.sold ? item.sold : 0}</div> */}
                                            <div className={cx('sold')}>Đã bán: 0</div>
                                        </div>
                                        <div className={cx('gift')}>
                                            <CardGiftcardIcon className={cx('icon')} />
                                            <span>
                                                Mua 1 tặng Tay khoan nhanh đèn Led đuôi Coupling + Trâm máy - PROTAPER +
                                                Côn Protaper Gapadent (SL có hạn)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterCategory;
