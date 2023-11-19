import React, { useEffect, useRef, useState } from "react";
import img from "../../assets/images/logoJobQuest.png";
import { Link } from "react-router-dom";
import "./header.scss";
import { useMode } from "../../context/ModeContext";
import { useAuth } from "../../context/authContext";

import DropdownUser from "../dropdownUser/DropdownUser";
import DropdownCompany from "../dropdownCompany/DropdownCompany";

import { useNavigate, useLocation } from "react-router-dom";

const hedearItem = [
  {
    display: "Trang chủ",
    icon: <i className="fa-solid fa-house"></i>,
    path: "/",
  },
  {
    display: "Ngành nghề/Địa điểm",
    icon: <i class="fa-solid fa-briefcase"></i>,
    path: "/tim-viec-lam-nhanh",
  },
  {
    display: "Tìm kiếm",
    icon: <i className="fa-solid fa-magnifying-glass"></i>,
    path: "/tim-kiem",
  },
  {
    display: "Công ty",
    icon: <i className="fa-solid fa-building"></i>,
    path: "/nha-tuyen-dung",
  },
];

export default function Header() {
  const { darkMode, toggleDarkMode } = useMode();
  const { currentUser, logoutUser } = useAuth();
  const { currentCompany, logoutCompany } = useAuth();

  const [open, setOpen] = useState(false);
  const headerRef = useRef();
  const sideBarMobile = useRef();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleReloadPage = () => {
    navigate("/");
    window.location.reload();
  };

  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop == 0) {
      headerRef.current.style.top = "0";
      headerRef.current.classList.remove("shrink");
    } else {
      if (scrollTop > lastScrollTop) {
        headerRef.current.style.top = "-500px";
        headerRef.current.classList.remove("shrink");
      } else {
        headerRef.current.style.top = "0px";
        headerRef.current.classList.add("shrink");
      }
    }
    lastScrollTop = scrollTop;
  });

  useEffect(() => {
    const handleClick = (e) => {
      if (!sideBarMobile.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="header">
        <div
          className={`header__wrapper ${pathname != "/" ? "bg" : ""}`}
          ref={headerRef}
        >
          <div className="container">
            <div className="header__wrapper__btn-mobile">
              <button onClick={() => setOpen(!open)}>
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
            <div className="header__wrapper__logo" onClick={handleReloadPage}>
              <img src={img} alt="" />
              <h2>JobQuest</h2>
            </div>
            <div className="header__wrapper__control">
              <ul>
                {hedearItem.map((item, i) => (
                  <li key={i}>
                    <Link
                      className={pathname === item.path ? "active" : ""}
                      to={item.path}
                    >
                      {item.icon}
                      <span>{item.display}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="header__wrapper__auth">
              <button
                className="header__wrapper__auth__darkMode"
                onClick={() => toggleDarkMode()}
              >
                {darkMode ? (
                  <i className="fa-regular fa-sun"></i>
                ) : (
                  <i className="fa-solid fa-moon"></i>
                )}
              </button>
              {currentUser ? (
                <DropdownUser />
              ) : (
                <Link to={"/nguoi-dung/dang-nhap"}>
                  <button className="header__wrapper__auth__user">
                    Đăng nhập
                  </button>
                </Link>
              )}
              <hr className="hr-col" />
              {currentCompany ? (
                <DropdownCompany />
              ) : (
                <Link to={"/nha-tuyen-dung/dang-nhap"}>
                  <button className="header__wrapper__auth__company">
                    Nhà tuyển dụng
                  </button>
                </Link>
              )}
            </div>
            <div
              className={`header__wrapper__control-mobile ${
                open ? "open" : ""
              }`}
              ref={sideBarMobile}
            >
              <ul>
                {currentUser && (
                  <>
                    <DropdownUser />
                    <hr />
                  </>
                )}
                {currentCompany && (
                  <>
                    <DropdownCompany />
                    <hr />
                  </>
                )}

                {hedearItem.map((item, i) => (
                  <li key={i}>
                    <Link
                      className={pathname === item.path ? "active" : ""}
                      to={item.path}
                    >
                      {item.icon}
                      <span>{item.display}</span>
                    </Link>
                  </li>
                ))}

                <hr />

                <li>
                  <button onClick={() => toggleDarkMode()}>
                    {darkMode ? (
                      <>
                        <i className="fa-regular fa-sun"></i>
                        <span>Chế độ sáng</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-moon"></i>
                        <span>Chế độ tối</span>
                      </>
                    )}
                  </button>
                </li>

                {!currentUser && (
                  <li>
                    <button className="">
                      <Link to={"/nguoi-dung/dang-nhap"}>Người tìm việc</Link>
                    </button>
                  </li>
                )}

                {!currentCompany && (
                  <li>
                    <button className="">
                      <Link to={"/nha-tuyen-dung/dang-nhap"}>
                        Nhà tuyển dụng
                      </Link>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
