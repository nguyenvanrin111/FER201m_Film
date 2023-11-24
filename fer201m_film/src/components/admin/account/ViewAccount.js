import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../Assets/css/admin/viewAccount.css";
import "../../../Assets/css/admin/account.css";
import Header from "../../common/Header";
import "../../../Assets/css/common/header.css";
import Footer from "../../common/Footer";
import Popup from "../../common/Popup";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ViewAccount() {
  const [rootAccounts, setRootAccounts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [hideAccount, setHideAccount] = useState(false);
  const [emailPopup, setEmailPopup] = useState('')
  const [isDeactive, setIsDeactive] = useState(true)

  const closePopup = () => {
    setHideAccount(false)
  };

  const showPopup = (id, status) => {
    const acc = accounts.find(a => a.id === id)

    if (status === 0) {
      acc.isActive = false
      setIsDeactive(true)
    } else {
      acc.isActive = true
      setIsDeactive(false)
    }
    axios
      .put("http://localhost:9999/accounts/" + id, acc)
      .catch((err) => console.log(err));

    setEmailPopup(acc.email)
    setHideAccount(true)
  }

  useEffect(() => {
    console.log('useEffect 1');
    axios
      .get("http://localhost:9999/accounts")
      .then((res) => {
        setRootAccounts(res.data)
        setAccounts(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (event) => {
    if (event.target.value === "") {
      setAccounts(rootAccounts);
      return;
    }

    var searchResult = rootAccounts.filter((a) =>
      a.email.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setAccounts(searchResult);
  };

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

        <Col md={9} className="admin-account-info">
          <h4>Quản lý người dùng</h4>
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
              {accounts.map((a) => (
                <li className="border-top align-items-center">
                  <Row>
                    <Col md={8}>
                      <p className="m-2">{a.email}</p>
                    </Col>

                    <Col md={4} className="d-flex justify-content-end">
                      <Link
                        className="btn btn-primary link-btn"
                        to={"/admin/accounts/" + a.id}
                      >
                        Chỉnh sửa
                      </Link>
                      {
                        a.isActive ? <Button className="btn btn-primary link-btn" onClick={() => showPopup(a.id, 0)}> Chặn </Button> : <Button className="btn btn-primary link-btn" onClick={() => showPopup(a.id, 1)}> Bỏ chặn </Button>
                      }

                      {hideAccount && (
                        <Popup>
                          <div className="popup_content">
                            <div className="popup_content-close">
                              <FontAwesomeIcon
                                onClick={closePopup}
                                className="icon_close"
                                icon={faCircleXmark}
                              />
                            </div>
                            {
                              isDeactive ? <h3 className="popup_content-title">Đã chặn thành công tài khoản:</h3> : <h3 className="popup_content-title">Đã bỏ chặn thành công tài khoản:</h3>
                            }
                            <div className="popup_content-input">
                              <label>{emailPopup}</label>
                            </div>
                          </div>
                        </Popup>
                      )}
                    </Col>
                  </Row>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}
