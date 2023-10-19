import React, { useEffect, useRef, useState } from "react";
import img from "../../assets/images/logoJobQuest.png";
import { Link } from "react-router-dom";
import "./header.scss";
import { useMode } from "../../context/ModeContext";
import { HiOutlineHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaRegBuilding } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

export default function Header() {
  const { darkMode, toggleDarkMode } = useMode();
  const [openLogin, setOpenLogin] = useState(false);
  const headerRef = useRef();

  const navigate = useNavigate();

  const handleReloadPage = () => {
    navigate("/");
    window.location.reload();
  };

  // useEffect(() => {
  //   const shinkHeader = () => {
  //     if (
  //       document.body.scrollTop > 100 ||
  //       document.documentElement.scrollTop > 100
  //     ) {
  //       headerRef.current.classList.add("shrink");
  //     } else {
  //       headerRef.current.classList.remove("shrink");
  //     }
  //     window.addEventListener("scroll", shinkHeader);
  //   };

  //   shinkHeader();

  //   return () => {
  //     window.removeEventListener("scroll", shinkHeader());
  //   };
  // }, []);

  return (
    <>
      <div className="header">
        <div className="header__wrapper" ref={headerRef}>
          <div className="container">
            <div className="header__wrapper__logo" onClick={handleReloadPage}>
              <img src={img} alt="" />
              <h2>JobQuest</h2>
            </div>

            <div className="header__wrapper__control">
              <ul>
                <li>
                  <Link className="active" to={'/'}>
                    <HiOutlineHome />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link  to={'/tim-viec'}>
                    <BiSearch />
                    <span>Tìm việc</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/danh-gia'}>
                    <FaRankingStar /> 
                    <span>Đánh giá</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/cong-ty'}>
                    <FaRegBuilding />
                    <span>Công ty</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="header__wrapper__auth">
              <button
                className="header__wrapper__auth__darkMode"
                onClick={() => toggleDarkMode()}
              >
                {darkMode ? (
                  <i class="fa-regular fa-sun"></i>
                ) : (
                  <i class="fa-solid fa-moon"></i>
                )}
              </button>
              <button className="header__wrapper__auth__user">
                <Link to={"/nguoi-xin-viec/dang-nhap"}>Đăng nhập</Link>
              </button>
              <div className="header__wrapper__auth__company">
                <Link>Nhà tuyển dụng</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
