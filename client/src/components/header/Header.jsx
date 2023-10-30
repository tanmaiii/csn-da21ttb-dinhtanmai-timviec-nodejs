import React, { useEffect, useRef, useState } from "react";
import img from "../../assets/images/logoJobQuest.png";
import { Link } from "react-router-dom";
import "./header.scss";
import { useMode } from "../../context/ModeContext";

import DropdownUser from "../dropdownUser/DropdownUser";
import DropdownCompany from "../dropdownCompany/DropdownCompany";

import { useNavigate, useLocation } from "react-router-dom";

const hedearItem = [
  {
    display: "Home",
    icon: <i class="fa-solid fa-house"></i>,
    path: "/",
  },
  {
    display: "Tìm kiếm",
    icon: <i class="fa-solid fa-magnifying-glass"></i>,
    path: "/tim-kiem",
  },
  {
    display: "Công ty",
    icon: <i class="fa-solid fa-building"></i>,
    path: "/cong-ty",
  },
];

export default function Header() {
  const [user, setUser] = useState(false);
  const [company, setCompany] = useState(false);
  const { darkMode, toggleDarkMode } = useMode();
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
                <i class="fa-solid fa-bars"></i>
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
                  <i class="fa-regular fa-sun"></i>
                ) : (
                  <i class="fa-solid fa-moon"></i>
                )}
              </button>
              {user ? (
                <DropdownUser />
              ) : (
                <button className="header__wrapper__auth__user">
                  <Link to={"/nguoi-xin-viec/dang-nhap"}>Đăng nhập</Link>
                </button>
              )}
              {company ? (
                <DropdownCompany />
              ) : (
                <button className="header__wrapper__auth__company">
                  <Link to={"/nha-tuyen-dung/dang-nhap"}>Nhà tuyển dụng</Link>
                </button>
              )}
            </div>
            <div
              className={`header__wrapper__control-mobile ${
                open ? "open" : ""
              }`}
              ref={sideBarMobile}
            >
              <ul>
                {user && (
                  <>
                    <DropdownUser />
                    <hr />
                  </>
                )}
                {company && (
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
                        <i class="fa-regular fa-sun"></i>
                        <span>Chế độ sáng</span>
                      </>
                    ) : (
                      <>
                        <i class="fa-solid fa-moon"></i>
                        <span>Chế độ tối</span>
                      </>
                    )}
                  </button>
                </li>

                {!user && (
                  <li>
                    <button className="">
                      <Link to={"/nguoi-xin-viec/dang-nhap"}>
                        Người tìm việc
                      </Link>
                    </button>
                  </li>
                )}

                {!company && (
                  <li>
                    <button className="">
                      <Link to={"/nha-tuyen-dung/dang-nhap"}>
                        Nhà tuyển dụng
                      </Link>
                    </button>
                  </li>
                )}
                
              </ul>
              {user ||
                (company && (
                  <Link className="header__wrapper__control-mobile__option header__wrapper__control-mobile__option__logout">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>Đăng xuất</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
