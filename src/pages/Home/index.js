import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import images from '~/assets/images';
import Banner from '~/Component/Banner/Banner';
import BookingSchedules from '~/Component/BookingSchedules/BookingSchedules';
import CategoryFeature from '~/Component/CategoryFeature/CategoryFeature';
import ListProduct from '~/Component/ListProduct/ListProduct';
import SaleCarousel from '~/Component/SaleCarousel/SaleCarousel';
import Sidebar from '~/layouts/DefaultLayout/Sidebar';

import styles from './Home.module.scss';

const cx = className.bind(styles);

function Home() {
    console.log('scroll', window.scrollY);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('nav-banner')}>
                    <div className={cx('side-bar')}>
                        <Sidebar />
                    </div>
                    <div className={cx('banner-left')}>
                        <Banner />
                    </div>
                    <div className={cx('banner-right')}>
                        <div className={cx('top')}>
                            <div className={cx('img-left')}>
                                <img src={images.banner1} alt="" />
                            </div>
                            <div className={cx('img-right')}>
                                <img src={images.banner2} alt="" />
                            </div>
                        </div>
                        <div className={cx('bottom')}>
                            <div className={cx('img-left')}>
                                <img src={images.banner3} alt="" />
                            </div>
                            <div className={cx('img-right')}>
                                <img src={images.banner4} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('booking-schedules')}>
                    <BookingSchedules />
                </div>
                <div className={cx('banner-sale')}>
                    <img src={images.bannerSale} alt="" />
                </div>
                <div className={cx('banner-list')}>
                    <div className={cx('item')}>
                        <img src={images.bannerSale4} alt="" />
                    </div>
                    <div className={cx('item')}>
                        <img src={images.bannerSale5} alt="" />
                    </div>
                    <div className={cx('item')}>
                        <img src={images.bannerSale6} alt="" />
                    </div>
                </div>
                <div className={cx('sale-device')}></div>
                <SaleCarousel />
                <div className={cx('banner-sale-2')}>
                    <div className={cx('left')}>
                        <img src={images.bannerSale7} alt="" />
                    </div>
                    <div className={cx('right')}>
                        <img src={images.bannerSale8} alt="" />
                    </div>
                </div>
                <div className={cx('banner-sale-3')}>
                    <div className={cx('banner-item')}>
                        <img src={images.bannerSale9} alt="" />
                    </div>
                    <div className={cx('banner-item')}>
                        <img src={images.bannerSale10} alt="" />
                    </div>
                    <div className={cx('banner-item')}>
                        <img src={images.bannerSale11} alt="" />
                    </div>
                </div>
                <SaleCarousel />
                <div className={cx('banner-sale-4')}>
                    <div className={cx('banner-item')}>
                        <img src={images.bannerSale9} alt="" />
                    </div>
                    <div className={cx('banner-item')}>
                        <img src={images.bannerSale10} alt="" />
                    </div>
                    <div className={cx('banner-item')}>
                        <img src={images.bannerSale11} alt="" />
                    </div>
                    <div className={cx('banner-item')}>
                        <img src={images.bannerSale11} alt="" />
                    </div>
                </div>
                <CategoryFeature />
                <ListProduct />
            </div>
        </>
    );
}

export default Home;
