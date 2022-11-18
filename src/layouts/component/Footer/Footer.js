import className from 'classnames/bind';
import React from 'react';

import styles from './Footer.module.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import images from '~/assets/images';

const cx = className.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('top')}>
                    <div className={cx('footer-col-l')}>
                        <p>hỗ trợ khách hàng</p>
                        <ul>
                            <li>Hotline: 1900 633 639</li>
                            <li>Lịch sử mua hàng</li>
                            <li>Câu hỏi thường gặp</li>
                            <li>Hướng dẫn mua hàng</li>
                            <li>Phương thức vận chuyển</li>
                            <li>Phương thức thanh toán</li>
                            <li>Đổi trả/ Hoàn tiền</li>
                        </ul>
                    </div>
                    <div className={cx('footer-col-l')}>
                        <p>Về sannhakhoa.vn</p>
                        <ul>
                            <li>Về chúng tôi</li>
                            <li>Liên hệ hợp tác</li>
                            <li>Chính sách bảo mật</li>
                            <li>Membership Club</li>
                            <li>Chương trình hoàn tiền</li>
                            <li>Tất cả thương hiệu</li>
                            <li>Sơ đồ website</li>
                        </ul>
                    </div>
                    <div className={cx('footer-col-l')}>
                        <p>tính năng nổi bật</p>
                        <ul>
                            <li>Setup phòng khám mới</li>
                            <li>Phần mềm Nha Khoa</li>
                            <li>Cung ứng vật liệu hàng tháng</li>
                            <li>CBaso giá RẺ hơn chỉ 5 phút</li>
                            <li>Kết nối nối với chúng tôi</li>
                        </ul>
                        <div className={cx('connect')}>
                            <FacebookIcon className={cx('icon')} />
                            <YouTubeIcon className={cx('icon')} />
                            <FacebookIcon className={cx('icon')} />
                        </div>
                    </div>
                    <div className={cx('footer-col-m')}>
                        <p>Sàn online vật liệu, dụng cụ & thiết bị nha khoa</p>
                        <ul>
                            <li>
                                <span>Công ty: </span>Cổ phần Công Nghệ Edent (MST: 0316201760)
                            </li>
                            <li>
                                <span>Địa chỉ: </span> Lầu 9 tòa nhà PTS- 188 Huỳnh Tấn Phát, Phường Tân Thuận Tây, Quận
                                7, Tp. Hồ Chí Minh
                            </li>
                            <li>
                                <span>Email: </span>info@sannhakhoa.vn
                            </li>
                            <li>
                                <span>Hotline: </span>1900 633 639
                            </li>
                        </ul>
                        <div className={cx('logo')}>
                            <img src={images.logoBCT} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('bottom')}>
                Giấy chứng nhận Đăng ký Kinh doanh số 0316201760 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày
                16/03/2020 - Bản quyền 2022©sannhakhoa.vn.
            </div>
        </div>
    );
}
export default Footer;
