import React, { useEffect, useRef, useState } from "react";
import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useAuth } from "../../context/authContext";
import { toast } from "sonner";

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
    if (passwordRef.current.value !== rePasswordRef.current.value)
      return setErr("Nhập lại mật khẩu không trùng khớp.");

    setLoading(true);
    try {
      await makeRequest.post("/authUser/register", inputs);
      // setMess("Đăng ký thành công.");
      toast.success("Đăng ký tài khoản thành công.")
      navigate("/dang-nhap/nguoi-dung");
      setLoading(false);
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
        <h4>Chào mừng bạn đến với JobQuest</h4>
        <span>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</span>
      </div>
      {err && <span className="err">{err}</span>}
      {mess && <p className="mess">{mess}</p>}
      <div className="signup__body">
        <div className="item">
          <i className="fa-solid fa-user"></i>
          <input
            autoComplete="off"
            onChange={handleChange}
            name="name"
            type="text"
            placeholder=" "
            id="name"
          />
          <label htmlFor="name">Họ và tên</label>
        </div>
        <div className="item">
          <i className="fa-solid fa-envelope"></i>
          <input
            autoComplete="off"
            onChange={handleChange}
            name="email"
            type="text"
            placeholder=" "
            id=""
          />
          <label htmlFor="">Email</label>
        </div>
        <div className="item">
          <i className="fa-solid fa-phone"></i>
          <input
            autoComplete="off"
            onChange={handleChange}
            name="phone"
            type="number"
            placeholder=" "
            id="phone"
          />
          <label htmlFor="phone">Số điện thoại</label>
        </div>
        <div className="item">
          <i className="fa-solid fa-lock"></i>
          <input
            autoComplete="off"
            ref={passwordRef}
            onChange={handleChange}
            name="password"
            type={`${showPass ? "password" : "text"}`}
            placeholder=" "
            id="password"
          />
          <label htmlFor="password">Mật khẩu</label>
          <span className="tooglePassword" onClick={() => setShowPass(!showPass)}>
            {showPass ? (
              <i className="fa-regular fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </span>
        </div>
        <div className="item">
          <i className="fa-solid fa-lock"></i>
          <input
            autoComplete="off"
            ref={rePasswordRef}
            name="rePassword"
            type={`${showRePass ? "password" : "text"}`}
            placeholder=" "
            id="repassword"
          />
          <label htmlFor="repassword">Nhập lại mật khẩu</label>
          <span className="tooglePassword" onClick={() => setShowRePass(!showRePass)}>
            {showRePass ? (
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
        <span className="link-signin">
          Bạn đã có tài khoản ?<Link to={"/dang-nhap/nguoi-dung"}> Đăng nhập</Link>
        </span>
      </div>
    </div>
  );
}
