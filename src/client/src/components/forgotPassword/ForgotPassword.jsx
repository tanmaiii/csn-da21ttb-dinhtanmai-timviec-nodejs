import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./forgotPassword.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="forgotPassword">
      <div className="forgotPassword__header ">
        <h4>Quên mật khẩu</h4>
        <span>Vui lòng nhập email đã đăng ký tài khoản.</span>
      </div>
      <div className="forgotPassword__body">
        <div className="item">
          <i className="fa-solid fa-envelope"></i>
          <input autoComplete="none" type="email" name="email" id="email" value={email} placeholder=" " onChange={e => setEmail(e.target.value)}/>
          <label htmlFor="email">Email</label>
        </div>
        {err && (
          <div className="notify-dont-find">
            <i class="fa-solid fa-circle-exclamation"></i>
            <span>
              Chúng tôi không thể tìm thấy địa chỉ email của bạn.Vui lòng gửi lại email bạn đã đăng
              ký.
            </span>
          </div>
        )}
      </div>
      <div className="forgotPassword__control">
        <button className="btn-auth">Gửi</button>
      </div>
      <span className="link-signup">
        Trở về <Link to={"/dang-nhap/nguoi-dung"}> Đăng nhập</Link>
      </span>
    </div>
  );
}
