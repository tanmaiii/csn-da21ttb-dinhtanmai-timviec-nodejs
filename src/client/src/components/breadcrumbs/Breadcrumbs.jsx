import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./breadcrumbs.scss";

export default function Breadcrumbs({ field, name }) {
  const navigate = useNavigate();

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="breadcrumbs">
      <ul className="list">
        <li className="crumb">
          <Link to={"/"}>Trang chủ</Link>
          <i class="fa-solid fa-chevron-right"></i>
        </li>
        <li className="crumb">
          <Link to={`/tim-kiem?field[]=${field}`}>{field}</Link>
          <i class="fa-solid fa-chevron-right"></i>
        </li>
        <li className="crumb">
          <span>{name}</span>
        </li>
      </ul>
    </nav>
  );
}
