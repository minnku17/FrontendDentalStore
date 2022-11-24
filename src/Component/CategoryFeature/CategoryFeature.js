import className from 'classnames/bind';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import { getAllCategory } from '~/redux/apiReques';

import styles from './CategoryFeature.module.scss';

const cx = className.bind(styles);

function CategoryFeature() {
    const allCategory = useSelector((state) => state.categories.allCategoryCustomer.categories?.data.data);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchApi() {
            await getAllCategory(dispatch);
        }

        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h1>danh mục nổi bật</h1>
            <div className={cx('list-cat')}>
                {allCategory &&
                    allCategory.map((item, index) => {
                        return (
                            <div className={cx('item')} key={index}>
                                <img src={item.Image.photo ? item.Image.photo : images.noImage} alt="" />
                                <p>{item.title}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
export default CategoryFeature;
