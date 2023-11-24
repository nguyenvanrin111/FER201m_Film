import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import noData from '../../../Assets/image/no-data.svg';

export default function UserTransaction() {
    return (
        <Container>
            <Header />
            <Container style={{ marginTop: '70px', marginBottom: '70px', minHeight: '50vh' }}>
                <Row className="">
                    <h1>Thông tin tài khoản</h1>
                </Row>
                <Row className="mt-5">
                    <Col lg={3}>
                        <ul className="list-unstyled">
                            <li className="my-4">
                                <Link
                                    to={'/user-profile'}
                                    style={{ textDecoration: 'none', color: '#FFFFFF', fontSize: '18px' }}
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
                                    style={{ textDecoration: 'none', color: '#048F98', fontSize: '18px' }}
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
                    <Col lg={9} >
                        <Row lg={'auto'}>
                            <img src={noData} alt="no data" />
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Container>
    );
}
