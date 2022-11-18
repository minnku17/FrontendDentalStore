import className from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';

import SearchIcon from '@mui/icons-material/Search';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Person4Icon from '@mui/icons-material/Person4';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import styles from './Header.module.scss';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/Component/Popper';

import config from '~/config';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';
import { searchProduct } from '~/redux/apiReques';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { followCursor } from 'tippy.js';

const cx = className.bind(styles);

function Header() {
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);

    let [loading, setLoading] = useState('');
    let [searchResult, setSearchResult] = useState([]);

    const inputRef = useRef();

    const dispatch = useDispatch();

    const debounced = useDebounce(searchValue, 700);

    useEffect(() => {
        if (!debounced.trim()) {
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            await setTimeout(async () => {
                const result = await searchProduct(dispatch, debounced);
                setSearchResult(result);
                setShowResult(true);
                setLoading(false);
            }, 1000);
        };

        fetchApi();
    }, [debounced, searchValue]);

    console.log('render search', searchResult);

    const handleOnchange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <Link to={config.routes.home}>
                        <div className={cx('logo')}>
                            <img src={images.logo} alt="" />
                        </div>
                    </Link>
                </div>
                <div className={cx('cat')}>
                    <MenuOpenIcon className={cx('iconMenu')} />
                </div>
                <div className={cx('right')}>
                    <div className={cx('top')}>
                        <ul>
                            <li>Hotline: 1900 633 639</li>
                            <li>Lịch sử mua hàng</li>
                            <Link to={config.routes.customer_login}>
                                <li>Đăng nhập</li>
                            </Link>
                        </ul>
                    </div>
                    <div className={cx('bottom')}>
                        <HeadlessTippy
                            interactive
                            visible={showResult && searchResult.length > 0}
                            render={(attrs) => (
                                <div className={cx('search-result')} tabIndex="1" {...attrs}>
                                    <PopperWrapper>
                                        <h4 className={cx('key-search')}>Bạn đang tìm: {searchValue}</h4>
                                        {searchResult.map((result) => (
                                            <>
                                                <div className={cx('search-item')}>
                                                    <img src={result.photo ? result.photo : images.noImage} alt="" />
                                                    <span>{result.title}</span>
                                                </div>
                                                <div className={cx('line')}></div>
                                            </>
                                        ))}
                                    </PopperWrapper>
                                </div>
                            )}
                            onClickOutside={handleHideResult}
                        >
                            <div className={cx('search')}>
                                <SearchIcon className={cx('icon-search')} />
                                <input
                                    ref={inputRef}
                                    value={searchValue}
                                    onChange={(e) => {
                                        handleOnchange(e);
                                    }}
                                    placeholder="Tìm gì cũng có, thử ngay! (gọi 1900.633.639)"
                                />
                                {loading ? (
                                    <div className={cx('spinner-3')}></div>
                                ) : (
                                    <div className={cx('spinner')}></div>
                                )}
                                <button>Tìm kiếm</button>
                            </div>
                        </HeadlessTippy>
                        <div className={cx('action')}>
                            <Tippy
                                arrow
                                interactive
                                delay={300}
                                render={(attrs) => (
                                    <div className={cx('loyalty-dropdown')} tabIndex="-1" {...attrs}>
                                        <PopperWrapper className={cx('popper-wrapper')}>
                                            <>hello</>
                                        </PopperWrapper>
                                    </div>
                                )}
                                onClickOutside={handleHideResult}
                            >
                                <div className={cx('loyalty')}>
                                    <Person4Icon className={cx('icon-loyalty')} />
                                    <div className={cx('item')}>
                                        <span className={cx('level')}>THƯỜNG</span>
                                        <span className={cx('point')}>0</span>
                                    </div>
                                </div>
                            </Tippy>

                            <Tippy
                                arrow
                                interactive
                                followCursor={true}
                                delay={300}
                                render={(attrs) => (
                                    <div className={cx('gift-dropdown')} tabIndex="-1" {...attrs}>
                                        <PopperWrapper className={cx('popper-wrapper')}>
                                            <>hello</>
                                        </PopperWrapper>
                                    </div>
                                )}
                                onClickOutside={handleHideResult}
                            >
                                <div className={cx('gift')}>
                                    <CardGiftcardIcon className={cx('gift-icon')} />
                                    <div className={cx('notifi')}>0</div>
                                </div>
                            </Tippy>

                            <div className={cx('cart')}>
                                <ShoppingCartIcon className={cx('cart-icon')} />
                                <div className={cx('notifi')}>0</div>
                                <div className={cx('pulsing-2')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
