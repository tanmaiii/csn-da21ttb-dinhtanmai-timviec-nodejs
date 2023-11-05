import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signin.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import checkEmail from "../../config/checkEmail";

export default function Signin() {
  const { loginUser, currentUser } = useAuth();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setErr("");
    const res = async () => {
      try {
        await loginUser(inputs);
      } catch (err) {
        setErr(err?.response?.data);
      }
    };
    setLoading(false);
    res();
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
          <i class="fa-solid fa-envelope"></i>
          <input
            autoComplete="none"
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="item">
          <i class="fa-solid fa-lock"></i>
          <input
            autoComplete="none"
            type={`${show ? "password" : "text"}`}
            name="password"
            onChange={handleChange}
            placeholder=" "
            id="password"
          />
          <label htmlFor="password">Password</label>
          <span className="tooglePassword" onClick={() => setShow(!show)}>
            {show ? (
              <i className="fa-regular fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </span>
        </div>
        {!loading ? (
          <button className="btn-auth" onClick={handleSubmit}>
            Đăng ký
          </button>
        ) : (
          <button className="btn-loading">
            <div className="loading"></div>
          </button>
        )}

        <span className="link-signup">
          Bạn chưa có tài khoản ?
          <Link to={"/nguoi-dung/dang-ky"}> Đăng ký</Link>
        </span>
      </div>
    </div>
  );
}
