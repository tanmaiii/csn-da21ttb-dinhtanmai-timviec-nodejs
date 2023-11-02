import React, { useEffect, useRef, useState } from "react";
import "./dropdownUser.scss";
import avt from "../../assets/images/avatar.png";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function DropdownUser() {
  const [openMenuUser, setOpenMenuUser] = useState(false);
  const dropdownUserRef = useRef();
  const location = useLocation();
  const { logoutUser, currentUser } = useAuth();
  const id = currentUser?.id;

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!dropdownUserRef.current.contains(e.target)) {
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
      <div
        className="dropdownUser__toogle"
        onClick={() => setOpenMenuUser(!openMenuUser)}
      >
        <img src={currentUser.avatarPic ? currentUser.avatarPic : avt} alt="" />
        <span>Tấn Mãi</span>
      </div>
      <div className={`dropdownUser__dropdown ${openMenuUser ? "open" : ""}`}>
        <Link
          to={`/nguoi-dung/${id}`}
          className="dropdownUser__dropdown__option"
        >
          <i className="fa-regular fa-user"></i>
          <span>Trang cá nhân</span>
        </Link>
        <Link
          to={`/nguoi-dung/${id}/?tag=apply`}
          className="dropdownUser__dropdown__option"
        >
          <i className="fa-regular fa-paper-plane"></i>
          <span>Ứng tuyển</span>
        </Link>
        <Link
          to={`/nguoi-dung/${id}/?tag=jobs`}
          className="dropdownUser__dropdown__option"
        >
          <i className="fa-regular fa-bookmark"></i>
          <span>Việc làm</span>
        </Link>
        <Link
          to={`/nguoi-dung/${id}/?tag=companies`}
          className="dropdownUser__dropdown__option"
        >
          <i className="fa-regular fa-heart"></i>
          <span>Theo dõi</span>
        </Link>
        <hr />
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
