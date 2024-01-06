import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./changePassword.scss";
import { useAuth } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default function ChangePassword() {
  const [passwordOld, setPasswordOld] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [showPassOld, setShowPassOld] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser, currentCompany } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const handleSubmit = async () => {
    setErr("");
    if (password !== rePassword) return setErr("Mật khẩu không trùng khớp !");
    if (passwordOld === password) return setErr("Mật khẩu mới không được giống với mật khẩu cũ !");
    setSuccess(false);
    setLoading(true);
    try {
      let res;

      params.type === "nguoi-dung" &&
        (res = await makeRequest.post(`/authUser/changePassword/${currentUser?.id}`, {
          passwordOld,
          password,
        }));

      params.type === "nha-tuyen-dung" &&
        (res = await makeRequest.post(`/authCompany/changePassword/${currentCompany?.id}`, {
          passwordOld,
          password,
        }));

      res.data && setSuccess(true);
      setLoading(false);
      setPassword("");
      setPasswordOld("");
      setRePassword("");
    } catch (err) {
      setErr(err?.response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!(currentCompany || currentUser)) return navigate("/");
    if (!(params.type.includes("nguoi-dung") || params.type.includes("nha-tuyen-dung")))
      return navigate("/");
    if (currentUser && params.type.includes("nha-tuyen-dung")) return navigate("/");
    if (currentCompany && params.type.includes("nguoi-dung")) return navigate("/");
  });

  return (
    <div className="changePassword">
      <div className="changePassword__header ">
        <h4>Thay đổi mật khẩu mới</h4>
        <span>Mật khẩu có ít nhất 6 kí tự.</span>
      </div>
      <div className="changePassword__body">
        <div className="item">
          <i className="fa-solid fa-lock"></i>
          <input
            autoComplete="none"
            type={`${showPassOld ? "text" : "password"}`}
            name="passwordOld"
            id="password"
            value={passwordOld}
            placeholder=" "
            onChange={(e) => setPasswordOld(e.target.value)}
          />
          <label htmlFor="password">Mật khẩu cũ</label>
          <span className="tooglePassword" onClick={() => setShowPassOld(!showPassOld)}>
            {showPassOld ? (
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
            type={`${showPass ? "text" : "password"}`}
            name="password"
            id="password"
            value={password}
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Mật khẩu mới</label>
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
          <label htmlFor="rePassword">Nhập lại mật khẩu mới</label>
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
      <div className="changePassword__control">
        {loading ? (
          <button className="btn-loading">
            <div className="loading"></div>
          </button>
        ) : (
          <button disabled={success ? true : false} className="btn-auth" onClick={handleSubmit}>
            Xác nhận
          </button>
        )}
      </div>
      <span className="link-signup">
        Trở về <Link to={`/`}>Trang chủ</Link>
      </span>
    </div>
  );
}
