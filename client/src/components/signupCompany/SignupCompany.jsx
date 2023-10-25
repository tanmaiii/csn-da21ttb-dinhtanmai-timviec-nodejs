import React, {useEffect} from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signupCompany.scss";
import { Link } from "react-router-dom";

export default function SignupCompany() {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <div className="signupCompany">
      <div className="signupCompany__header ">
        <div className="signupCompany__header__logo">
          <img src={logo} alt="" />
        </div>
        <h2>Nhà tuyển dụng đăng ký</h2>
      </div>
      <div className="signupCompany__body">
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
        <button className="btn-signupCompany">Đăng ký</button>
        <span className="link-signin">
          Bạn đã có tài khoản ?<Link to={"/nha-tuyen-dung/dang-nhap"}> Đăng nhập</Link>
        </span>
      </div>
    </div>
  );
}
