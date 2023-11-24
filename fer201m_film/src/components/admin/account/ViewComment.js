import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, Pagination, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../Assets/css/admin/viewComment.css";
import "../../../Assets/css/admin/account.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

export default function ViewAccount() {
  const [rootComments, setRootComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/comments")
      .then((res) => {
        setRootComments(res.data);
        setComments(res.data);
      })
      .catch((err) => console.log(err));

      axios
      .get("http://localhost:9999/accounts")
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (event) => {
    if (event.target.value === "") {
      setComments(rootComments);
      return;
    }

    var searchResult = rootComments.filter((a) =>
      a.email.startsWith(event.target.value)
    );
    setComments(searchResult);
  };

  const getUrlAvatar = (accountId) => {
    const acc = accounts.find(a => a.id === accountId);
    if(acc === null) return ''
    return acc.urlAvatar
  }

  const handlePaginationItemClick = (data) => { };

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
            <li>
              <Link
                className="text-decoration-none admin-dashboard-nav-link"
                to={"/admin/accounts"}
              >
                Người dùng
              </Link>
            </li>
            <li className="admin-active-nav-background">
              <Link
                className="text-decoration-none admin-dashboard-nav-link admin-active-nav-text"
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

        <Col md={9} className="admin-account-info">
          <h4>Báo cáo bình luận</h4>
          <Row>
            <Col>
              <input
                className="form-control"
                type="text"
                onChange={handleInputChange}
                placeholder="Nhập tên người dùng..."
              />
            </Col>
          </Row>

          <div id="admin-account-list">
            <ul id="admin-ul-account">
              {comments.map((a) => (
                <li className="border-top align-items-center">
                  <Row>

                    <Col md={2}>
                        <img src={(e) => getUrlAvatar(a.accountId)} alt="avatar" className="admin-comment-avatar"/>
                    </Col>

                    <Col md={6}>
                      <p className="m-2">{a.email}</p>
                    </Col>

                    <Col md={4} className="d-flex justify-content-end">
                      <Link
                        className="btn btn-primary link-btn"
                        to={"/admin/accounts/" + a.id}
                      >
                        Chỉnh sửa
                      </Link>
                      <Link
                        className="btn btn-primary link-btn"
                        to={"/admin/accounts/" + a.id + "/hide"}
                      >
                        Ẩn
                      </Link>
                    </Col>
                  </Row>
                </li>
              ))}
            </ul>

            <div>
              <Pagination className="justify-content-center mt-4">
                <Pagination.First
                  onClick={() => handlePaginationItemClick(1)}
                />
                <Pagination.Prev
                  onClick={() => handlePaginationItemClick("prev")}
                />
                <Pagination.Item
                  onClick={() => handlePaginationItemClick(1)}
                  active
                >
                  {1}
                </Pagination.Item>
                <Pagination.Item onClick={() => handlePaginationItemClick(2)}>
                  {2}
                </Pagination.Item>
                <Pagination.Item onClick={() => handlePaginationItemClick(3)}>
                  {3}
                </Pagination.Item>
                <Pagination.Next
                  onClick={() => handlePaginationItemClick("next")}
                />
                <Pagination.Last
                  onClick={() => handlePaginationItemClick("last")}
                />
              </Pagination>
            </div>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}
