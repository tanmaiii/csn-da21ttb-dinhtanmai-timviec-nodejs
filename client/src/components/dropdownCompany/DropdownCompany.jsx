import React, { useEffect, useRef, useState } from "react";
import "./dropdownCompany.scss";
import img from "../../assets/images/Microsoft_logo.png";
import { Link, useLocation } from "react-router-dom";

export default function DropdownCompany() {
  const id = 123; //fake
  const [openMenuUser, setOpenMenuUser] = useState(false);
  const dropdownCompanyRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!dropdownCompanyRef.current.contains(e.target)) {
        setOpenMenuUser(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  });

  useEffect(() => {
    setOpenMenuUser(false);
  }, [location]);

  return (
    <div className="dropdownCompany" ref={dropdownCompanyRef}>
      <div
        className="dropdownCompany__toogle"
        onClick={() => setOpenMenuUser(!openMenuUser)}
      >
        <img src={img} alt="" />
        <span>Tấn Mãi</span>
      </div>
        <div
          className={`dropdownCompany__dropdown ${openMenuUser ? "open" : ""}`}
        >
          <Link
            to={`/cong-ty/${id}`}
            className="dropdownCompany__dropdown__option"
          >
            <i class="fa-regular fa-user"></i>
            <span>Trang cá nhân</span>
          </Link>
          <Link
            to={`/cong-ty/${id}/?tag=jobs`}
            className="dropdownCompany__dropdown__option"
          >
            <i class="fa-regular fa-rectangle-list"></i>
            <span>Việc làm của bạn</span>
          </Link>
          <Link
            to={"/cong-ty/ung-vien"}
            className="dropdownCompany__dropdown__option"
          >
            <i class="fa-regular fa-address-card"></i>
            <span>Đơn ứng tuyển</span>
          </Link>
          <Link
            to={"/cong-ty/dang-bai"}
            className="dropdownCompany__dropdown__option"
          >
            <i class="fa-solid fa-plus"></i>
            <span>Đăng ứng tuyển</span>
          </Link>
          <hr />
          <Link className="dropdownCompany__dropdown__option dropdownCompany__dropdown__option__logout">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Đăng xuất</span>
          </Link>
        </div>
    </div>
  );
}
