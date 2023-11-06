import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signinCompany.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function SigninCompany() {
  const { currentCompany, loginCompany } = useAuth();
  const [err, setErr] = useState("");
  const [mess, setMess] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setErr("");
    setLoading(true);
    const res = async () => {
      try {
        await loginCompany(inputs);
      } catch (err) {
        setErr(err?.response?.data);
      }
    };
    res();
    setLoading(false);
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
          <i class="fa-solid fa-envelope"></i>
          <input
            autocomplete="none"
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
            autocomplete="none"
            type={`${show ? "password" : "text"}`}
            name="password"
            id="password"
            onChange={handleChange}
            placeholder=" "
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
            Đăng nhập
          </button>
        ) : (
          <button className="btn-loading">
            <div className="loading"></div>
          </button>
        )}
        <span className="link-signup">
          Bạn chưa có tài khoản ?
          <Link to={"/nha-tuyen-dung/dang-ky"}> Đăng ký</Link>
        </span>
      </div>
    </div>
  );
}
