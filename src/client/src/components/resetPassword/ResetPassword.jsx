import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./resetPassword.scss";

export default function ResetPassword() {
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="resetPassword">
      <div className="resetPassword__header ">
        <h4>Tạo mật khẩu mới</h4>
        <span>Mật khẩu có ít nhất 6 kí tự.</span>
      </div>
      <div className="resetPassword__body">
        <div className="item">
          <i className="fa-solid fa-lock"></i>
          <input
            autoComplete="none"
            type={`${showPass ? "text" : "password"}`}
            name="password"
            id="password"
            value={password}
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Mật khẩu</label>
          <span className="tooglePassword" onClick={() => setShowPass(!showPass)}>
            {showPass ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-regular fa-eye"></i>
            )}
          </span>
        </div>
        <div className="item">
          <i className="fa-solid fa-lock"></i>
          <input
            autoComplete="none"
            type={`${showRePass ? "text" : "password"}`}
            name="rePassword"
            id="rePassword"
            value={rePassword}
            placeholder=" "
            onChange={(e) => setRePassword(e.target.value)}
          />
          <label htmlFor="rePassword">Nhập lại mật khẩu</label>
          <span className="tooglePassword" onClick={() => setRePassword(!showRePass)}>
            {showRePass ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-regular fa-eye"></i>
            )}
          </span>
        </div>
      </div>
      <div className="resetPassword__control">
        <button className="btn-auth">Xác nhận</button>
      </div>
      <span className="link-signup">
        Trở về <Link to={"/dang-nhap/nguoi-dung"}> Đăng nhập</Link>
      </span>
    </div>
  );
}
