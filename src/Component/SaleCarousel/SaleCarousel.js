import className from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';

import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import styles from './SaleCarousel.module.scss';
import images from '~/assets/images';
import Product from '../Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductLittleInfo } from '~/redux/apiReques';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { Buffer } from 'buffer';

const cx = className.bind(styles);

function SaleCarousel(data, sale) {
    const navigate = useNavigate();

    const [allProduct, setAllProduct] = useState();
    useEffect(() => {
        if (data.sale === true) {
            if (data.data) {
                let productSale = data.data.filter((item) => {
                    return item.discount > 0;
                });
                setAllProduct(productSale);
            }
        } else {
            setAllProduct(data.data);
        }
    }, [data, sale]);
    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 6,
        speed: 1000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const viewDetailProduct = (id) => {
        navigate(`/product-detail/${id}`);
    };

    return (
        <div className={cx('wrapper')}>
            <h1>☘SIÊU SALE THIẾT BỊ☘</h1>
            <div className={cx('list-product')}>
                <Slider {...settings}>
                    {allProduct
                        ? allProduct?.map((item, index) => {
                              return (
                                  <div key={index}>
                                      <div onClick={() => viewDetailProduct(item.id)} className={cx('wrapper')}>
                                          <div className={cx('top')}>
                                              <img src={item.image ? item.image : images.product1} alt="" />
                                              {item.discount > 0 ? (
                                                  <div className={cx('sale')}>{`-${item.discount}%`}</div>
                                              ) : (
                                                  <div
                                                      style={{ display: 'none' }}
                                                      className={cx('sale')}
                                                  >{`-${item.discount}%`}</div>
                                              )}
                                              <span className={cx('unit')}>{item.unit}</span>
                                              <div className={cx('event')}>
                                                  <img src={images.eventsale} alt="" />
                                              </div>
                                          </div>

                                          <div className={cx('bottom')}>
                                              <p>{item.title}</p>
                                              <div className={cx('wrapper-price')}>
                                                  <div className={cx('price')}>
                                                      <NumericFormat
                                                          className="currency"
                                                          type="text"
                                                          value={item.price * ((100 - item.discount) / 100)}
                                                          displayType="text"
                                                          thousandSeparator={true}
                                                          suffix={'đ'}
                                                      />
                                                  </div>
                                                  <div className={cx('old-price')}>
                                                      <NumericFormat
                                                          className="currency"
                                                          type="text"
                                                          value={item.price}
                                                          displayType="text"
                                                          thousandSeparator={true}
                                                          suffix={'đ'}
                                                      />
                                                  </div>
                                              </div>
                                              <div className={cx('wrapper-brand')}>
                                                  <div className={cx('brand')}>{item.brand}</div>
                                                  <div className={cx('sold')}>Đã bán: {item.sold ? item.sold : 0}</div>
                                              </div>
                                              <div className={cx('gift')}>
                                                  <CardGiftcardIcon className={cx('icon')} />
                                                  <span>
                                                      Mua 1 tặng Tay khoan nhanh đèn Led đuôi Coupling + Trâm máy -
                                                      PROTAPER + Côn Protaper Gapadent (SL có hạn)
                                                  </span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              );
                          })
                        : ''}
                </Slider>
            </div>
        </div>
    );
}
export default SaleCarousel;
