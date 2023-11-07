import React, { useEffect, useState, useRef } from "react";
import "./detailCompany.scss";
import avatar from "../../assets/images/avatarCpn.png";
import ItemJob from "../../components/itemJob/ItemJob";
import InfoCompany from "./infoCompany/InfoCompany";
import IntroCompany from "./introCompany/IntroCompany";
import { Link, useSearchParams, useParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { makeRequest } from "../../axios";
import NotFound from "../../pages/notFound/NotFound";
import Loader from "../../components/loader/Loader";

import { useAuth } from "../../context/authContext";

import jobs from "../../config/jobs";

import { useMutation, useQuery, useQueryClient } from "react-query";

export default function DetailCompany() {
  const [paginate, setPaginate] = useState(1);
  const [err, setErr] = useState();
  const [loading, setLoading] = useState();
  const [company, setCompany] = useState();
  let [searchParams, setSearchParams] = useSearchParams();
  const [openControlMb, setOpenControlMb] = useState(false);
  const { currentCompany } = useAuth();
  const controlMbRef = useRef();
  const { id } = useParams();
 
  const getCompany = async () => {
    try {
      const res = await makeRequest.get("/company/find/"+ id);
      setCompany(res.data)
    } catch (error) {
        setErr('id không đúng')
    }
  }

  const { isLoading, error, data } = useQuery(["company", id], () => {
    return getCompany();
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!controlMbRef.current?.contains(e.target)) {
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
    <>
      {loading && <Loader />}
      {err && <NotFound />}
      {company && (
        <div className="detailCompany">
          <div className="container">
            <div className="detailCompany__wrapper">
              <div className="detailCompany__wrapper__header">
                <div className="detailCompany__wrapper__header__main">
                  <div className="detailCompany__wrapper__header__main__image">
                    <img
                      src={company?.avatarPic ? company?.avatarPic : avatar}
                      alt=""
                    />
                    {company?.id === currentCompany?.id && (
                      <label
                        htmlFor="input-image"
                        className="detailCompany__wrapper__header__main__image__edit"
                      >
                        <i className="fa-solid fa-upload"></i>
                        <input id="input-image" type="file" />
                      </label>
                    )}
                  </div>
                  <div className="detailCompany__wrapper__header__main__text">
                    <h4 className="detailCompany__wrapper__header__main__text__name">
                      {company?.nameCompany ? company?.nameCompany : "..."}
                    </h4>
                    <div className="detailCompany__wrapper__header__main__text__address">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>
                        {company?.province ? company?.province : "..."}
                      </span>
                    </div>
                    <div className="detailCompany__wrapper__header__main__text__scale">
                      <i className="fa-solid fa-building"></i>
                      <span>
                        {company?.scale ? `${company?.scale} nhân viên` : "..."}
                      </span>
                    </div>
                    <div className="detailCompany__wrapper__header__main__text__follow">
                      <i className="fa-solid fa-user-group"></i>
                      <span>
                        {company?.follow
                          ? `${company?.follow} người theo dõi`
                          : "..."}
                      </span>
                    </div>
                    <div className="detailCompany__wrapper__header__main__text__link">
                      <i className="fa-solid fa-globe"></i>
                      {company?.web ? (
                        <a href={company.web}>{company.web}</a>
                      ) : (
                        "..."
                      )}
                    </div>
                  </div>
                </div>
                {company?.id === currentCompany?.id ? (
                  <div className="detailCompany__wrapper__header__button">
                    <button>Chỉnh sửa</button>
                  </div>
                ) : (
                  <div className="detailCompany__wrapper__header__button__follow">
                    <span>4 lượt theo dõi</span>
                    <button className="btn-follow">Theo dõi công ty</button>
                    {/* <button className="btn-unFollow">Đang theo dõi</button> */}
                  </div>
                )}
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
                      {company?.id === currentCompany?.id && (
                        <>
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
                        </>
                      )}
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
                      <button
                        onClick={() => setSearchParams({ ["tag"]: "jobs" })}
                        className={`${
                          searchParams.get("tag") === "jobs" && "active"
                        }`}
                      >
                        <span>Việc làm</span>
                      </button>

                      {company?.id === currentCompany?.id && (
                        <div className="button__more" ref={controlMbRef}>
                          <button
                            className="button__more__toggle"
                            onClick={() => setOpenControlMb(!openControlMb)}
                          >
                            <span>Thêm</span>
                            <i className="fa-solid fa-angle-down"></i>
                          </button>
                          {openControlMb && (
                            <div className="button__more__dropdown">
                              <button
                                onClick={() =>
                                  setSearchParams({ ["tag"]: "info" })
                                }
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
                      )}
                    </div>

                    <div className="detailCompany__wrapper__body__left__content">
                      {searchParams.get("tag") === null && (
                        <IntroCompany
                          intro={company?.intro}
                        />
                      )}
                      {searchParams.get("tag") === "jobs" && (
                        <div className="jobsSave row">
                          {jobs.map((job, i) => (
                            <ItemJob
                              job={job}
                              key={i}
                              className={"col pc-12"}
                            />
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
                        <i className="fa-brands fa-facebook"></i>
                      </a>
                      <a href="">
                        <i className="fa-solid fa-envelope"></i>
                      </a>
                      <a href="">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
