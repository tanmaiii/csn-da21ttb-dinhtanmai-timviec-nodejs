import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signin.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async () => {
    setLoading(true);
    setErr("");
    try {
      await loginUser(inputs);
      setLoading(false);
    } catch (err) {
      setErr(err?.response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        handleSubmit();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [inputs]);

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
        <h4>Chào mừng bạn đã quay trở lại</h4>
        <span>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</span>
      </div>
      {err && <p className="err">{err}</p>}
      <div className="signin__body">
        <div className="item">
          <i className="fa-solid fa-envelope"></i>
          <input
            autoComplete="off"
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="item">
          <i className="fa-solid fa-lock"></i>
          <input
            autoComplete="off"
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

        <div className="reset">
          <Link to={"/quen-mat-khau?type=nguoi-dung"}>Quên mật khẩu ?</Link>
        </div>

        {loading ? (
          <button className="btn-loading">
            <div className="loading"></div>
          </button>
        ) : (
          <button className="btn-auth" onClick={handleSubmit}>
            Đăng nhập
          </button>
        )}

        <span className="link-signup">
          Bạn chưa có tài khoản ?<Link to={"/dang-ky/nguoi-dung"}> Đăng ký</Link>
        </span>
      </div>
    </div>
  );
}
