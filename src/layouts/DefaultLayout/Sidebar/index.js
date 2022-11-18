import className from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Wrapper as PopperWrapper } from '~/Component/Popper';
import DiscountIcon from '@mui/icons-material/Discount';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { useEffect, useState } from 'react';
import { axiosMiddle } from '~/services/axiosJWT';
import { getListParentCategory } from '~/redux/apiReques';
import Tippy from '@tippyjs/react/headless';

import 'tippy.js/dist/tippy.css';

function Sidebar() {
    const cx = className.bind(styles);

    let [listParent, setListParent] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchApi() {
            let res = await getListParentCategory(dispatch);
            setListParent(res.data);
        }
        fetchApi();
    }, []);

    console.log(listParent);
    return (
        <aside className={cx('wrapper')}>
            <PopperWrapper>
                {listParent?.map((item, index) => {
                    return (
                        <Tippy
                            className={cx('tippy')}
                            interactive
                            delay={300}
                            render={(attrs) => (
                                <div className={cx('category-dropdown')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper className={cx('popper-wrapper')}>
                                        <>hello</>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <div className={cx('row-item')}>
                                <div className={cx('title')}>{item.title}</div>
                                <div className={cx('icon')}>
                                    <KeyboardArrowRightIcon />
                                </div>
                            </div>
                        </Tippy>
                    );
                })}
            </PopperWrapper>
        </aside>
    );
}

export default Sidebar;
