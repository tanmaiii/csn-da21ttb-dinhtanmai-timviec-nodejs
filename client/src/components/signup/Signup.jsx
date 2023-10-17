import React from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signup.scss";

export default function Signup() {
  return (
    <div className="signup">
      <div className="signup__header ">
        <div className="signup__header__logo">
          <img src={logo} alt="" />
        </div>
        <h2>Đăng ký tham gia JobQuest</h2>
      </div>
      <div className="signup__body">
        <div className="item">
          <label htmlFor="">Họ và tên</label>
          <input type="text" placeholder="Enter your name" />
        </div>
        <div className="item">
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Enter your email" />
        </div>
        <div className="item">
          <label htmlFor="">Số điện thoại</label>
          <input type="text" placeholder="Enter your phone number" />
        </div>
        <div className="item">
          <label htmlFor="">Mật khẩu</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <div className="item">
          <label htmlFor="">Nhập lại mật khẩu</label>
          <input type="password" placeholder="Enter your password again" />
        </div>
        <button className="btn-signup">Đăng ký</button>
        <span className="link-signin">
          Bạn đã có tài khoản ?<h4> Đăng nhập</h4>
        </span>
      </div>
    </div>
  );
}
