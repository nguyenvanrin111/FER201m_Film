import React from 'react';
import { Row, Col, Image, Button, Container } from 'react-bootstrap';
import avatarImage from '../../Assets/image/avatar.png';
import '../../Assets/css/user/comment.css';

export default function Comment() {
    return (
        <Container fluid>
            <Row className="d-flex mx-auto px-4 pb-5">
                <h4 className="mb-2 p-0">Bình luận</h4>
                <Row className="p-0">
                    <Col lg={'auto'} className="d-flex align-self-center">
                        <Image src={avatarImage} width={26}></Image>
                    </Col>
                    <Col lg={10} offset={1} className="p-0">
                        <input
                            type="text"
                            id="txtAddComment"
                            className="form-control"
                            placeholder="Viết bình luận ..."
                        ></input>
                    </Col>
                </Row>
                <Row className="my-2 p-0">
                    <Col lg={'auto'} className="d-flex align-self-start pt-2">
                        <Image src={avatarImage} width={26}></Image>
                    </Col>
                    <Col lg={10} offset={1}>
                        <Row className="m-0" style={{ fontSize: '13px' }}>
                            hieuuu
                        </Row>
                        <Row>
                            <input
                                type="text"
                                id="txtComment"
                                className="form-control"
                                aria-label="With textarea"
                                disabled
                                value="Phim rất hay"
                            ></input>
                        </Row>
                        <Row>
                            <Col lg={1} md={1} sm={1} className="p-0">
                                <Button id="btnReplyComment" variant="link" style={{ paddingRight: '0px' }}>
                                    Phản hồi
                                </Button>
                            </Col>
                            <Col lg={1} md={1} sm={1} className="p-0">
                                <Button id="btnDeleteComment" variant="link" className="px-0">
                                    Xóa
                                </Button>
                            </Col>
                        </Row>
                        {/* nested comment  */}
                        <Row>
                            <Col lg={'auto'} className="d-flex align-self-start pt-2">
                                <Image src={avatarImage} width={26}></Image>
                            </Col>
                            <Col>
                                <Row className="m-0" style={{ fontSize: '13px' }}>
                                    hieuuu
                                </Row>
                                <Row>
                                    <input
                                        type="text"
                                        id="txtComment"
                                        className="form-control"
                                        aria-label="With textarea"
                                        disabled
                                        value="Đúng vậy"
                                    ></input>
                                </Row>
                                <Row>
                                    <Col lg={1} md={1} sm={1} className="p-0">
                                        <Button id="btnReplyComment" variant="link" style={{ paddingRight: '0px' }}>
                                            Phản hồi
                                        </Button>
                                    </Col>
                                    <Col lg={1} md={1} sm={1} className="p-0">
                                        <Button id="btnDeleteComment" variant="link" className="px-0">
                                            Xóa
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}