import PropTypes from 'prop-types';
import className from 'classnames/bind';

import Header from '../component/Header';
import Sidebar from './Sidebar';
import styles from './DefaultLayout.module.scss';
import Footer from '../component/Footer/Footer';

function DefaultLayout({ children }) {
    const cx = className.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
