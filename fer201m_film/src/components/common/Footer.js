import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Assets/css/common/footer.css";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div id="footer-box">
      <div className="footer-flex-element" id="footer-left-div">
        <p className="footer-header-text">About Us</p>
        <Link>Giới thiệu</Link>
        <Link>Liên hệ</Link>
        <Link>Các gói dịch vụ</Link>
      </div>

      <div className="footer-flex-element" id="footer-center-div">
        <p className="footer-header-text">Quy định</p>
        <Link>Điều khoản sử dụng</Link>
        <Link>Chính sách thanh toán</Link>
        <Link>Chính sách dữ bảo mật thông tin</Link>
      </div>

      <div className="footer-flex-element" id="footer-right-div">
        <p>
          <span>
            <FontAwesomeIcon icon={faPhone} style={{ color: "#ffffff" }} />
          </span>{" "}
          098765843
        </p>
        <p>
          <span>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>{" "}
          team3@gmail.com
        </p>
      </div>
    </div>
  );
}

export default Footer;
