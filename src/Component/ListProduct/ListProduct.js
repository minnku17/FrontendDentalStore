import className from 'classnames/bind';
import React, { useEffect, useState } from 'react';

import styles from './ListProduct.module.scss';
import images from '~/assets/images';
import Product from '../Product/Product';
import { NumericFormat } from 'react-number-format';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const cx = className.bind(styles);

function ListProduct(data) {
    const [allProducts, setAllProduct] = useState();
    useEffect(() => {
        // setAllProduct(data.data);
    }, [data]);
    const viewDetailProduct = (id) => {
        console.log(id);
    };
    return (
        <div className={cx('wrapper')}>
            <p>Gợi ý hôm nay</p>

            <div className={cx('list')}>
                {/* {allProducts
                    ? allProducts?.map((item, index) => {
                          return (
                              <div key={index}>
                                  <div onClick={() => viewDetailProduct(item.id)} className={cx('wrapper')}>
                                      <div className={cx('top')}>
                                          <img src={item.photo ? item.photo : images.product1} alt="" />
                                          {item.discount > 0 ? (
                                              <div className={cx('sale')}>{`-${item.discount}%`}</div>
                                          ) : (
                                              <div
                                                  style={{ display: 'none' }}
                                                  className={cx('sale')}
                                              >{`-${item.discount}%`}</div>
                                          )}
                                          <span className={cx('unit')}>bộ</span>
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
                                              <div className={cx('brand')}>{item.Brand.title}</div>
                                              <div className={cx('sold')}>Đã bán: {item.sold ? item.sold : 0}</div>
                                          </div>
                                          <div className={cx('gift')}>
                                              <CardGiftcardIcon className={cx('icon')} />
                                              <span>
                                                  Mua 1 tặng Tay khoan nhanh đèn Led đuôi Coupling + Trâm máy - PROTAPER
                                                  + Côn Protaper Gapadent (SL có hạn)
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : ''} */}
            </div>
        </div>
    );
}
export default ListProduct;
