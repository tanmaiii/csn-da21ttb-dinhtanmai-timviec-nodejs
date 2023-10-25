import React, { useEffect, useRef, useState } from "react";
import img from "../../assets/images/logoJobQuest.png";
import { Link } from "react-router-dom";
import "./header.scss";
import { useMode } from "../../context/ModeContext";
import { HiOutlineHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaRegBuilding } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";

import { useNavigate, useLocation } from "react-router-dom";

const hedearItem = [
  {
    display: "Home",
    icon: <HiOutlineHome />,
    path: "/",
  },
  {
    display: "Tìm kiếm",
    icon: <BiSearch />,
    path: "/tim-kiem",
  },
  {
    display: "Công ty",
    icon: <FaRegBuilding />,
    path: "/cong-ty",
  },
];

export default function Header() {
  const { darkMode, toggleDarkMode } = useMode();
  const [openLogin, setOpenLogin] = useState(false);
  const headerRef = useRef();

  const {pathname} = useLocation();

  const navigate = useNavigate();

  const handleReloadPage = () => {
    navigate("/");
    window.location.reload();
  };

  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop == 0 ){
        headerRef.current.style.top = "0"
        headerRef.current.classList.remove('shrink')
    }else{
        if(scrollTop > lastScrollTop){
            headerRef.current.style.top = "-100px"
        headerRef.current.classList.remove('shrink')
        }else{
            headerRef.current.style.top = "0px"
            headerRef.current.classList.add('shrink')
        }
    }
    lastScrollTop = scrollTop
  })

  return (
    <>
      <div className="header">
        <div className={`header__wrapper ${pathname != '/' ? 'bg' : ''}`} ref={headerRef}>
          <div className="container">
            <div className="header__wrapper__logo" onClick={handleReloadPage}>
              <img src={img} alt="" />
              <h2>JobQuest</h2>
            </div>

            <div className="header__wrapper__control">
              <ul>
                {hedearItem.map((item, i) => (
                  <li key={i}>
                    <Link className={pathname === item.path ? 'active' : ''} to={item.path}>
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
              <button className="header__wrapper__auth__user">
                <Link to={"/nguoi-xin-viec/dang-nhap"}>Đăng nhập</Link>
              </button>
              <div className="header__wrapper__auth__company">
                <Link to={"/nha-tuyen-dung/dang-nhap"}>Nhà tuyển dụng</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
