import React, { useEffect } from "react";
import img from "../../assets/images/auth.png";
import logo from "../../assets/images/logoJobQuest.png";
import "./auth.scss";

import { Outlet } from "react-router-dom";

export default function Auth() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="auth">
      <h2>Tham gia ngay hôm nay</h2>
      <div className="container">
        <div className="auth__container">
          <div className="auth__container__left col pc-6 t-5 m-0">
            <img src={img} alt="" />
          </div>
          <div className="auth__container__right col pc-6 t-7 m-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
