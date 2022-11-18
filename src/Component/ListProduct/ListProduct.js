import className from 'classnames/bind';
import React from 'react';

import styles from './ListProduct.module.scss';
import images from '~/assets/images';
import Product from '../Product/Product';

const cx = className.bind(styles);

function ListProduct() {
    return (
        <div className={cx('wrapper')}>
            <p>Gợi ý hôm nay</p>

            <div className={cx('list')}>
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </div>
    );
}
export default ListProduct;
