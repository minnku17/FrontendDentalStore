import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import 'tippy.js/dist/tippy.css';
import 'react-image-gallery/styles/scss/image-gallery.scss';

import images from '~/assets/images';

import styles from './ProductDetail.module.scss';
import ImageGallery from 'react-image-gallery';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SaleCarousel from '~/Component/SaleCarousel/SaleCarousel';
import TabsStyle from '~/Component/TabsStyle/TabsStyle';
import { useDispatch } from 'react-redux';
import { getProductInfo } from '~/services';
import { getAllProductLittleInfo } from '~/redux/apiReques';
import { addProductToCart } from '~/redux/requestApp';
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
    let [imageProduct, setImageProduct] = useState([]);
    const [state, setState] = useState({
        title: '',
        rate: 4,
        sold: 0,
        unit: '',
        price: 0,
        priceSale: 0,
        discount: 0,

        category: '',
        category_id: 0,
        allReviews: [],
        brand: '',
        brand_id: 0,
    });
    const [stateHtml, setStateHtml] = useState({
        description: '',
        assign: '',
        feature: '',
        specification: '',
    });
    let [total, setTotal] = useState(0);
    const [allProduct, setAllProduct] = useState();
    const [comment, setComment] = useState([]);

    useEffect(() => {
        async function fetchApi() {
            let res = await getAllProductLittleInfo(dispatch);
            setAllProduct(res);
        }
        fetchApi();
    }, []);
    useEffect(() => {
        async function fetchApi() {
            let res = await getProductInfo(id);
            let dataProduct = res.data.dataProduct;
            let infoUser = res.data.InfoUserReview;
            if (dataProduct.Images) {
                let arr = [];

                dataProduct.Images.map((item) => {
                    let obj = {};
                    obj.original = item.photo;
                    obj.thumbnail = item.photo;

                    arr.push(obj);
                    setImageProduct(arr);
                });
            }
            setComment(res.data.InfoUserReview);
            setState({
                ...state,
                title: dataProduct.title,
                rate: infoUser[0]?.Review.rate,
                allReviews: dataProduct.Reviews,
                brand: dataProduct.Brand.title,
                sold: dataProduct.sold,
                price: dataProduct.price,
                priceSale: dataProduct.price * ((100 - dataProduct.discount) / 100),
                unit: dataProduct.unit_of_product,
                discount: dataProduct.discount,
                type: dataProduct.type,
            });
            setStateHtml({
                description: dataProduct.Markdown.descriptionHtml,
                assign: dataProduct.Markdown.assignHtml,
                feature: dataProduct.Markdown.featureHtml,
                specification: dataProduct.Markdown.specificationHtml,
            });
        }
        fetchApi();
    }, []);

    let [quality, setQuality] = useState(0);

    const handleIncrease = () => {
        setQuality((quality) => (quality += 1));
        if (state.discount > 0) {
            setTotal((priceSale) => (priceSale += state.priceSale));
        } else {
            setTotal((price) => (price += state.price));
        }
    };

    const handleDecrease = () => {
        if (quality < 1) return;
        setQuality((quality) => (quality -= 1));

        if (state.discount > 0) {
            setTotal((priceSale) => (priceSale -= state.priceSale));
        } else {
            setTotal((price) => (price -= state.price));
        }
    };

    const dataTabs = {
        Html: stateHtml,
        title: state.title,
        brand: state.brand,
        type: state.type,
        unit: state.unit,
    };

    const handleStar = (star) => {
        if (star) {
            let arr = [];

            for (let i = 1; i <= star; i++) {
                arr.push(<StarIcon />);
            }
            return arr;
        }
    };

    const handleAddProductToCart = async () => {
        let data = {};
        data.id = id;
        data.title = state.title;
        data.quality = quality;
        data.discount = state.discount;
        data.price = state.price;
        data.priceSale = state.priceSale;
        data.image = imageProduct[0].original;

        console.log(data);

        let res = await addProductToCart(dispatch, data);
        console.log(res);
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
                            <ImageGallery items={imageProduct} />
                        </div>
                    </div>
                    <div className={cx('content-right')}>
                        <div className={cx('title')}>{`${state.title} - ${state.brand} - ${state.unit}`}</div>
                        <div className={cx('brand')}>
                            Xuất xứ:
                            <Link to="#">
                                <span>{` ${state.brand} `}</span>
                            </Link>
                        </div>
                        <div className={cx('rate-all')}>
                            <div className={cx('rating')}>
                                <StarIcon className={cx('icon')} />
                                <StarIcon className={cx('icon')} />
                                <StarIcon className={cx('icon')} />
                                <StarIcon className={cx('icon')} />
                                <StarIcon className={cx('icon')} />
                            </div>
                            <div className={cx('rate-number')}>{`${comment.length} đánh giá`}</div>
                            <span> | </span>
                            <div className={cx('sold')}>{`Đã bán ${state.sold ? state.sold : 0}`}</div>
                        </div>
                        <div className={cx('line')}></div>
                        <div className={cx('price-rate')}>
                            <div className={cx('price')}>
                                <div className={cx('price-now')}>
                                    <NumericFormat
                                        className="currency"
                                        type="text"
                                        value={state.priceSale}
                                        displayType="text"
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                    />
                                </div>
                                <div className={cx('price-old')}>
                                    <span className={cx('price-label')}>{`-${state.discount}%`}</span>
                                    <div className={cx('price-old-l')}>
                                        <NumericFormat
                                            className="currency"
                                            type="text"
                                            value={state.price}
                                            displayType="text"
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    </div>
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
                                        <div className={cx('name-product')}>{state.title}</div>
                                        <div className={cx('unit-product')}>{state.unit}</div>
                                        <div className={cx('price-product')}>
                                            <NumericFormat
                                                className="currency"
                                                type="text"
                                                value={state.priceSale}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={'đ'}
                                            />
                                        </div>
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
                                    Tổng tiền:{' '}
                                    <span className={cx('total')}>
                                        {
                                            <NumericFormat
                                                className="currency"
                                                type="text"
                                                value={total}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={'đ'}
                                            />
                                        }
                                    </span>
                                </p>
                                <p>
                                    Số lượng: <span>{quality}</span>
                                </p>
                                <button onClick={() => handleAddProductToCart()}>
                                    <ShoppingCartIcon /> <span>thêm vào giỏ hàng</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <SaleCarousel data={allProduct} />
                <div className={cx('description')}>
                    <TabsStyle data={dataTabs} />
                </div>
                <div className={cx('review')}>
                    <h1>ĐÁNH GIÁ NHA SĨ</h1>
                    <div className={cx('wrapper')}>
                        <div className={cx('content-top')}></div>
                        <div className={cx('content-bottom')}>
                            {comment &&
                                comment?.map((item, index) => {
                                    return (
                                        <>
                                            <div key={index} className={cx('comment')}>
                                                <div className={cx('left')}>
                                                    <img
                                                        src={item.Image.photo ? item.Image.photo : images.noImage}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className={cx('right')}>
                                                    <span>{`*** ${item.firstName} - ${item.Review.title}`}</span>
                                                    <div className={cx('star')}>{handleStar(item.Review.rate)}</div>
                                                    <div className={cx('desc')}>{item.Review.description}</div>
                                                    <div className={cx('line')}></div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
