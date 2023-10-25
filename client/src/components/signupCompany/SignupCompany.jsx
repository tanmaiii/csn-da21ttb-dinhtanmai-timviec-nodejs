import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logoJobQuest.png";
import "./signupCompany.scss";
import { Link } from "react-router-dom";
import province from "../../config/province";
import scale from '../../config/scale'
import SearchProvince from "../../components/searchProvince/SearchProvince";



export default function SignupCompany() {
  const [openScale, setOpenScale] = useState(false);
  const [scaleActive, setScaleActive] = useState("Số lượng");
  const listScaleRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let handleMousedown = (e) => {
      if (!listScaleRef.current.contains(e.target)) {
        setOpenScale(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => {
      document.removeEventListener("mousedown", handleMousedown);
    };
  });

  return (
    <div className="signupCompany">
      <div className="signupCompany__header ">
        <div className="signupCompany__header__logo">
          <img src={logo} alt="" />
        </div>
        <h4>Nhà tuyển dụng đăng ký</h4>
      </div>
      <div className="signupCompany__body">
        <h4 className="header">Thông tin đăng nhập</h4>
        <div className="item">
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Email" />
        </div>
        <div className="item">
          <label htmlFor="">Mật khẩu</label>
          <input type="password" placeholder="Mật Khẩu" />
        </div>
        <div className="item">
          <label htmlFor="">Nhập lại mật khẩu</label>
          <input type="password" placeholder="Nhập lại mật khẩu" />
        </div>
        <h4 className="header">Thông tin công ty</h4>
        <div className="item">
          <label htmlFor="">Tên công ty</label>
          <input type="text" placeholder="Enter your phone number" />
        </div>
        <div className="item">
          <label htmlFor="">Tên người đại diện</label>
          <input type="text" placeholder="Tên người đại diện" />
        </div>
        <div className="item">
          <label htmlFor="">Quy mô</label>
          <div className="item__scale" ref={listScaleRef}>
            <div
              className="item__scale__header"
              onClick={() => setOpenScale(!openScale)}
            >
              <span>{scaleActive} nhân viên</span>
              <i class="fa-solid fa-sort-down"></i>
            </div>
            {openScale && (
              <div className="item__scale__list">
                {scale.map((item, i) => (
                  <span
                    key={i}
                    onClick={() => setScaleActive(item.name)}
                    className={`${scaleActive === item.name && "active"}`}
                  >
                    {item.name} nhân viên
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="item">
          <label htmlFor="">Địa chỉ</label>
          <div className="item__province">
            <SearchProvince />
          </div>
        </div>
        <button className="btn-signupCompany">Đăng ký</button>
        <span className="link-signin">
          Bạn đã có tài khoản ?
          <Link to={"/nha-tuyen-dung/dang-nhap"}> Đăng nhập</Link>
        </span>
      </div>
    </div>
  );
}
