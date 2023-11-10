import React, { useEffect, useRef, useState } from "react";
import "./dropdownCompany.scss";
import avatar from "../../assets/images/avatar.png";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { apiImage } from "../../axios";

export default function DropdownCompany() {
  const [openMenuUser, setOpenMenuUser] = useState(false);
  const dropdownCompanyRef = useRef();
  const location = useLocation();
  const { logoutCompany, currentCompany } = useAuth();
  const id = currentCompany?.id;

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!dropdownCompanyRef.current?.contains(e.target)) {
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
        <img
          src={
            currentCompany.avatarPic
              ? apiImage + currentCompany.avatarPic
              : avatar
          }
          alt=""
        />
        <span>{currentCompany.nameCompany}</span>
      </div>
      <div
        className={`dropdownCompany__dropdown ${openMenuUser ? "open" : ""}`}
      >
        <Link
          to={`/nha-tuyen-dung/${id}`}
          className="dropdownCompany__dropdown__option"
        >
          <i className="fa-regular fa-user"></i>
          <span>Trang cá nhân</span>
        </Link>

        <Link
          to={`/nha-tuyen-dung/${id}/jobs`}
          className="dropdownCompany__dropdown__option"
        >
          <i className="fa-regular fa-rectangle-list"></i>
          <span>Việc làm của bạn</span>
        </Link>
        <Link
          to={`/nha-tuyen-dung/${id}/info`}
          className="dropdownCompany__dropdown__option"
        >
         <i className="fa-regular fa-id-badge"></i>
          <span>Thông tin cá nhân</span>
        </Link>
        <Link
          to={"/nha-tuyen-dung/ung-vien"}
          className="dropdownCompany__dropdown__option"
        >
          <i className="fa-regular fa-address-card"></i>
          <span>Đơn ứng tuyển</span>
        </Link>
        <Link
          to={"/nha-tuyen-dung/dang-bai"}
          className="dropdownCompany__dropdown__option"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Đăng ứng tuyển</span>
        </Link>
        <hr />
        <button
          onClick={() => logoutCompany()}
          className="dropdownCompany__dropdown__option dropdownCompany__dropdown__option__logout"
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
