import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signupCompany.scss";
import { Link, useNavigate } from "react-router-dom";
import {scale} from "../../config/data";
import SearchProvince from "../../components/searchProvince/SearchProvince";
import Select from "../select/Select";
import { makeRequest } from "../../axios";

export default function SignupCompany() {
  const [showPass, setShowPass] = useState(true);
  const [showRePass, setShowRePass] = useState(true);
  const [selectedOptionProvince, setSelectedOptionProvince] = useState();
  const [selectedOptionScale, setSelectedOptionScale] = useState();
  const [provinces , setProvinces] = useState();
  const [err, setErr] = useState();
  const [mess, setMess] = useState();
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    phone: "",
    password: "",
    nameCompany: "",
    nameAdmin: "",
    idProvince: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSumit = async () => {
    setMess("");
    setErr("");
    if (passwordRef.current.value.length < 6)
      return setErr("Mật khẩu từ 6 kí tự trở lên.");
    if (passwordRef.current.value !== rePasswordRef.current.value)
      return setErr("Nhập lại mật khẩu không trùng khớp.");
    if (!selectedOptionScale || !selectedOptionProvince)
      return setErr("Chọn quy mô mà địa chỉ.");
    try {
      setLoading(true);
      inputs.scale = selectedOptionScale.name;
      inputs.idProvince = selectedOptionProvince.pId;
      console.log(inputs);
      await makeRequest.post("/authCompany/register", inputs);
      setMess("Đăng ký thành công.");
      navigate("/nha-tuyen-dung/dang-nhap");
    } catch (err) {
      setErr(err?.response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const res = await makeRequest("/provinces");
        setProvinces(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProvinces();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [err]);

  return (
    <div className="signupCompany">
      <div className="signupCompany__header ">
        <div className="signupCompany__header__logo">
          <img src={logo} alt="" />
        </div>
        <h4>Nhà tuyển dụng đăng ký</h4>
      </div>
      {err && <span className="err">{err}</span>}
      {mess && <span className="mess">{mess}</span>}
      <div className="signupCompany__body">
        <h4 className="header">Thông tin đăng nhập</h4>
        <div className="item">
          <i class="fa-solid fa-envelope"></i>
          <input
            onChange={handleChange}
            placeholder=" "
            autoComplete="none"
            id="email"
            name="email"
            type="text"
            value={inputs.email}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="item">
          <i class="fa-solid fa-phone"></i>
          <input
            onChange={handleChange}
            placeholder=" "
            autoComplete="none"
            id="phone"
            name="phone"
            type="text"
            value={inputs.phone}
          />
          <label htmlFor="phone">Số điện thoại</label>
        </div>
        <div className="item">
          <i class="fa-solid fa-lock"></i>
          <input
            onChange={handleChange}
            placeholder=" "
            autoComplete="none"
            id="password"
            name="password"
            value={inputs.password}
            ref={passwordRef}
            type={`${showPass ? "password" : "text"}`}
          />
          <label htmlFor="password">Mật khẩu</label>
          <span
            className="tooglePassword"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <i className="fa-regular fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </span>
        </div>
        <div className="item">
          <i class="fa-solid fa-lock"></i>
          <input
            placeholder=" "
            autoComplete="none"
            id="repassword"
            ref={rePasswordRef}
            type={`${showRePass ? "password" : "text"}`}
          />
          <label htmlFor="repassword">Nhập lại mật khẩu</label>
          <span
            className="tooglePassword"
            onClick={() => setShowRePass(!showRePass)}
          >
            {showRePass ? (
              <i className="fa-regular fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </span>
        </div>
        <h4 className="header">Thông tin công ty</h4>
        <div className="item">
          <i class="fa-solid fa-building"></i>
          <input
            onChange={handleChange}
            placeholder=" "
            autoComplete="none"
            id="nameCompany"
            name="nameCompany"
            type="text"
            value={inputs.nameCompany}
          />
          <label htmlFor="nameCompany">Tên công ty</label>
        </div>
        <div className="item">
          <i class="fa-solid fa-user"></i>
          <input
            onChange={handleChange}
            placeholder=" "
            autoComplete="none"
            id="nameAdmin"
            name="nameAdmin"
            type="text"
            value={inputs.nameAdmin}
          />
          <label htmlFor="nameAdmin">Tên người đại diện</label>
        </div>
        <div className="item">
          <div className="item__scale">
            <Select
              placeholder="Quy mô"
              options={scale}
              selectedOption={selectedOptionScale}
              setSelectedOption={setSelectedOptionScale}
            />
          </div>
        </div>
        <div className="item">
          <div className="item__province">
            <Select
              placeholder="Địa chỉ"
              options={provinces}
              selectedOption={selectedOptionProvince}
              setSelectedOption={setSelectedOptionProvince}
            />
          </div>
        </div>
        {!loading ? (
          <button className="btn-auth" onClick={handleSumit}>
            Đăng ký
          </button>
        ) : (
          <button className="btn-loading">
            <div className="loading"></div>
          </button>
        )}
        <span className="link-signin">
          Bạn đã có tài khoản ?
          <Link to={"/nha-tuyen-dung/dang-nhap"}> Đăng nhập</Link>
        </span>
      </div>
    </div>
  );
}