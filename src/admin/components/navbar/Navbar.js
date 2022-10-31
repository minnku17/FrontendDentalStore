import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import {
    ChatBubbleOutlineOutlined,
    DarkModeOutlined,
    FullscreenExitOutlined,
    LanguageOutlined,
    ListOutlined,
    NotificationAddOutlined,
    SearchOutlined,
} from '@mui/icons-material';

import images from '~/assets/images';

const cx = classNames.bind(styles);
function NavBar() {
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
                            <img src={images.noImage} alt="" className={cx('avatar')} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;
