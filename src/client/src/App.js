import { Route, BrowserRouter, Routes, Outlet } from "react-router-dom";
import "https://kit.fontawesome.com/dc548344cf.js";

import { useState } from "react";
import "./App.scss";
import { useMode } from "./context/ModeContext";

import Layout from "./layout/Layout";

import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Company from "./pages/company/Company";
import Auth from "./pages/auth/Auth";
import DetailJob from "./pages/detailJob/DetailJob";
import DetailCompany from "./pages/detailCompany/DetailCompany";
import DetailUser from "./pages/detailUser/DetailUser";
import PostJob from "./pages/postJob/PostJob";
import EditJob from "./pages/editJob/PostJob";
import Candidate from "./pages/candidate/Candidate";
import NotFound from "./pages/notFound/NotFound";

import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";

import SigninCompany from "./components/signinCompany/SigninCompany";
import SignupCompany from "./components/signupCompany/SignupCompany";
import InfoCompany from "./pages/detailCompany/infoCompany/InfoCompany";

function App() {
  const { darkMode } = useMode();
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <div className={`App`}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<NotFound />} />

            <Route index element={<Home />} />
            <Route path="/tim-kiem" element={<Search />} />
            <Route path="/nha-tuyen-dung/search/:keyword" element={<Company />} />
            <Route path="/nha-tuyen-dung" element={<Company />} />

            <Route path="/nha-tuyen-dung" element={<Auth />}>
              <Route path="dang-nhap" index element={<SigninCompany />} />
              <Route path="dang-ky" element={<SignupCompany />} />
            </Route>

            <Route path="nha-tuyen-dung/:id" element={<DetailCompany />}>
              <Route path="info" element />
              <Route path="jobs" element />
            </Route>

            <Route path="/nguoi-dung" element={<Auth />}>
              <Route path="dang-nhap" index element={<Signin />} />
              <Route path="dang-ky" element={<Signup />} />
            </Route>


            <Route path="/cong-viec/:id" element={<DetailJob />} />

            <Route path="/nguoi-dung/:id/" element={<DetailUser />}>
              <Route path="info" element />
              <Route path="apply" element />
              <Route path="jobs" element />
              <Route path="companies" element />
            </Route>

           

            <Route path="nha-tuyen-dung/ung-vien" element={<Candidate />} />
            <Route path="nha-tuyen-dung/dang-bai" element={<PostJob />} />
            <Route path="nha-tuyen-dung/chinh-sua" element={<EditJob />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
