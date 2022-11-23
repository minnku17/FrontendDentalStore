import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import images from '../../assets/images';
import 'react-image-gallery/styles/scss/image-gallery.scss';

import styles from './ProductDetail.module.scss';
import ImageGallery from 'react-image-gallery';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SaleCarousel from '~/Component/SaleCarousel/SaleCarousel';
import TabsStyle from '~/Component/TabsStyle/TabsStyle';
import { getProductInfoById } from '~/redux/apiReques';
import { useDispatch } from 'react-redux';
const cx = className.bind(styles);

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ProductDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    let [images, setImages] = useState([]);
    const [state, setState] = useState({});
    useEffect(() => {
        async function fetchApi() {
            let res = await getProductInfoById(dispatch, id);
            if (res.Images) {
                let arr = [];

                res.Images.map((item) => {
                    let obj = {};
                    obj.original = item.photo;
                    obj.thumbnail = item.photo;

                    arr.push(obj);
                    setImages(arr);
                });
            }
            console.log(res);
        }
        fetchApi();
    }, []);

    let [quality, setQuality] = useState(0);

    const handleIncrease = () => {
        setQuality((quality) => (quality += 1));
    };

    const handleDecrease = () => {
        if (quality < 1) return;
        setQuality((quality) => (quality -= 1));
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <Link to="#">
                    <div className={cx('category')}>Trang chủ</div>
                </Link>
                <div className={cx('product-main-content')}>
                    <div className={cx('content-left')}>
                        <div className={cx('product-image')}>
                            <ImageGallery items={images} />
                        </div>
                    </div>
                    <div className={cx('content-right')}>
                        <div className={cx('title')}>Tay khoan nhanh Coxo - Soco - Cái</div>
                        <div className={cx('brand')}>
                            Xuất xứ:
                            <Link to="#">
                                <span> Coxo - Trung Quốc</span>
                            </Link>
                        </div>
                        <div className={cx('rate-all')}>
                            <div className={cx('rating')}>
                                <StarBorderIcon className={cx('icon')} />
                                <StarBorderIcon className={cx('icon')} />
                                <StarBorderIcon className={cx('icon')} />
                                <StarBorderIcon className={cx('icon')} />
                                <StarBorderIcon className={cx('icon')} />
                            </div>
                            <div className={cx('rate-number')}>(1 đánh giá)</div>
                            <span> | </span>
                            <div className={cx('sold')}>Đã bán 456</div>
                        </div>
                        <div className={cx('line')}></div>
                        <div className={cx('price-rate')}>
                            <div className={cx('price')}>
                                <div className={cx('price-now')}>1.485.000đ</div>
                                <div className={cx('price-old')}>
                                    <span className={cx('price-label')}>-1%</span>
                                    <div className={cx('price-old-l')}>1.500.000đ</div>
                                </div>
                            </div>
                            <div className={cx('rate')}>
                                <span className={cx('title')}>Bạn thấy giá này?</span>
                                <div className={cx('like')}>
                                    <ThumbUpOffAltIcon className={cx('icon-like')} />
                                    <span> Hợp lý</span>
                                </div>
                                <div className={cx('dislike')}>
                                    <ThumbDownOffAltIcon className={cx('icon-dislike')} />
                                    <span> Cao</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('line')}></div>
                        <div className={cx('wrapper-gift')}>
                            <div className={cx('gift')}>
                                <LocalShippingIcon className={cx('icon')} />
                                <span className={cx('title')}>Cho đơn hàng từ 2.000.000đ</span>
                            </div>
                            <div className={cx('gift')}>
                                <CheckCircleIcon className={cx('icon')} />
                                <span className={cx('title')}>
                                    Tặng Chỉ khâu không tiêu Black Silk đơn từ 3.000.000đ
                                </span>
                            </div>
                            <div className={cx('gift')}>
                                <CheckCircleIcon className={cx('icon')} />
                                <span className={cx('title')}>
                                    Tặng Chỉ khâu không tiêu Black Silk đơn từ 3.000.000đ
                                </span>
                            </div>
                            <div className={cx('gift')}>
                                <CheckCircleIcon className={cx('icon')} />
                                <span className={cx('title')}>
                                    Tặng Chỉ khâu không tiêu Black Silk đơn từ 3.000.000đ
                                </span>
                            </div>
                            <div className={cx('gift')}>
                                <CheckCircleIcon className={cx('icon')} />
                                <span className={cx('title')}>
                                    Tặng Chỉ khâu không tiêu Black Silk đơn từ 3.000.000đ
                                </span>
                            </div>
                            <div className={cx('gift')}>
                                <CheckCircleIcon className={cx('icon')} />
                                <span className={cx('title')}>
                                    Tặng Chỉ khâu không tiêu Black Silk đơn từ 3.000.000đ
                                </span>
                            </div>
                            <div className={cx('gift')}>
                                <CheckCircleIcon className={cx('icon')} />
                                <span className={cx('title')}>
                                    Tặng Chỉ khâu không tiêu Black Silk đơn từ 3.000.000đ
                                </span>
                            </div>
                            <div className={cx('gift')}>
                                <CheckCircleIcon className={cx('icon')} />
                                <span className={cx('title')}>
                                    Tặng Chỉ khâu không tiêu Black Silk đơn từ 3.000.000đ
                                </span>
                            </div>
                            <div className={cx('gift')}>
                                <CheckCircleIcon className={cx('icon')} />
                                <span className={cx('title')}>
                                    Tặng Chỉ khâu không tiêu Black Silk đơn từ 3.000.000đ
                                </span>
                            </div>
                        </div>
                        <div className={cx('table-price')}>
                            <div className={cx('table-wrapper')}>
                                <div>
                                    <div className={cx('tr-title')}>
                                        <div className={cx('name-product')}>Tên sản phẩm</div>
                                        <div className={cx('unit-product')}>Đơn vị</div>
                                        <div className={cx('price-product')}>Giá</div>
                                        <div className={cx('quality-product')}>Số lượng</div>
                                    </div>
                                    <div className={cx('tr-value')}>
                                        <div className={cx('name-product')}>Tay khoan Soco - không đèn</div>
                                        <div className={cx('unit-product')}>Đơn vị</div>
                                        <div className={cx('price-product')}>Giá</div>
                                        <div className={cx('quality-product')}>
                                            <button onClick={() => handleDecrease()}>
                                                <RemoveIcon />
                                            </button>
                                            <input value={quality} readOnly />
                                            <button onClick={() => handleIncrease()}>
                                                <AddIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('price-total')}>
                                <p>
                                    Tổng tiền: <span className={cx('total')}>0đ</span>
                                </p>
                                <p>
                                    Số lượng: <span>{quality}</span>
                                </p>
                                <button>
                                    <ShoppingCartIcon /> <span>thêm vào giỏ hàng</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <SaleCarousel />
                <div className={cx('description')}>
                    <TabsStyle />
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
