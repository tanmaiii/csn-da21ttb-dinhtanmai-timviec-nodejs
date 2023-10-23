import React, { useEffect } from "react";
import img from "../../assets/images/auth.png";
import logo from "../../assets/images/logoJobQuest.png";
import "./authUser.scss";

import { Outlet } from "react-router-dom";

export default function AuthUser() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="authUser">
      <h2>Tham gia ngay hôm nay</h2>
      <div className="authUser__container">
        <div className="authUser__container__left">
          <img src={img} alt="" />
        </div>
        <div className="authUser__container__right">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
