import { Route, BrowserRouter, Routes } from "react-router-dom";
import "https://kit.fontawesome.com/dc548344cf.js";
import "./assets/libs/boxicons-2.1.4/css/boxicons.min.css";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import { useState } from "react";
import "./App.scss";
import { useMode } from "./context/ModeContext";
import AuthUser from "./pages/authUser/AuthUser";
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
              <Route path="/tim-viec" element={<Home />} />
              <Route path="/danh-gia" element={<Home />} />
              <Route path="/cong-ty" element={<Home />} />
              <Route path="/nguoi-xin-viec" element={<AuthUser />}>
                <Route path="dang-nhap" index element={<Signin />} />
                <Route path="dang-ky" element={<Signup />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
