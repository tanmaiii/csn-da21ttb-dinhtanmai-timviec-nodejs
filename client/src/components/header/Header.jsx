import React, { useEffect, useRef, useState } from "react";
import img from "../../assets/images/logoJobQuest.png";
import { Link } from "react-router-dom";
import "./header.scss";
import { useMode } from "../../context/ModeContext";
import Modal from "../modal/Modal";
import Signin from "../signin/Signin";
import Signup from "../signup/Signup";

export default function Header() {
  const { darkMode, toggleDarkMode } = useMode();
  const [openLogin, setOpenLogin] = useState(false)
  const headerRef = useRef();

  const handleReloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    const shinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
      window.addEventListener("scroll", shinkHeader);
    };

    shinkHeader();

    return () => {
      window.removeEventListener("scroll", shinkHeader());
    };
  }, []);

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
                  <Link className="active">Tìm việc</Link>
                </li>
                <li>
                  <Link>Đánh giá</Link>
                </li>
                <li>
                  <Link>Công ty</Link>
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
                <Link>Đăng nhập</Link>
              </button>
              <div className="header__wrapper__auth__company">
                <Link>Nhà tuyển dụng</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal/>
    </>
  );
}
