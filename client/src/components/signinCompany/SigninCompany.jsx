import React,{useEffect} from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signinCompany.scss";
import { Link } from "react-router-dom";

export default function SigninCompany() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="signinCompany">
      <div className="signinCompany__header ">
        <div className="signinCompany__header__logo">
          <img src={logo} alt="" />
        </div>
        <h2>Nhà tuyển dụng đăng nhập.</h2>
      </div>
      <div className="signinCompany__body">
        <div className="item">
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Enter your email" />
        </div>
        <div className="item">
          <label htmlFor="">Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button className="btn-signinCompany">Đăng nhập</button>
        <span className="link-signup">
          Bạn chưa có tài khoản ?
          <Link to={"/nha-tuyen-dung/dang-ky"}> Đăng ký</Link>
        </span>
      </div>
    </div>
  );
}
