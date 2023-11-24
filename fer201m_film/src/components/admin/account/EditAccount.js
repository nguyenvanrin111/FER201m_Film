import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import "../../../Assets/css/admin/account.css";
import "../../../Assets/css/admin/editAccount.css"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditAccount() {
    const { id } = useParams()
    const [account, setAccount] = useState({})
    const [name, setName] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [message, setMessage] = useState('')
    const [errMessage, setErrMessage] = useState('')

    useEffect(() => {
        console.log('useEffect 1');
        axios
            .get("http://localhost:9999/accounts/" + id)
            .then((res) => {
                setAccount(res.data)
                const n = res.data.name === undefined ? '' : res.data.name
                const d = res.data.birthday === undefined ? null : new Date(res.data.birthday)
                setName(n)
                setSelectedDate(d)
            })
            .catch((err) => console.log(err));
    }, []);


    const updateAccount = (e) => {
        e.preventDefault();
        try {
            axios
                .put("http://localhost:9999/accounts/" + id, {
                    ...account,
                    name,
                    birthday: selectedDate
                })
                .then(response => {
                    if (response.status === 200) {
                        console.log('success');
                        setMessage('Update successful!');
                        setErrMessage('')
                    } else {
                        throw new Error()
                    }
                })
        } catch (err) {
            console.log('fail');
            setErrMessage('Update failed!');
            setMessage('')
        }
    }

    return (
        <Container className="admin-body">
            <Header />
            <Row>
                <Col md={3} className="admin-dashboard-nav d-flex justify-content-center" >
                    <ul id="admin-dashboard" className="d-flex flex-column align-items-center">
                        <li id="admin-dashboard-header">Quản lý - Admin</li>
                        <li>
                            <Link className="text-decoration-none admin-dashboard-nav-link" to={"/admin/films"} >
                                Phim
                            </Link>
                        </li>
                        <li className="admin-active-nav-background">
                            <Link
                                className="text-decoration-none admin-dashboard-nav-link admin-active-nav-text"
                                to={"/admin/accounts"}
                            >
                                Người dùng
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-decoration-none admin-dashboard-nav-link"
                                to={"/admin/reports"}
                            >
                                Báo cáo
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-decoration-none admin-dashboard-nav-link"
                                to={"/logout"}
                            >
                                Đăng xuất
                            </Link>
                        </li>
                    </ul>
                </Col>

                <Col md={9}>
                    <h2 className="mb-4">Cập nhật tài khoản</h2>
                    <Form onSubmit={updateAccount}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={account.email} className="mb-3" disabled />
                        </Form.Group>

                        <Form.Group controlId="formName">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control type="name" placeholder="Nhập họ tên" value={name} onChange={(n) => setName(n.target.value)} className="mb-3" />
                        </Form.Group>

                        <Form.Group controlId="formDob">
                            <Form.Label>Ngày sinh</Form.Label><br />
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="form-control mb-4"
                            />
                        </Form.Group>

                        <div className="mb-4">
                            <Link className="btn btn-primary admin-edit-account-back" to={'/admin/accounts'}>Trở lại</Link>
                            <input className="btn btn-primary" type="submit" value="Cập nhật" />
                        </div>

                        {
                            message.length > 0 && <Alert variant="success"> {message}</Alert>
                        }

                        {
                            errMessage.length > 0 && <Alert variant="error">{errMessage}</Alert>
                        }
                    </Form>
                </Col>
            </Row>
            <Footer />
        </Container>
    )
}