import React, { useEffect, useState } from "react";
import "./detailCompany.scss";
import img from "../../assets/images/FPT_logo.png";
import ItemJob from "../../components/itemJob/ItemJob";
import ItemCompany from "../../components/itemCompany/ItemCompany";
import ItemCandidate from "../../components/itemCandidate/ItemCandidate";
import IntroCompany from "../../components/introCompany/IntroCompany";
import InfoCompany from "../../components/infoCompany/InfoCompany";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";

import jobs from "../../config/jobs";

export default function DetailCompany() {
  const [active, setActive] = useState(1);
  const [paginate,setPaginate] = useState(1);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

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
                    onClick={() => setActive(1)}
                    className={`${active === 1 && "active"}`}
                  >
                    <span>Giới thiệu</span>
                  </button>
                  <button
                    onClick={() => setActive(2)}
                    className={`${active === 2 && "active"}`}
                  >
                    <span>Việc làm</span>
                  </button>

                  <button
                    onClick={() => setActive(4)}
                    className={`${active === 4 && "active"}`}
                  >
                    <span>Chỉnh sửa thông tin</span>
                  </button>
                  <Link to={"/cong-ty/ung-vien"}>
                    <button>
                      <span>Đơn ứng tuyển</span>
                    </button>
                  </Link>
                  <Link to={"/cong-ty/dang-bai"}>
                    <button>Đăng Tuyển dụng</button>
                  </Link>
                </div>
                <div className="detailCompany__wrapper__body__left__content">
                  {active === 1 && <IntroCompany />}
                  {active === 2 && (
                    <div className="jobsSave">
                      {jobs.map((job, i) => (
                        <ItemJob job={job} key={i} className={"col pc-12"} />
                      ))}
                      <Pagination totalItem={30} limit={5} paginate={paginate} setPaginate={setPaginate}/>
                    </div>
                  )}
                  {active === 3 && (
                    <div className="candidate row">
                      <ItemCandidate className={"col pc-6"} />
                      <ItemCandidate className={"col pc-6"} />
                      <ItemCandidate className={"col pc-6"} />
                    </div>
                  )}
                  {active === 4 && <InfoCompany />}
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
