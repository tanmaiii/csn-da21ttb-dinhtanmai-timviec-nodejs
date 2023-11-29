import React from "react";

import "./notFound.scss";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <div className="container">
        <div className="notFound__wrapper">
          <i className="fa-solid fa-face-frown-open"></i>
          <h2>Trang không tồn tại.</h2>
          <span>Chúng tôi xin lỗi vì sự bất tiện này, trang này không tồn tại. </span>
          <button onClick={() => navigate(-1)}>Quay lại</button>
        </div>
      </div>
    </div>
  );
}
