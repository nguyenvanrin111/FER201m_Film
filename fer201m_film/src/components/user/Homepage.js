import { Link } from "react-router-dom";
import styles from "../../Assets/css/user/homePage.css";
import classNames from "classnames/bind";
import phimLeImg from "../../Assets/image/phimle.png";
import phimMoiImg from "../../Assets/image/phimmoi.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import Header from "../common/Header";
import Footer from "../common/Footer";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const cx = classNames.bind(styles);

export default function HomePage() {

  const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:9999/movies')
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err));
    }, []);

  return (
    <Container className="app-container" fluid>
      <Header />
      <div className={cx("wrapper")}>
        <div className={cx("inner")}>
          <div className={cx("search")}>
            <input
              className={cx("search-input")}
              type={"text"}
              placeholder={"Nhập tên phim, anime,...."}
            />
            <Link className={cx("search-btn")}>Tìm kiếm</Link>
          </div>
        </div>
        <div className={cx("slide")}>
          <Link className={cx("slide-btn")}>
            <FontAwesomeIcon icon={faPlay} style={{ marginRight: "6px" }} />
            Xem phim
          </Link>
          <FontAwesomeIcon
            icon={faAngleRight}
            className={cx("slide-arrow-right")}
          />
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={cx("slide-arrow-left")}
          />
        </div>
        <div className={cx("category")}>
          <div className={cx("category-title")}>
            <h3 className={cx("title")}> Danh mục</h3>
            <Link className={cx("title-all")}>Xem tất cả</Link>
          </div>
          <ul className={cx("category-list")}>
            <li className={cx("category-arrow")}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={cx("cate-arrow-left")}
              />
            </li>
            <li className={cx("category-item")}>
              <Link className={cx("category-item-url")}>Thiếu nhi</Link>
            </li>
            <li className={cx("category-item")}>
              <Link className={cx("category-item-url")}>Phim lẻ</Link>
            </li>
            <li className={cx("category-item")}>
              <Link className={cx("category-item-url")}> Anime</Link>
            </li>
            <li className={cx("category-item")}>
              <Link className={cx("category-item-url")}>Kinh dị</Link>
            </li>
            <li className={cx("category-item")}>
              <Link className={cx("category-item-url")}>Phim bộ</Link>
            </li>
            <li className={cx("category-item")}>
              <Link className={cx("category-item-url")}>Phim ma</Link>
            </li>
            <li className={cx("category-arrow")}>
              <FontAwesomeIcon
                icon={faAngleRight}
                className={cx("cate-arrow-right")}
              />
            </li>
          </ul>
        </div>
        <div className={cx("category")}>
          <div className={cx("category-title")}>
            <h3 className={cx("title")}> Mới ra mắt</h3>
            <Link className={cx("title-all")}>Xem tất cả</Link>
          </div>
          <ul className={cx("category-list")}>
            <li className={cx("category-arrow")}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={cx("cate-arrow-left")}
              />
            </li>
            {movies.map(movie => (
              <li className={cx("film-small-item")}>
              <Link className={cx("small-item-url")} to={`/player/${movie.id}`}>
                <img src={phimMoiImg} alt={""} className={cx("img-small")} />
              </Link>
            </li>
            ))}
            
            <li className={cx("film-arrow")}>
              <FontAwesomeIcon
                icon={faAngleRight}
                className={cx("cate-arrow-right")}
              />
            </li>
          </ul>
        </div>
        <div className={cx("category-lagre")}>
          <div className={cx("category-title")}>
            <h3 className={cx("title")}> Phim lẻ hot</h3>
            <Link className={cx("title-all")}>Xem tất cả</Link>
          </div>
          <ul className={cx("category-list")}>
            <li className={cx("category-arrow")}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={cx("cate-arrow-left")}
              />
            </li>
            <li className={cx("film-item")}>
              <Link className={cx("film-item-url")}>
                <img src={phimLeImg} alt={"Ảnh phim"} />
              </Link>
            </li>
            <li className={cx("film-item")}>
              <Link className={cx("film-item-url")}>
                <img src={phimLeImg} alt={"Ảnh phim"} />
              </Link>
            </li>
            <li className={cx("film-item")}>
              <Link className={cx("film-item-url")}>
                <img src={phimLeImg} alt={"Ảnh phim"} />
              </Link>
            </li>
            <li className={cx("film-item")}>
              <Link className={cx("film-item-url")}>
                <img src={phimLeImg} alt={"Ảnh phim"} />
              </Link>
            </li>

            <li className={cx("film-arrow")}>
              <FontAwesomeIcon
                icon={faAngleRight}
                className={cx("cate-arrow-right")}
              />
            </li>
          </ul>
        </div>
        <div className={cx("category")}>
          <div className={cx("category-title")}>
            <h3 className={cx("title")}> Phim kinh dị</h3>
            <Link className={cx("title-all")}>Xem tất cả</Link>
          </div>
          <ul className={cx("category-list")}>
            <li className={cx("category-arrow")}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={cx("cate-arrow-left")}
              />
            </li>
            <li className={cx("film-small-item")}>
              <Link className={cx("small-item-url")}>
                <img src={phimMoiImg} alt={""} className={cx("img-small")} />
              </Link>
            </li>
            <li className={cx("film-small-item")}>
              <Link className={cx("small-item-url")}>
                <img src={phimMoiImg} alt={""} className={cx("img-small")} />
              </Link>
            </li>
            <li className={cx("film-small-item")}>
              <Link className={cx("small-item-url")}>
                <img src={phimMoiImg} alt={""} className={cx("img-small")} />
              </Link>
            </li>
            <li className={cx("film-arrow")}>
              <FontAwesomeIcon
                icon={faAngleRight}
                className={cx("cate-arrow-right")}
              />
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
