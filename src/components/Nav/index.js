import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Nav.module.scss';

const cx = classNames.bind(styles);

function Nav() {
    const getClassName = ({ isActive }) => {
        return cx('item__link', isActive ? styles.active : '');
    };

    return (
        <Container fluid>
            <ul className={cx('list-items')}>
                <li className={cx('item')}>
                    <NavLink className={getClassName} to="/home">
                        DSSV đã nhận bằng
                    </NavLink>
                </li>
                <li className={cx('item')}>
                    <NavLink className={getClassName} to="/management-student">
                        Quản lý sinh viên
                    </NavLink>
                </li>
                <li className={cx('item')}>
                    <NavLink className={getClassName} to="/management-year">
                        Quản lý năm học
                    </NavLink>
                </li>
                <li className={cx('item')}>
                    <NavLink className={getClassName} to="/management-academic">
                        Quản lý chương trình học
                    </NavLink>
                </li>
                <li className={cx('item')}>
                    <NavLink className={getClassName} to="/management-academic-follow-year">
                        Quản lý chương trình học theo năm
                    </NavLink>
                </li>
            </ul>
        </Container>
    );
}

export default Nav;
