import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signinCompany.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import checkEmail from "../../config/checkEmail";

export default function SigninCompany() {
  const navigate = useNavigate();

  const { currentCompany, loginCompany } = useAuth();
  const [err, setErr] = useState("");
  const [mess, setMess] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    setErr("");
    if (!checkEmail(inputs.email)) {
      return setErr("Email Không hợp lệ !");
    } else {
      const res = async () => {
        try {
          await loginCompany(inputs);
        } catch (err) {
          setErr("Email hoặc mật khẩu không đúng !");
        }
      };
      res();
    }
  };

  useEffect(() => {
    if (currentCompany) {
      navigate("/");
    }
  }, [currentCompany]);

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
      {err && <p className="err">{err}</p>}
      <div className="signinCompany__body">
        <div className="item">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="item">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button className="btn-signinCompany" onClick={handleSubmit}>
          Đăng nhập
        </button>
        <span className="link-signup">
          Bạn chưa có tài khoản ?
          <Link to={"/nha-tuyen-dung/dang-ky"}> Đăng ký</Link>
        </span>
      </div>
    </div>
  );
}
