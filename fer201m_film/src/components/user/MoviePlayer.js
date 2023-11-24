import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import Comment from './Comment';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useParams } from 'react-router-dom';

function MoviePLayer() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:9999/movies/' + id)
            .then((res) => setMovie(res.data))
            .catch((err) => console.log(err));
    }, []);

    document.title = `${movie.title}`;

    return (
        <Container fluid>
            <Header />
            <Row className="col-lg-12 col-md-12 col-sm-12 d-flex mx-auto justify-content-center">
                <iframe
                    title={`Watch ${movie.title}`}
                    allowFullScreen
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60%',
                        height: '70vh',
                    }}
                    // src="https://embed.smashystream.com/playere.php?tmdb=569094"
                    src={`https://drive.google.com/file/d/${movie.url_id}/preview`}
                    // src="https://drive.google.com/uc?export=download&id=1fgJX-YsdeRzexeRlTePhmBrdClerm3qw"
                ></iframe>
                <Col className="col-lg-7 col-md-7 col-sm-7 mx-auto my-5">
                    <h3>{movie.title}</h3>
                    <Row>
                        <Col className="col-lg-2 col-md-2 col-sm-2">{movie.release_date}</Col>
                        <Col className="col-lg-2 col-md-2 col-sm-2">{movie.time}</Col>
                        <Col className="col-lg-4 col-md-4 col-sm-4">{movie.nation}</Col>
                    </Row>
                    <p>{movie.genre}</p>
                    <p style={{ textAlign: 'justify' }}>{movie.description}</p>
                </Col>

                <Col className="col-lg-4 col-md-4 col-sm-4 offset-lg-1 offset-md-1 offset-sm-1 mx-auto my-5">
                    <Row className="d-flex align-items-center">
                        <Col lg={2} md={2} sm={2}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="bi bi-share"
                                viewBox="0 0 16 16"
                            >
                                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                            </svg>
                        </Col>
                        <Col>
                            <span>Chia sẻ</span>
                        </Col>
                    </Row>
                    <Row>
                        <p className="my-3" style={{ fontSize: '14px' }}>
                            Diễn viên: Trấn Thành, Tuấn Trần, Lê Giang, Ngân Chi, NSND Ngọc Giàu, Lê Giang ,...
                        </p>
                    </Row>
                    <Row>
                        <p style={{ fontSize: '14px' }}>Đạo diễn: Vũ Ngọc Đãng & Trấn Thành</p>
                    </Row>
                </Col>
            </Row>
            <Comment />
            <Footer />
        </Container>
    );
}

export default MoviePLayer;
