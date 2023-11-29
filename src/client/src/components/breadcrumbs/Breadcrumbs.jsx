import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./breadcrumbs.scss";

export default function Breadcrumbs() {
  // const location = useLocation();

  // console.log(location);

  // let currentLink = "";

  // const crumbs = location.pathname
  //   .split("/")
  //   .filter((crumb) => crumb !== "")
  //   .map((crumb) => {
  //     currentLink += `/${crumb}`;

  //     return (
  //       <div className="crumb" key={crumb}>
  //         <Link to={currentLink}>{crumb}</Link>
  //       </div>
  //     );
  //   });

  // return <div className="breadcrumbs">{crumbs}</div>;
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="breadcrumbs">
      <ul className="list">
        <li className="crumb">
          <Link to={"/"}>Trang chủ</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li className="crumb" key={name}>
              <i class="fa-solid fa-chevron-right"></i>
              {isLast ? <span>{name}</span> : <Link to={routeTo}>{name}</Link>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
