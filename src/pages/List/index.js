import { Form, Container, Button, Table, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import classNames from 'classnames/bind';
import styles from './List.module.scss';
const cx = classNames.bind(styles);

function List({ title, data }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(data);
    return (
        <>
            <Container className={cx('ListStudent')}>
                <div className={cx('Heading_ListStudent')}>
                    <h2>{title}</h2>
                    <div className={cx('Button_AddNewStudent')}>
                        <Button variant="primary" onClick={handleShow}>
                            Xem chi tiết
                        </Button>{' '}
                    </div>
                </div>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Mã SV</th>
                                <th>Tên SV</th>
                                <th>Chuyên ngành</th>
                                <th>Chương trình đào tạo</th>
                                <th>Xếp loại</th>
                                <th>Năm Xếp loại</th>
                                <th>Tuỳ chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* chinh code */}
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Button variant="primary" onClick={handleShow}>
                                            Xem chi tiết
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin chi tiết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <p>
                        <strong>ID:</strong> {data[0].id}
                    </p>
                    <p>
                        <strong>Tên:</strong> {data[0].name}
                    </p>
                    <p>
                        <strong>Email:</strong> {data[0].email}
                    </p> */}
                </Modal.Body>
            </Modal>

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

export default List;
