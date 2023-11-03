import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signin.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import checkEmail from "../../config/checkEmail";

export default function Signin() {
  const { loginUser, currentUser } = useAuth();
  const navigate = useNavigate();
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
          await loginUser(inputs);
        } catch (err) {
          setErr("Email hoặc mật khẩu không đúng !");
        }
      };
      res();
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

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
      {err && <p className="err">{err}</p>}
      <div className="signin__body">
        <div className="item">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button className="btn-signin" onClick={handleSubmit}>
          Đăng nhập
        </button>
        <span className="link-signup">
          Bạn chưa có tài khoản ?
          <Link to={"/nguoi-dung/dang-ky"}> Đăng ký</Link>
        </span>
      </div>
    </div>
  );
}
