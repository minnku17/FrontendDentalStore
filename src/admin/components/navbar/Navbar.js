import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import {
    ChatBubbleOutlineOutlined,
    DarkModeOutlined,
    FullscreenExitOutlined,
    LanguageOutlined,
    ListOutlined,
    NotificationAddOutlined,
    PeopleAltOutlined,
    SearchOutlined,
} from '@mui/icons-material';

import images from '~/assets/images';
import { useSelector } from 'react-redux';

import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);
function NavBar() {
    const user = useSelector((state) => state.auth.login?.currentUser?.user);

    return (
        <>
            <div className={cx('navbar')}>
                <div className={cx('wrapper')}>
                    <div className={cx('search')}>
                        <input type="text" placeholder="Search..." />
                        <SearchOutlined />
                    </div>
                    <div className={cx('items')}>
                        <div className={cx('item')}>
                            <PeopleAltOutlined className={cx('icon')} />
                            <span>Role: {user?.roleId}</span>
                        </div>
                        <div className={cx('item')}>
                            <LanguageOutlined className={cx('icon')} />
                            English
                        </div>

                        <div className={cx('item')}>
                            <DarkModeOutlined className={cx('icon')} />
                        </div>
                        <div className={cx('item')}>
                            <FullscreenExitOutlined className={cx('icon')} />
                        </div>
                        <div className={cx('item')}>
                            <NotificationAddOutlined className={cx('icon')} />
                            <div className={cx('counter')}>1</div>
                        </div>
                        <div className={cx('item')}>
                            <ChatBubbleOutlineOutlined className={cx('icon')} />
                            <div className={cx('counter')}>1</div>
                        </div>
                        <div className={cx('item')}>
                            <ListOutlined className={cx('icon')} />
                        </div>
                        <div className={cx('item')}>
                            <Tippy
                                render={(attrs) => (
                                    <div className="box" tabIndex="-1" {...attrs}>
                                        My tippy box
                                    </div>
                                )}
                            >
                                <button className={cx('action-btn')}>
                                    <img
                                        src={user?.image ? user.image : images.noImage}
                                        alt=""
                                        className={cx('avatar')}
                                    />
                                </button>
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;
