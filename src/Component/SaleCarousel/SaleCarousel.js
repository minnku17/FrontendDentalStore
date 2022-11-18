import className from 'classnames/bind';
import React from 'react';

import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import styles from './SaleCarousel.module.scss';
import images from '~/assets/images';
import Product from '../Product/Product';

const cx = className.bind(styles);

function SaleCarousel() {
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
                    slidesToShow: 3,
                    slidesToScroll: 3,
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

    return (
        <div className={cx('wrapper')}>
            <h1>☘ SIÊU SALE THIẾT BỊ☘</h1>
            <div className={cx('list-product')}>
                <Slider {...settings}>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                </Slider>
            </div>
        </div>
    );
}
export default SaleCarousel;
