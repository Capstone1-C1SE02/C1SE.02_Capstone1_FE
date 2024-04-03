import { Container } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Header() {
    return (
        <Container fluid className={cx('container')}>
            <header className="py-3 position-relative">
                <img src={images.logo} alt="Logo" />
                <h1 className={cx('heading')}>Quản lý văn bằng</h1>
            </header>
        </Container>
    );
}

export default Header;
