import { Form, Container } from 'react-bootstrap';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username.length > 0 && password.length > 0) {
            toast.success('Login success');
        } else {
            toast.error('Login failed');
        }
    };

    return (
        <>
            <Container className={cx('login')}>
                <h1 className={cx('heading')}>Login</h1>
                <Form className={cx('form', 'col-12 col-sm-10 col-md-6 col-xl-6 col-xxl-6')}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Tên đăng nhập"
                            className={cx('form-input')}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Mật khẩu"
                            className={cx('form-input')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center ">
                        <div className={cx('btn')} variant="primary" onClick={handleLogin}>
                            Login
                        </div>
                    </div>
                </Form>
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default Login;
