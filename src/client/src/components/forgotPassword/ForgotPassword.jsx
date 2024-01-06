import React, { useState } from "react";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import "./forgotPassword.scss";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import queryString from "query-string";
import { useEffect } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const getEmail = async () => {
    setErr(null);
    setSuccess(false);
    setLoading(true);
    if (!email?.length) return setErr("Vui lòng nhập email !");
    try {
      let res;
      params.type === "nguoi-dung"
        ? (res = await makeRequest.post("/authUser/forgot", { email }))
        : (res = await makeRequest.post("/authCompany/forgot", { email }));
      setEmail("");
      res.data && setSuccess(true);
      setLoading(false);
    } catch (err) {
      setErr(err?.response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!(params.type === "nguoi-dung" || params.type === "nha-tuyen-dung")) return navigate('/')
  },[])

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
            <div className="notify__succ">
              <i className="fa-regular fa-envelope"></i>
              <span>Vui lòng kiểm tra email và xác nhận, có hiệu lực trong 60s.</span>
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
      <div className="forgotPassword__control">
        {loading ? (
          <button className="btn-loading">
            <div className="loading"></div>
          </button>
        ) : (
          <button
            disabled={success ? true : false}
            className="btn-auth"
            onClick={() => getEmail()}
          >
            Gửi
          </button>
        )}
      </div>
      <span className="link-signup">
        Trở về
        <Link to={`/dang-nhap/${params.type === "nguoi-dung" ? "nguoi-dung" : "nha-tuyen-dung"}`}>
          Đăng nhập
        </Link>
      </span>
    </div>
  );
}
