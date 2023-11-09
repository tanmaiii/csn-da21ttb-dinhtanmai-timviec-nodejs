import React, { useEffect, useState, useRef } from "react";
import "./detailCompany.scss";
import avatar from "../../assets/images/avatarCpn.png";
import ItemJob from "../../components/itemJob/ItemJob";
import InfoCompany from "./infoCompany/InfoCompany";
import IntroCompany from "./introCompany/IntroCompany";
import JobsCompany from "./jobsCompany/JobsCompany";
import {
  Link,
  useSearchParams,
  useParams,
  Route,
  Routes,
  useNavigate,
  useLocation
} from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { makeRequest, apiImage } from "../../axios";
import NotFound from "../../pages/notFound/NotFound";
import Loader from "../../components/loader/Loader";

import { useAuth } from "../../context/authContext";

import { useMutation, useQuery, useQueryClient } from "react-query";

export default function DetailCompany() {
  const [err, setErr] = useState();
  const [loading, setLoading] = useState();
  const [company, setCompany] = useState();
  let [searchParams, setSearchParams] = useSearchParams();
  const [openControlMb, setOpenControlMb] = useState(false);
  const { currentCompany } = useAuth();
  const controlMbRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate()
  const {pathname} = useLocation()

  const controlPathname = pathname.split('/').filter(Boolean).pop()

  const getCompany = async () => {
    try {
      const res = await makeRequest.get("/company/find/" + id);
      setCompany(res.data);
    } catch (error) {
      setErr("id không đúng");
    }
  };

  const { isLoading, error, data } = useQuery(["company", id], () => {
    return getCompany();
  });

  const handleChangeInputFile = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const postImage = await makeRequest.post("/upload", formData);
      await makeRequest.put("/company/uploadImage", {
        avatarPic: postImage.data,
      });
      getCompany();
      return postImage.data;
    } catch (err) {
      console.log(err);
    }
  };

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
                      src={
                        company?.avatarPic
                          ? apiImage + company?.avatarPic
                          : avatar
                      }
                      alt=""
                    />
                    {company?.id === currentCompany?.id && (
                      <label
                        htmlFor="input-image"
                        className="detailCompany__wrapper__header__main__image__edit"
                      >
                        <i className="fa-solid fa-upload"></i>
                        <input
                          id="input-image"
                          type="file"
                          onChange={(e) => handleChangeInputFile(e)}
                        />
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
                        onClick={() => navigate('')}
                        className={`${
                          controlPathname === id && "active"
                        }`}
                      >
                        <span>Giới thiệu</span>
                      </button>
                      <button
                        onClick={() => navigate('jobs')}
                        className={`${
                          controlPathname === "jobs" && "active"
                        }`}
                      >
                        <span>Việc làm</span>
                      </button>
                      {company?.id === currentCompany?.id && (
                        <>
                          <button
                            onClick={() => navigate('info')}
                            className={`${
                              controlPathname === "info" && "active"
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
                        onClick={() => navigate('')}
                        className={`${
                          controlPathname === id && "active"
                        }`}
                      >
                        <span>Giới thiệu</span>
                      </button>
                      <button
                        onClick={() => navigate('jobs')}
                        className={`${
                          controlPathname === "jobs" && "active"
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
                                onClick={() => navigate('info')
                                }
                                className={`${
                                  controlPathname === "info" && "active"
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
                      <Routes>
                        <Route index element={<IntroCompany intro={company?.intro} />} />
                        <Route path="info" element={<InfoCompany />} />
                        <Route path="jobs" element={<JobsCompany />} />
                      </Routes>
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
