import { Route, BrowserRouter, Routes } from "react-router-dom";
import "https://kit.fontawesome.com/dc548344cf.js";
import "./assets/libs/boxicons-2.1.4/css/boxicons.min.css";

import { useState } from "react";
import "./App.scss";
import { useMode } from "./context/ModeContext";

import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Company from "./pages/company/Company";
import AuthUser from "./pages/authUser/AuthUser";
import DetailJob from "./pages/detailJob/DetailJob";
import DetailCompany from "./pages/detailCompany/DetailCompany";
import DetailUser from "./pages/detailUser/DetailUser";

import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";

function App() {
  const { darkMode } = useMode();
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <div className={`App`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/tim-kiem" element={<Search />} />
              <Route path="/cong-ty" element={<Company />} />
              <Route path="/nguoi-xin-viec" element={<AuthUser />}>
                <Route path="dang-nhap" index element={<Signin />} />
                <Route path="dang-ky" element={<Signup />} />
              </Route>
              <Route path="/cong-viec/:id" element={<DetailJob />} />
              <Route path="/cong-ty/:id" element={<DetailCompany />} />
              <Route path="/nguoi-dung/:id" element={<DetailUser />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
