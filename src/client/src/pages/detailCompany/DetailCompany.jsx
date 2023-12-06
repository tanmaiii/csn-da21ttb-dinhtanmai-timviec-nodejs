import React, { useEffect, useState, useRef } from "react";
import "./detailCompany.scss";
import avatar from "../../assets/images/avatarCpn.png";
import InfoCompany from "./infoCompany/InfoCompany";
import IntroCompany from "./introCompany/IntroCompany";
import JobsCompany from "./jobsCompany/JobsCompany";
import { Link, useParams, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { makeRequest, apiImage } from "../../axios";
import NotFound from "../../pages/notFound/NotFound";
import Loader from "../../components/loader/Loader";
import ModalCropImage from "../../components/modalCropImage/ModalCropImage";

import { useAuth } from "../../context/authContext";

import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  FacebookShareButton,
  EmailShareButton,
  TwitterShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon,
} from "react-share";
import { toast } from "sonner";

export default function DetailCompany() {
  const [err, setErr] = useState();
  const [loading, setLoading] = useState();
  const [company, setCompany] = useState();
  const [follower, setFollower] = useState();
  const [openControlMb, setOpenControlMb] = useState(false);
  const [openModalAvatar, setOpenModalAvatar] = useState(false);
  const { currentCompany, currentUser } = useAuth();
  const controlMbRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const urlShare = window.location.href;

  const controlPathname = pathname.split("/").filter(Boolean).pop();

  const getCompany = async () => {
    try {
      const res = await makeRequest.get("/company/" + id);
      setCompany(res.data);
    } catch (error) {
      setErr("id không đúng");
    }
  };

  const getFollower = async () => {
    try {
      const res = await makeRequest("follow/follower?idCompany=" + id);
      setFollower(res.data);
    } catch (error) {}
  };

  const { isLoading, error, data } = useQuery(["company", id], () => {
    return getCompany();
  });

  const { isLoading: loadingFollow, data: dataFollow } = useQuery(["follower", id], () => {
    return getFollower();
  });

  const mutationFollow = useMutation(
    (following) => {
      if (following) return makeRequest.delete("/follow?idCompany=" + id);
      return makeRequest.post("/follow?idCompany=" + id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["follower"]);
      },
    }
  );


  const handleSubmitFollow = () => {
    if (!currentUser) return navigate("/dang-nhap/nguoi-dung");
    mutationFollow.mutate(follower?.includes(currentUser?.id));
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
  }, [controlPathname]);

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
                    <img src={company?.avatarPic ? apiImage + company?.avatarPic : avatar} alt="" />
                    {company?.id === currentCompany?.id && (
                      <button
                        onClick={() => setOpenModalAvatar(true)}
                        className="detailCompany__wrapper__header__main__image__edit"
                      >
                        <i className="fa-solid fa-upload"></i>
                      </button>
                    )}
                  </div>
                  <div className="detailCompany__wrapper__header__main__text">
                    <h4 className="detailCompany__wrapper__header__main__text__name">
                      {company?.nameCompany ? company?.nameCompany : "..."}
                    </h4>
                    <div className="detailCompany__wrapper__header__main__text__address">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{company?.province ? company?.province : "..."}</span>
                    </div>
                    <div className="detailCompany__wrapper__header__main__text__scale">
                      <i className="fa-solid fa-building"></i>
                      <span>{company?.scale ? `${company?.scale} nhân viên` : "..."}</span>
                    </div>
                    <div className="detailCompany__wrapper__header__main__text__follow">
                      <i className="fa-solid fa-user-group"></i>
                      <span>{follower ? follower?.length : "0"} người theo dõi</span>
                    </div>
                    <div className="detailCompany__wrapper__header__main__text__link">
                      <i className="fa-solid fa-globe"></i>
                      {company?.web ? <a href={company.web}>{company.web}</a> : "..."}
                    </div>
                  </div>
                </div>
                {company?.id === currentCompany?.id ? (
                  <Link
                    to={`/nha-tuyen-dung/${currentCompany?.id}/info`}
                    className="detailCompany__wrapper__header__button"
                  >
                    <button>Chỉnh sửa</button>
                  </Link>
                ) : (
                  <div
                    className="detailCompany__wrapper__header__button__follow"
                    onClick={() => handleSubmitFollow()}
                  >
                    {follower?.includes(currentUser?.id) ? (
                      <button className="btn-unFollow">
                        <span>Đang theo dõi</span>
                      </button>
                    ) : (
                      <button className="btn-follow">
                        <span>Theo dõi công ty</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="detailCompany__wrapper__body row">
                <div className=" col pc-9 t-9 m-12">
                  <div className="detailCompany__wrapper__body__left">
                    {company?.id === currentCompany?.id && (
                      <>
                        <div className="detailCompany__wrapper__body__left__control">
                          <button
                            onClick={() => navigate("")}
                            className={`${controlPathname === id && "active"}`}
                          >
                            <span>Giới thiệu</span>
                          </button>
                          {company?.id === currentCompany?.id && (
                            <>
                              <button
                                onClick={() => navigate("info")}
                                className={`${controlPathname === "info" && "active"}`}
                              >
                                <span>Thông tin</span>
                              </button>
                              <Link to={"/nha-tuyen-dung/ung-vien"}>
                                <button>
                                  <span>Ứng viên</span>
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
                            onClick={() => navigate("")}
                            className={`${controlPathname === id && "active"}`}
                          >
                            <span>Giới thiệu</span>
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
                                    onClick={() => navigate("info")}
                                    className={`${controlPathname === "info" && "active"}`}
                                  >
                                    <span>Thông tin</span>
                                  </button>
                                  <Link to={"/nha-tuyen-dung/ung-vien"}>
                                    <button>
                                      <span>Ứng viên</span>
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
                      </>
                    )}

                    <div className="detailCompany__wrapper__body__left__content">
                      <Routes>
                        <Route
                          index
                          element={
                            <>
                              <IntroCompany intro={company?.intro} />
                              <JobsCompany />
                            </>
                          }
                        />
                        <Route path="info" element={<InfoCompany />} />
                      </Routes>
                    </div>
                  </div>
                </div>
                <div className="col pc-3 t-3 m-0">
                  <div className="detailCompany__wrapper__body__right">
                    <h6>Website</h6>
                    <div className="detailCompany__wrapper__body__right__web">
                      {company?.web ? (
                        <a href={company?.web}>{company?.web}</a>
                      ) : (
                        <span>Không có</span>
                      )}
                    </div>
                    <h6>Chia sẻ</h6>
                    <div className="detailCompany__wrapper__body__right__list">
                      <FacebookShareButton url={urlShare}>
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <EmailShareButton url={urlShare}>
                        <EmailIcon size={32} round />
                      </EmailShareButton>
                      <TwitterShareButton url={urlShare}>
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalCropImage openModal={openModalAvatar} setOpenModal={setOpenModalAvatar} />
    </>
  );
}
