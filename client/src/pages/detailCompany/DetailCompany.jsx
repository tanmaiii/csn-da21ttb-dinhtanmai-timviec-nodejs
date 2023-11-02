import React, { useEffect, useState, useRef } from "react";
import "./detailCompany.scss";
import img from "../../assets/images/FPT_logo.png";
import ItemJob from "../../components/itemJob/ItemJob";
import IntroCompany from "../../components/introCompany/IntroCompany";
import InfoCompany from "../../components/infoCompany/InfoCompany";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";

import jobs from "../../config/jobs";

export default function DetailCompany() {
  const [paginate, setPaginate] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
  const [openControlMb, setOpenControlMb] = useState(false);
  const controlMbRef = useRef();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!controlMbRef.current.contains(e.target)) {
        setOpenControlMb(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  useEffect(() => {
    setOpenControlMb(false);
  }, [searchParams]);

  return (
    <div className="detailCompany">
      <div className="container">
        <div className="detailCompany__wrapper">
          <div className="detailCompany__wrapper__header">
            <div className="detailCompany__wrapper__header__main">
              <div className="detailCompany__wrapper__header__main__image">
                <img src={img} alt="" />
              </div>
              <div className="detailCompany__wrapper__header__main__text">
                <h4 className="detailCompany__wrapper__header__main__text__name">
                  FPT
                </h4>
                <div className="detailCompany__wrapper__header__main__text__address">
                  <i class="fa-solid fa-location-dot"></i>
                  <span>TP. Hồ Chí Minh</span>
                </div>
                <div className="detailCompany__wrapper__header__main__text__scale">
                  <i class="fa-solid fa-user-group"></i>
                  <span>5000 - 10000 nhân viên</span>
                </div>
                <div className="detailCompany__wrapper__header__main__text__link">
                  <i class="fa-solid fa-link"></i>
                  <span>www.fpt.com</span>
                </div>
              </div>
            </div>
            <div className="detailCompany__wrapper__header__button">
              <button>Chỉnh sửa</button>
            </div>
          </div>
          <div className="detailCompany__wrapper__body row">
            <div className=" col pc-9 t-9 m-12">
              <div className="detailCompany__wrapper__body__left">
                <div className="detailCompany__wrapper__body__left__control">
                  <button
                    onClick={() => setSearchParams()}
                    className={`${
                      searchParams.get("tag") === null && "active"
                    }`}
                  >
                    <span>Giới thiệu</span>
                  </button>
                  <button
                    onClick={() => setSearchParams({ ["tag"]: "jobs" })}
                    className={`${
                      searchParams.get("tag") === "jobs" && "active"
                    }`}
                  >
                    <span>Việc làm</span>
                  </button>
                  <button
                    onClick={() => setSearchParams({ ["tag"]: "info" })}
                    className={`${
                      searchParams.get("tag") === "info" && "active"
                    }`}
                  >
                    <span>Thông tin</span>
                  </button>
                  <Link to={"/nha-tuyen-dung/ung-vien"}>
                    <button>
                      <span>Ứng tuyển</span>
                    </button>
                  </Link>
                  <Link to={"/nha-tuyen-dung/dang-bai"}>
                    <button>Tuyển dụng</button>
                  </Link>
                </div>

                <div className="detailCompany__wrapper__body__left__control-mobile">
                  <button
                    onClick={() => setSearchParams()}
                    className={`${
                      searchParams.get("tag") === null && "active"
                    }`}
                  >
                    <span>Giới thiệu</span>
                  </button>

                  <div className="button__more" ref={controlMbRef}>
                    <button
                      className="button__more__toggle"
                      onClick={() => setOpenControlMb(!openControlMb)}
                    >
                      <span>Thêm</span>
                      <i class="fa-solid fa-angle-down"></i>
                    </button>
                    {openControlMb && (
                      <div className="button__more__dropdown">
                        <button
                          onClick={() => setSearchParams({ ["tag"]: "jobs" })}
                          className={`${
                            searchParams.get("tag") === "jobs" && "active"
                          }`}
                        >
                          <span>Việc làm</span>
                        </button>
                        <button
                          onClick={() => setSearchParams({ ["tag"]: "info" })}
                          className={`${
                            searchParams.get("tag") === "info" && "active"
                          }`}
                        >
                          <span>Thông tin</span>
                        </button>
                        <Link to={"/nha-tuyen-dung/ung-vien"}>
                          <button>
                            <span>Ứng tuyển</span>
                          </button>
                        </Link>
                        <Link to={"/nha-tuyen-dung/dang-bai"}>
                          <button>Tuyển dụng</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="detailCompany__wrapper__body__left__content">
                  {searchParams.get("tag") === null && <IntroCompany />}
                  {searchParams.get("tag") === "jobs" && (
                    <div className="jobsSave row">
                      {jobs.map((job, i) => (
                        <ItemJob job={job} key={i} className={"col pc-12"} />
                      ))}
                      <Pagination
                        totalItem={30}
                        limit={5}
                        paginate={paginate}
                        setPaginate={setPaginate}
                      />
                    </div>
                  )}
                  {searchParams.get("tag") === "info" && <InfoCompany />}
                </div>
              </div>
            </div>
            <div className="col pc-3 t-3 m-0">
              <div className="detailCompany__wrapper__body__right">
                <h6>Website</h6>
                <div className="detailCompany__wrapper__body__right__web">
                  <a href="https://www.facebook.com/">
                    https://www.facebook.com/
                  </a>
                </div>
                <h6>Theo dõi</h6>
                <div className="detailCompany__wrapper__body__right__list">
                  <a href="">
                    <i class="fa-brands fa-facebook"></i>
                  </a>
                  <a href="">
                    <i class="fa-solid fa-envelope"></i>
                  </a>
                  <a href="">
                    <i class="fa-brands fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
