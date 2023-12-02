import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./resetPassword.scss";
import { useAuth } from "../../context/authContext";
import { makeRequest } from "../../axios";

export default function ResetPassword() {
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
  const { currentUser, currentCompany } = useAuth();
  const navigate = useNavigate();

  const { id, token } = useParams();

  const handleSubmit = async () => {
    setSuccess(false);
    setErr("");
    if (password !== rePassword) return setErr("Mật khẩu không trùng khớp !");
    try {
      const res = await makeRequest.post(`/user/resetPassword/${id}/${token}`, { password });
      res.data && setSuccess(true);
      setPassword('')
      setRePassword('')
    } catch (error) {
      setErr("Lỗi! Vui lòng xác nhận lại email.");
    }
  };

  useEffect(() => {
    if (currentUser || currentCompany) return navigate("/");
  });

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
          <span className="tooglePassword" onClick={() => setShowRePass(!showRePass)}>
            {showRePass ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-regular fa-eye"></i>
            )}
          </span>
        </div>
        <div className={`${(success && "notify") || (err && "notify")}`}>
          {success && (
            <div className="notify__check-email">
              <i className="fa-regular fa-circle-check"></i>
              <span>Thay đổi mật khẩu thành công.</span>
            </div>
          )}
          {err && (
            <div className="notify__err">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{err}</span>
            </div>
          )}
        </div>
      </div>
      <div className="resetPassword__control">
        <button disabled={success ? true: false} className="btn-auth" onClick={handleSubmit}>
          Xác nhận
        </button>
      </div>
      <span className="link-signup">
        Trở về <Link to={"/dang-nhap/nguoi-dung"}> Đăng nhập</Link>
      </span>
    </div>
  );
}
