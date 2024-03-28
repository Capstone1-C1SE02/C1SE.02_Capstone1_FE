import './Button.module.scss';
import { Button } from 'react-bootstrap';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);

function ButtonC({ title, onClick, width, height, border, color, variant, margin, padding, borderRadius }) {
    return (
        <div>
            <Button
                className={cx('buttonCustom')}
                variant={variant}
                onClick={onClick}
                style={{
                    width: width,
                    height: height,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    margin: margin,
                    borderRadius: borderRadius,
                }}
            >
                {title}
            </Button>{' '}
        </div>
    );
}

export default ButtonC;
