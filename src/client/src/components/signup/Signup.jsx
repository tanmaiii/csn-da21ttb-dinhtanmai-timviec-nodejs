import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useAuth } from "../../context/authContext";

export default function Signup() {
  const [err, setErr] = useState();
  const [mess, setMess] = useState();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [showRePass, setShowRePass] = useState(true);
  const rePasswordRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setErr("");
    setMess("");
    if (passwordRef.current.value.length < 6)
      return setErr("Mật khẩu từ 6 kí tự trở lên.");
    if (passwordRef.current.value !== rePasswordRef.current.value)
      return setErr("Nhập lại mật khẩu không trùng khớp.");
    try {
      setLoading(true);
      await makeRequest.post("/authUser/register", inputs);
      setMess("Đăng ký thành công.");
      navigate("/nguoi-dung/dang-nhap");
      setInputs("");
    } catch (err) {
      setErr(err?.response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) return navigate("/");
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="signup">
      <div className="signup__header ">
        <div className="signup__header__logo">
          <img src={logo} alt="" />
        </div>
        <h2>Đăng ký tham gia JobQuest</h2>
      </div>
      {err && <p className="err">{err}</p>}
      {mess && <p className="mess">{mess}</p>}
      <div className="signup__body">
        <div className="item">
          <i class="fa-solid fa-user"></i>
          <input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder=" "
            id="name"
          />
          <label htmlFor="name">Họ và tên</label>
        </div>
        <div className="item">
          <i class="fa-solid fa-envelope"></i>
          <input
            onChange={handleChange}
            name="email"
            type="text"
            placeholder=" "
            id=""
          />
          <label htmlFor="">Email</label>
        </div>
        <div className="item">
          <i class="fa-solid fa-phone"></i>
          <input
            onChange={handleChange}
            name="phone"
            type="text"
            placeholder=" "
            id="phone"
          />
          <label htmlFor="phone">Số điện thoại</label>
        </div>
        <div className="item">
          <i class="fa-solid fa-lock"></i>
          <input
            ref={passwordRef}
            onChange={handleChange}
            name="password"
            type={`${showPass ? "password" : "text"}`}
            placeholder=" "
            id="password"
          />
          <label htmlFor="password">Mật khẩu</label>
          <span
            className="tooglePassword"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <i class="fa-regular fa-eye"></i>
            ) : (
              <i class="fa-solid fa-eye-slash"></i>
            )}
          </span>
        </div>
        <div className="item">
          <i class="fa-solid fa-lock"></i>
          <input
            ref={rePasswordRef}
            name="rePassword"
            type={`${showRePass ? "password" : "text"}`}
            placeholder=" "
            id="repassword"
          />
          <label htmlFor="repassword">Nhập lại mật khẩu</label>
          <span
            className="tooglePassword"
            onClick={() => setShowRePass(!showRePass)}
          >
            {showRePass ? (
              <i class="fa-regular fa-eye"></i>
            ) : (
              <i class="fa-solid fa-eye-slash"></i>
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
        <span className="link-signin">
          Bạn đã có tài khoản ?
          <Link to={"/nguoi-dung/dang-nhap"}> Đăng nhập</Link>
        </span>
      </div>
    </div>
  );
}
