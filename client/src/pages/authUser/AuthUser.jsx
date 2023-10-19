import React from "react";
import img from "../../assets/images/auth.png";
import logo from "../../assets/images/logoJobQuest.png";
import "./authUser.scss";

import Signin from "../../components/signin/Signin";
import Signup from "../../components/signup/Signup";

import { Route, Router, Routes, Outlet } from "react-router-dom";

export default function AuthUser() {
  return (
    <div className="authUser">
      <h2>Tham gia ngay hôm nay</h2>
      <div className="authUser__container">
        <div className="authUser__container__left">
          <img src={img} alt="" />
        </div>
        <div className="authUser__container__right">
          {/* <Signin/> */}
          {/* <Signup/> */}
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
