import React,{useEffect} from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signin.scss";
import { Link } from "react-router-dom";

export default function Signin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="signin">
      <div className="signin__header ">
        <div className="signin__header__logo">
          <img src={logo} alt="" />
        </div>
        <h2>Đăng nhập vào JobQuest</h2>
      </div>
      <div className="signin__body">
        <div className="item">
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Enter your email" />
        </div>
        <div className="item">
          <label htmlFor="">Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button className="btn-signin">Đăng nhập</button>
        <span className="link-signup">
          Bạn chưa có tài khoản ?
          <Link to={"/nguoi-xin-viec/dang-ky"}> Đăng ký</Link>
        </span>
      </div>
    </div>
  );
}
