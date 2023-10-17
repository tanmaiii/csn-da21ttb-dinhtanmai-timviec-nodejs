import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="layout__main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
