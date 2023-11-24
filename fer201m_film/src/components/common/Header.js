import React, { useEffect, useState } from 'react';
import logoImage from '../../Assets/image/logo.png';
import avatar from '../../Assets/image/avatar.png';
import '../../Assets/css/common/header.css';
import { Link, Navigate } from 'react-router-dom';
import Popup from './Popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Header() {
    function goHomePage() {
        window.location = '/';
    }

    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isOpenLogin, setOpenLogin] = useState(true);
    const [isLogin, setLogin] = useState(false);
    const [isOpenRegister, setOpenRegister] = useState(false);
    const [isOpenForgot, setOpenForgot] = useState(false);
    const [isOpenChangePass, setOpenChangePass] = useState(false);
    const [users, setuser] = useState([]);
    const [Newuser, setNewUser] = useState([]);
    const [checkEmail, setCheckEmail] = useState('');
    const [inputEmail, setinputEmail] = useState('');
    const [inputPassword, setinputPassword] = useState('');
    const [errorMSG, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [txtEmail, setTxtEmail] = useState('');
    const [txtPassword, setTxtPassword] = useState('');
    const [txtRePass, setTxtRePass] = useState('');
    const isActive = true;

    useEffect(() => {
        axios
            .get('http://localhost:9999/accounts')
            .then((res) => setuser(res.data))
            .catch((error) => console.log(error));
    }, []);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const OpenSignin = () => {
        setOpenLogin(true);
        setOpenRegister(false);
        setOpenForgot(false);
        setOpenChangePass(false);
    };
    const OpenSignUp = () => {
        setOpenLogin(false);
        setOpenRegister(true);
        setOpenForgot(false);
        setOpenChangePass(false);
    };

    const OpenForgotPassword = () => {
        setOpenLogin(false);
        setOpenRegister(false);
        setOpenForgot(true);
        setOpenChangePass(false);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        let user = users.find((x) => x.email === inputEmail && x.password === inputPassword);

        if (user != null) {
            if (user.isActive !== true) {
                setError('Tài khoản của bạn đã bị khoá vì vi phạm');
            } else {
                if (user.role === 0) navigate(`/`);
                else navigate(`/admin/accounts`);
                Cookies.set('user', user, { expires: 7, path: '/' });
                Cookies.set('userId', user.id);
                setOpenLogin(false);
                setLogin(true);
                setPopupOpen(false);
            }
        } else {
            setOpenLogin(true);
            setLogin(false);
            setError('Email hoặc Mật khẩu không chính xác! Vui lòng kiểm tra lại');
        }
    };
    const handleLogout = (event) => {
        event.preventDefault();
        Cookies.remove('user');
        navigate(`/`);
    };
    const openChangePass = (event) => {
        event.preventDefault();
        let user = users.find((x) => x.email === checkEmail);

        if (user != null) {
            setOpenLogin(false);
            setOpenRegister(false);
            setOpenForgot(false);
            setOpenChangePass(true);
        } else {
            setOpenLogin(false);
            setOpenRegister(false);
            setOpenForgot(true);
            setOpenChangePass(false);
            setError('Email không đúng vui lòng kiểm tra lại!');
        }
    };
    const closePopup = () => {
        setPopupOpen(false);
        setOpenLogin(true);
        setOpenForgot(false);
        setOpenRegister(false);
        setOpenChangePass(false);
    };
    const cookieUserValue = Cookies.get('user');

    const handleUpgrade = (e) => {
        if (Cookies.get('user') === null) {
            setOpenLogin(true);
        } else {
            navigate('/dich-vu');
        }
    };
    const handleSubmitRegister = (e) => {
        e.preventDefault();

        if (txtPassword === txtRePass) {
            axios
                .post('http://localhost:9999/accounts', {
                    email: txtEmail,
                    password: txtPassword,
                    isActive,
                    role : 0
                })
                .then((res) => {
                    if (res.status === 201) {
                        setMsg('Create success');
                    }
                })
                .catch((err) => console.log(err));
        } else {
            alert('Mật khẩu và mật khẩu xác nhận phải trùng khớp.');
        }
    };
    return (
        <div>
            <div id="header-box" style={{ backgroundColor: 'black' }}>
                <Link className="header-nav-text" to="/">
                    <div id="header-left-div" className="header-flex-element">
                        <img src={logoImage} alt="Logo" id="header-logo" />
                        <p className="left-div-name">TEAM 3</p>
                    </div>
                </Link>

                <div id="header-center-div" className="header-flex-element">
                    <Link className="header-nav-text" to="/">
                        Trang chủ
                    </Link>
                    <Link className="header-nav-text" to="/phim-bo">
                        Phim bộ
                    </Link>
                    <Link className="header-nav-text" to="/phim-le">
                        Phim lẻ
                    </Link>
                </div>

                <div id="header-right-div" className="header-flex-element">
                    <Link className="header-btn" onClick={handleUpgrade} to="/dich-vu">
                        Mua gói
                    </Link>
                    {cookieUserValue == null ? (
                        <Link className="header-btn" onClick={openPopup}>
                            Đăng nhập
                        </Link>
                    ) : (
                        <div>
                            <Link className="header-btn" to="dang-xuat" onClick={handleLogout}>
                                Đăng xuất
                            </Link>
                            <a href='/user-profile'>
                                <img className="header-image-avatar" src={avatar} alt="avatar" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
            {isPopupOpen && (
                <Popup>
                    {isOpenLogin && (
                        <div className="popup_content">
                            <div className="popup_content-close">
                                <FontAwesomeIcon onClick={closePopup} className="icon_close" icon={faCircleXmark} />
                            </div>
                            <h3 className="popup_content-title">Đăng Nhập</h3>
                            <div className="popup_content-input">
                                <input
                                    className="input_email"
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => setinputEmail(e.target.value)}
                                />
                                <input
                                    className="input_password"
                                    placeholder="Passworld"
                                    type="password"
                                    onChange={(e) => setinputPassword(e.target.value)}
                                />
                            </div>
                            <Link className="forgot_pass" onClick={OpenForgotPassword} to={''}>
                                Quên mật khẩu?
                            </Link>
                            <Button className="login_submit" type="submit" onClick={handleLogin}>
                                Đăng Nhập
                            </Button>
                            <p className="signup">
                                Chưa có tài khoản?
                                <Link className="signup_link" onClick={OpenSignUp} to={''}>
                                    Đăng ký miễn phí
                                </Link>
                            </p>
                            {errorMSG && <p style={{ color: 'red' }}>{errorMSG}</p>}
                        </div>
                    )}
                    {isOpenRegister && (
                        <div className="popup_content">
                            <div className="popup_content-close">
                                <FontAwesomeIcon onClick={closePopup} className="icon_close" icon={faCircleXmark} />
                            </div>
                            <h3 className="popup_content-title">Đăng Ký</h3>
                            <div className="popup_content-input">
                                <input
                                    className="input_email"
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={txtEmail}
                                    onChange={(e) => setTxtEmail(e.target.value)}
                                />
                                <input
                                    className="input_password"
                                    placeholder="Mật Khẩu"
                                    type="password"
                                    name="password"
                                    value={txtPassword}
                                    onChange={(e) => setTxtPassword(e.target.value)}
                                />
                                <input
                                    className="input_password"
                                    placeholder="Nhập lại mật khẩu"
                                    type="password"
                                    name="confirmPassword"
                                    value={txtRePass}
                                    onChange={(e) => setTxtRePass(e.target.value)}
                                />
                            </div>

                            <Button className="login_submit" onClick={handleSubmitRegister} type="submit">
                                Đăng ký
                            </Button>
                            {msg.length > 0 && <Alert style={{ color: 'green' }}>{msg}</Alert>}
                            <p className="signup">
                                Đã có tài khoản?
                                <Link className="signup_link" onClick={OpenSignin} to={''}>
                                    Đăng nhập ngay
                                </Link>
                            </p>
                        </div>
                    )}
                    {isOpenForgot && (
                        <div className="popup_content">
                            <div className="popup_content-close">
                                <FontAwesomeIcon onClick={closePopup} className="icon_close" icon={faCircleXmark} />
                            </div>
                            <h3 className="popup_content-title">Quên Mật Khẩu</h3>
                            <div className="popup_content-input">
                                <label>Vui lòng nhập email của bạn</label>
                                <input
                                    className="input_email"
                                    type="text"
                                    placeholder="Nhập Email"
                                    onChange={(e) => setCheckEmail(e.target.value)}
                                />
                            </div>

                            <Button type="submit" className="login_submit" onClick={openChangePass}>
                                Tiếp tục
                            </Button>
                            {errorMSG && <p style={{ color: 'red' }}>{errorMSG}</p>}
                        </div>
                    )}

                    {isOpenChangePass && (
                        <div className="popup_content">
                            <div className="popup_content-close">
                                <FontAwesomeIcon onClick={closePopup} className="icon_close" icon={faCircleXmark} />
                            </div>
                            <h3 className="popup_content-title">Đổi Mật Khẩu</h3>
                            <div className="popup_content-input">
                                <label>Vui lòng nhập mật khẩu mới của bạn</label>
                                <input className="input_email" type="text" placeholder="Nhập Mật khẩu mới" />
                            </div>

                            <Button className="login_submit">Tiếp tục</Button>
                        </div>
                    )}
                </Popup>
            )}
        </div>
    );
}

export default Header;
