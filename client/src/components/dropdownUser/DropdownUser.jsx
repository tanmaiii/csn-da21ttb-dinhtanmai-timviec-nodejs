import React, { useEffect, useRef, useState } from "react";
import "./dropdownUser.scss";
import img from "../../assets/images/Microsoft_logo.png";
import { Link, useLocation } from "react-router-dom";

export default function DropdownUser() {
  const id = 123; //fake
  const [openMenuUser, setOpenMenuUser] = useState(false);
  const dropdownUserRef = useRef();
  const location = useLocation();

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
        <img src={img} alt="" />
        <span>Tấn Mãi</span>
      </div>
        <div className={`dropdownUser__dropdown ${openMenuUser ? 'open' : ''}`}>
          <Link
            to={`/nguoi-dung/${id}`}
            className="dropdownUser__dropdown__option"
          >
            <i class="fa-regular fa-user"></i>
            <span>Trang cá nhân</span>
          </Link>
          <Link
            to={`/nguoi-dung/${id}/?tag=apply`}
            className="dropdownUser__dropdown__option"
          >
            <i class="fa-regular fa-paper-plane"></i>
            <span>Ứng tuyển</span>
          </Link>
          <Link
            to={`/nguoi-dung/${id}/?tag=jobs`}
            className="dropdownUser__dropdown__option"
          >
            <i class="fa-regular fa-bookmark"></i>
            <span>Việc làm</span>
          </Link>
          <Link
            to={`/nguoi-dung/${id}/?tag=companies`}
            className="dropdownUser__dropdown__option"
          >
            <i class="fa-regular fa-heart"></i>
            <span>Theo dõi</span>
          </Link>
          <hr />
          <Link className="dropdownUser__dropdown__option dropdownUser__dropdown__option__logout">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Đăng xuất</span>
          </Link>
        </div>
    </div>
  );
}