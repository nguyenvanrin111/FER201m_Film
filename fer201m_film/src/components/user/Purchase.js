import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../../Assets/css/user/purchase.css';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Purchase() {
    const [user, setUser] = useState([]);
    const userId = Cookies.get('userId');

    const handlePayPalPayment = () => {
        // Gọi hàm xử lý khi thanh toán được phê duyệt
        // Đây là nơi bạn thực hiện các bước cập nhật dữ liệu
        updateMembershipAndTransactions(userId); // Hàm cập nhật trạng thái thành viên và giao dịch
    };

    const updateMembershipAndTransactions = async (userId) => {
        const currentDate = new Date(); // Lấy ngày hiện tại
        const expiryDate = new Date(currentDate); // Tạo một bản sao của ngày hiện tại
        expiryDate.setDate(expiryDate.getDate() + 30); // Thêm 30 ngày

        try {
            // Gọi API để cập nhật trạng thái thành viên
            const updateMembershipResponse = await fetch('http://localhost:9999/accounts/' + userId, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    membership: {
                        status: 'active',
                        expiry_date: expiryDate.toISOString().split('T')[0], // Cập nhật ngày hết hạn mới
                    },
                }),
            });

            if (updateMembershipResponse.ok) {
                console.log('Cập nhật thành công.');
                axios
                    .post('http://localhost:9999/transactions', {
                        user_id: userId, // ID của người dùng
                        type: 'payment',
                        amount: 2,
                        date: currentDate.toISOString().split('T')[0], // Ngày thanh toán (ở định dạng YYYY-MM-DD)
                        payment_method: 'paypal',
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
            } else {
                console.log('Cập nhật không thành công.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
        }
    };

    return (
        <Container>
            <Header />
            <Container style={{ marginTop: '70px', marginBottom: '70px' }}>
                <h2 className="py-4">Mua gói</h2>
                <Row className="py-3">
                    <Col>2$/30 ngày</Col>
                    <Col lg={'auto'}>
                        <PayPalScriptProvider
                            options={{
                                'client-id':
                                    'AY8XmMnyVaP81DSJPNl4y3VH20p7_tqiwaDsiCo4UBec5jXE4OApTIusDGQ1Hy1v1EYLGoikjKpCBUKl',
                            }}
                        >
                            <PayPalButtons
                                style={{ layout: 'vertical' }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: '2',
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    handlePayPalPayment();
                                }}
                                onError={(err) => {
                                    // Xử lý khi thanh toán không thành công
                                    console.error('Lỗi thanh toán:', err);
                                    alert('Thanh toán không thành công. Vui lòng thử lại sau.');
                                }}
                            />
                        </PayPalScriptProvider>
                    </Col>
                </Row>
                {/* <Row className="py-3" style={{ backgroundColor: '#555555' }}>
                    <Col>2$/60 ngày</Col>
                    <Col lg={'auto'}>
                        <Button>Chọn gói này</Button>
                    </Col>
                </Row>
                <Row className="py-3">
                    <Col>3$/90 ngày</Col>
                    <Col lg={'auto'}>
                        <Button>Chọn gói này</Button>
                    </Col>
                </Row> */}
            </Container>
            <Footer />
        </Container>
    );
}
