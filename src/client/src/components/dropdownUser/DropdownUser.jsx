import React, { useEffect, useRef, useState } from "react";
import "./dropdownUser.scss";
import avatar from "../../assets/images/avatar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { apiImage } from "../../axios";

export default function DropdownUser() {
  const [openMenuUser, setOpenMenuUser] = useState(false);
  const dropdownUserRef = useRef();
  const location = useLocation();
  const { logoutUser, currentUser } = useAuth();
  const id = currentUser?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!dropdownUserRef?.current?.contains(e.target)) {
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
    <div className="dropdownUser" ref={dropdownUserRef}>
      <div className="dropdownUser__toogle" onClick={() => setOpenMenuUser(!openMenuUser)}>
        <div className="dropdownUser__toogle__text">
          <img
            src={currentUser?.avatarPic ? apiImage + currentUser?.avatarPic : avatar}
            onError={(e) => (e.target.src = avatar)}
            alt={currentUser?.avatarPic}
          />
          <span>{currentUser?.name}</span>
        </div>
        <i class="fa-solid fa-angle-down"></i>
      </div>
      <div className={`dropdownUser__dropdown ${openMenuUser ? "open" : ""}`}>
        <Link to={`/nguoi-dung/${id}`} className="dropdownUser__dropdown__option">
          <i className="fa-regular fa-user"></i>
          <span>Trang cá nhân</span>
        </Link>
        <Link to={`/nguoi-dung/${id}/info`} className="dropdownUser__dropdown__option">
          <i className="fa-regular fa-id-badge"></i>
          <span>Thông tin</span>
        </Link>
        <Link to={`/nguoi-dung/${id}/apply`} className="dropdownUser__dropdown__option">
          <i className="fa-regular fa-paper-plane"></i>
          <span>Ứng tuyển</span>
        </Link>
        <Link to={`/nguoi-dung/${id}/jobs`} className="dropdownUser__dropdown__option">
          <i className="fa-regular fa-bookmark"></i>
          <span>Việc làm</span>
        </Link>
        <Link to={`/nguoi-dung/${id}/companies`} className="dropdownUser__dropdown__option">
          <i className="fa-regular fa-heart"></i>
          <span>Theo dõi</span>
        </Link>
        <hr />
        <Link to={`/doi-mat-khau?type=nguoi-dung`} className="dropdownUser__dropdown__option">
          <i class="fa-solid fa-rotate-right"></i>
          <span>Đổi mật khẩu</span>
        </Link>
        <button
          onClick={() => logoutUser()}
          className="dropdownUser__dropdown__option dropdownUser__dropdown__option__logout"
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
