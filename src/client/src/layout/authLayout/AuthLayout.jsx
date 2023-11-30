import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import "./authLayout.scss";
import img1 from "../../assets/images/gradient1.jpg";
import img2 from "../../assets/images/gradient2.jpg";
import logo from "../../assets/images/logoJobQuest.png";
import { useMode } from "../../context/ModeContext";
import { Link } from "react-router-dom";

export default function AuthLayout() {
  const { darkMode } = useMode();
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
  });

  return (
    <div className="layout__auth">
      <div
        className="layout__auth__main"
        style={{ backgroundImage: `url(${darkMode ? img2 : img1})` }}
      >
        <div className="container">
          <div className="layout__auth__main__control">
            <button onClick={() => navigate('/')}>
              <i className="fa-solid fa-chevron-left"></i>
              <span>Trang chủ</span>
            </button>
          </div>
          <div className="layout__auth__main__content">
            <div className="layout__auth__main__content__logo">
              <img src={logo} alt="" />
              <h2>JobQuest</h2>
            </div>
            <div className="layout__auth__main__content__box">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
