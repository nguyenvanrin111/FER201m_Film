import { useState, useEffect } from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import avatar from '../../../Assets/image/avatar.png';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function UserProfile() {
    const [user, setUser] = useState([]);
    const userId = Cookies.get('userId');
    const [showProfile, setShowProfile] = useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleToggleView = () => {
        setShowProfile(!showProfile);
    };

    const handleSaveChanges = () => {
        if (user.password === oldPassword && newPassword === confirmNewPassword) {
            axios
                .patch('http://localhost:9999/accounts/' + userId, {
                    password: newPassword,
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log('Doi mat khau khong thanh cong');
        }
        setShowProfile(true);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    useEffect(() => {
        axios
            .get('http://localhost:9999/accounts/' + userId)
            .then((res) => setUser(res.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Container>
            <Header />
            <Container style={{ marginTop: '70px', marginBottom: '70px' }}>
                <Row className="">
                    <h1>Thông tin tài khoản</h1>
                </Row>
                <Row className="mt-5">
                    <Col lg={3}>
                        <ul className="list-unstyled">
                            <li className="my-4">
                                <Link
                                    to={'/user-profile'}
                                    style={{ textDecoration: 'none', color: '#048F98', fontSize: '18px' }}
                                >
                                    Thông tin cá nhân
                                </Link>
                            </li>
                            <li className="my-4">
                                <Link
                                    to={'/user-profile/user-card'}
                                    style={{ textDecoration: 'none', color: '#FFFFFF', fontSize: '18px' }}
                                >
                                    Quản lý thẻ thanh toán
                                </Link>
                            </li>
                            <li className="my-4">
                                <Link
                                    to={'/user-profile/user-transaction'}
                                    style={{ textDecoration: 'none', color: '#FFFFFF', fontSize: '18px' }}
                                >
                                    Lịch sử giao dịch
                                </Link>
                            </li>
                            <li className="my-4">
                                <Link
                                    to={'/user-profile/user-history'}
                                    style={{ textDecoration: 'none', color: '#FFFFFF', fontSize: '18px' }}
                                >
                                    Lịch sử xem phim
                                </Link>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={9}>
                        <Container>
                            <Row>
                                <h2>Hồ sơ</h2>
                            </Row>
                            <Row className="align-items-center p-3" style={{ backgroundColor: '#4A4A4A' }}>
                                <Col lg={'auto'}>
                                    <img className="header-image-avatar" src={avatar} alt="avatar" />
                                </Col>
                                <Col>{user.fullName}</Col>
                                <Col lg={'auto'}>
                                    <Button variant="secondary" size="lg">
                                        Thay đổi
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <h2>Tài khoản và bảo mật</h2>
                            </Row>
                            {showProfile ? (
                                <Container className="pb-5 profile" style={{ backgroundColor: '#4A4A4A' }}>
                                    <Row className="align-items-center border-bottom p-3">Email : {user.email}</Row>
                                    <Row className="align-items-center border-bottom p-3">
                                        Là thành viên:{' '}
                                        {user && user.membership && user.membership.status ? ' Active' : ' Inactive'}
                                    </Row>
                                    <Row className="justify-content-between align-items-center p-3">
                                        Mật khẩu
                                        <Col lg={'auto'}>
                                            <Button variant="secondary" size="lg" onClick={handleToggleView}>
                                                Thay đổi
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            ) : (
                                <Container className="pb-5 changePwd" style={{ backgroundColor: '#4A4A4A' }}>
                                    <Row className="align-items-center border-bottom p-3">
                                        <span>Mật khẩu cũ</span>
                                        <input
                                            className='input-group input-group-lg'
                                            type="password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        ></input>
                                    </Row>
                                    <Row className="align-items-center border-bottom p-3">
                                        Mật khẩu mới
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        ></input>
                                    </Row>
                                    <Row className="align-items-center border-bottom p-3">
                                        Nhập lại mật khẩu mới
                                        <input
                                            type="password"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        ></input>
                                    </Row>
                                    <Row className="justify-content-between align-items-center p-3">
                                        <Button variant="secondary" size="lg" onClick={handleSaveChanges}>
                                            Lưu
                                        </Button>
                                    </Row>
                                </Container>
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Container>
    );
}
