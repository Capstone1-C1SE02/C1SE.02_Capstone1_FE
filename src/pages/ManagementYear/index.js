import { Form, Container, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import ButtonC from '~/components/ButtonC';
import classNames from 'classnames/bind';
import styles from './ManagementYear.module.scss';
const cx = classNames.bind(styles);

function ManagementYear() {
    const data = [
        {
            id: 1,
            name: 'John Doe',
            major: 'CNTT',
            academicProgram: 'Đào tạo quốc tế',
            classification: 'Giỏi',
            graduationYear: '2020',
        },
        {
            id: 2,
            name: 'John Doe',
            major: 'CNTT',
            academicProgram: 'Đào tạo quốc tế',
            classification: 'Giỏi',
            graduationYear: '2020',
        },
        {
            id: 3,
            name: 'John Doe',
            major: 'CNTT',
            academicProgram: 'Đào tạo quốc tế',
            classification: 'Giỏi',
            graduationYear: '2020',
        },
        {
            id: 4,
            name: 'John Doe',
            major: 'CNTT',
            academicProgram: 'Đào tạo quốc tế',
            classification: 'Giỏi',
            graduationYear: '2020',
        },
        {
            id: 5,
            name: 'John Doe',
            major: 'CNTT',
            academicProgram: 'Đào tạo quốc tế',
            classification: 'Giỏi',
            graduationYear: '2020',
        },
        {
            id: 6,
            name: 'John Doe',
            major: 'CNTT',
            academicProgram: 'Đào tạo quốc tế',
            classification: 'Giỏi',
            graduationYear: '2020',
        },
        {
            id: 7,
            name: 'John Doe',
            major: 'CNTT',
            academicProgram: 'Đào tạo quốc tế',
            classification: 'Giỏi',
            graduationYear: '2020',
        },
        {
            id: 8,
            name: 'John Doe',
            major: 'CNTT',
            academicProgram: 'Đào tạo quốc tế',
            classification: 'Giỏi',
            graduationYear: '2020',
        },
        {
            id: 9,
            name: 'John Doe',
            major: 'CNTT',
            academicProgram: 'Đào tạo quốc tế',
            classification: 'Giỏi',
            graduationYear: '2020',
        },
    ];

    const [showAdd, setShowAdd] = useState(false);
    const [ShowEdit, setShowEdit] = useState(false);
    const [ShowDelete, setShowDelete] = useState(false);

    const [getId, setId] = useState();
    const [getUser, setUser] = useState([]);

    const handleShowAdd = () => {
        setShowAdd(true);
    };
    const handleShowEdit = () => {
        setShowEdit(true);
    };
    const handleShowDelete = () => {
        setShowDelete(true);
    };

    const handleClose = () => {
        setShowAdd(false);
        setShowEdit(false);
        setShowDelete(false);
    };

    const findUser = data.find((user) => user.id === getId);
    useEffect(() => {
        setUser([findUser]);
        console.log('111', findUser);
    }, [getId]);

    return (
        <Container className={cx('container')}>
            <div className={cx('heading')}>
                <h2>Năm học:</h2>
            </div>
            <div className={cx('button-make-action')} style={{ display: 'flex', justifyContent: 'end' }}>
                {' '}
                <ButtonC
                    variant="primary"
                    title={'Thêm mới'}
                    width={'8.75rem'}
                    height={'1.84375rem'}
                    margin={'10px 0'}
                    onClick={handleShowAdd}
                ></ButtonC>{' '}
            </div>
            <div className={cx('table-general')}>
                <Table striped bordered hover>
                    <thead>
                        <tr style={{ fontWeight: 700 }}>
                            <th style={{ width: '85%' }}>Mã SV</th>
                            <th style={{ width: '15%' }}>Tuỳ chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <div className={cx('option-button')}>
                                        <ButtonC
                                            variant="warning"
                                            title="Sửa"
                                            width={'5rem'}
                                            height={'1.84375rem'}
                                            onClick={() => {
                                                setId(item.id);
                                                handleShowEdit();
                                            }}
                                            value={getId}
                                        ></ButtonC>
                                        <ButtonC
                                            variant="danger"
                                            title="Xoá"
                                            width={'5rem'}
                                            onClick={handleShowDelete}
                                            height={'1.84375rem'}
                                        ></ButtonC>{' '}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* add action */}
            {showAdd && (
                <div className={cx('form-add-action')}>
                    <div className={cx('headeing-form')}>
                        <h2>Thêm năm học</h2>
                    </div>
                    <Form className={cx('row row-form', 'form-main-add')}>
                        <div className={cx('col')}>
                            <Form.Group className={cx('mb-3')} controlId="formGroupEmail">
                                <Form.Label>Năm học</Form.Label>
                                <Form.Control type="text" className={cx('form-input')} />
                            </Form.Group>
                        </div>
                    </Form>
                    <div className="d-flex justify-content-end">
                        <ButtonC title="Huỷ" onClick={handleClose} variant="secondary" width="8.75rem" height="2.5rem">
                            {' '}
                        </ButtonC>
                        <ButtonC
                            title="Thêm mới"
                            margin="0 1.88rem 0 2.19rem"
                            variant="primary"
                            width="8.75rem"
                            height="2.5rem"
                        >
                            {' '}
                        </ButtonC>
                    </div>
                </div>
            )}

            {/* edit action */}
            {ShowEdit && (
                <div className={cx('form-add-action')}>
                    <div className={cx('headeing-form')}>
                        <h2>Sửa năm học </h2>
                    </div>
                    {getUser.map((user) => (
                        <Form key={user?.id} className={cx('row row-form', 'form-main-add')}>
                            <div className={cx('col')}>
                                <Form.Group className={cx('mb-3')} controlId="formGroupEmail">
                                    <Form.Label>Mã sinh viên</Form.Label>
                                    <Form.Control value={user?.id} type="text" className={cx('form-input')} />
                                </Form.Group>
                            </div>
                        </Form>
                    ))}
                    <div className="d-flex justify-content-end">
                        <ButtonC title="Huỷ" onClick={handleClose} variant="secondary" width="8.75rem" height="2.5rem">
                            {' '}
                        </ButtonC>
                        <ButtonC
                            title="Thêm mới"
                            margin="0 1.88rem 0 2.19rem"
                            variant="primary"
                            width="8.75rem"
                            height="2.5rem"
                        >
                            {' '}
                        </ButtonC>
                    </div>
                </div>
            )}
            {/* delete action */}
            {ShowDelete && (
                <div className={cx('form-add-action')}>
                    <div className={cx('headeing-form')}>
                        <h2>Xoá năm học </h2>
                    </div>
                    <div className={cx('form-main-add')}>
                        <h2>Bạn có thực sự muốn xóa?</h2>
                    </div>
                    <div className="d-flex justify-content-end">
                        <ButtonC title="Huỷ" onClick={handleClose} variant="secondary" width="8.75rem" height="2.5rem">
                            {' '}
                        </ButtonC>
                        <ButtonC
                            title="Xoá"
                            margin="0 1.88rem 0 2.19rem"
                            variant="danger"
                            width="8.75rem"
                            height="2.5rem"
                        >
                            {' '}
                        </ButtonC>
                    </div>
                </div>
            )}
            {(showAdd || ShowDelete || ShowEdit) && <div className={cx('label-layout')} onClick={handleClose}></div>}
        </Container>
    );
}

export default ManagementYear;
