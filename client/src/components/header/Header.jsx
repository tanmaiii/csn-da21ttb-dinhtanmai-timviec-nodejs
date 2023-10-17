import React from "react";
import img from "../../assets/images/logoJobQuest.png";
import { Link } from "react-router-dom";
import "./header.scss";

export default function Header() {
  return (
    <div className="header">
        <div className="header__wrapper">
      <div className="container">
          <div className="header__wrapper__logo">
            <Link>
              <img src={img} alt="" />
              <h2>JobQuest</h2>
            </Link>
          </div>

          <div className="header__wrapper__control">
            <ul>
              <li>
                <Link className="active">Tìm việc</Link>
              </li>
              <li>
                <Link>Đánh giá</Link>
              </li>
              <li>
                <Link>Công ty</Link>
              </li>
            </ul>
          </div>

          <div className="header__wrapper__auth">
            <button className="header__wrapper__auth__user">
              <Link>Đăng nhập</Link>
            </button>
            <div className="header__wrapper__auth__company">
              <Link>Nhà tuyển dụng</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
