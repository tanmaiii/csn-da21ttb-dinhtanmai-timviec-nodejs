import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./forgotPassword.scss";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const getEmail = async () => {
    setErr(false);
    setSuccess(false);
    try {
      const res = await makeRequest.post("/user/forgot", { email });
      res.data && setSuccess(true);
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="forgotPassword">
      <div className="forgotPassword__header ">
        <h4>Quên mật khẩu</h4>
        <span>Vui lòng nhập email đã đăng ký tài khoản.</span>
      </div>
      <div className="forgotPassword__body">
        <div className="item">
          <i className="fa-solid fa-envelope"></i>
          <input
            autoComplete="off"
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className={`${(success && "notify") || (err && "notify")}`}>
          {success && (
            <div className="notify__check-email">
              <i className="fa-regular fa-envelope"></i>
              <span>Vui lòng kiểm tra email và xác nhận, có hiệu lực trong 60s.</span>
            </div>
          )}
          {err && (
            <div className="notify__dont-find">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>
                Chúng tôi không thể tìm thấy địa chỉ email của bạn.Vui lòng gửi lại email bạn đã
                đăng ký.
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="forgotPassword__control">
        <button disabled={success ? true : false} className="btn-auth" onClick={() => getEmail()}>
          Gửi
        </button>
      </div>
      <span className="link-signup">
        Trở về <Link to={"/dang-nhap/nguoi-dung"}> Đăng nhập</Link>
      </span>
    </div>
  );
}
