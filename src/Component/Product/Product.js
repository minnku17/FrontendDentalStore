import className from 'classnames/bind';
import React from 'react';

import styles from './Product.module.scss';
import images from '~/assets/images';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const cx = className.bind(styles);

function Product() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <img src={images.product1} alt="" />
                <div className={cx('sale')}>-17%</div>
                <span className={cx('unit')}>bộ</span>
                <div className={cx('event')}>
                    <img src={images.eventsale} alt="" />
                </div>
            </div>

            <div className={cx('bottom')}>
                <p> Máy điều trị nội nha R-SMART MINI </p>
                <div className={cx('wrapper-price')}>
                    <div className={cx('price')}>10.000.000đ</div>
                    <div className={cx('old-price')}>12.000.000đ</div>
                </div>
                <div className={cx('wrapper-brand')}>
                    <div className={cx('brand')}>Coxo</div>
                    <div className={cx('sold')}>Đã bán 2</div>
                </div>
                <div className={cx('gift')}>
                    <CardGiftcardIcon className={cx('icon')} />
                    <span>Mua 1 tặng Tay khoan nha...</span>
                </div>
            </div>
        </div>
    );
}
export default Product;
