import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import "./detailUser.scss";
import avatar from "../../assets/images/avatar.png";
import bg from "../../assets/images/gradient1.jpg";
import Loader from "../../components/loader/Loader";
import NotFound from "../notFound/NotFound";
import InfoUser from "./infoUser/InfoUser";
import IntroUser from "./introUser/IntroUser";
import AppliedJobs from "./appliedJobs/AppliedJobs";
import CompaniesSave from "./companiesSave/CompaniesSave";
import JobsSave from "./jobsSave/JobsSave";
import ModalCropImage from "../../components/modalCropImage/ModalCropImage";
import RecomKeywork from "../../components/recomKeyword/RecomKeyword";

import {
  useSearchParams,
  useParams,
  useNavigate,
  useLocation,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { makeRequest, apiImage } from "../../axios";
import moment from "moment";

import { useMutation, useQuery, useQueryClient } from "react-query";

export default function DetailUser() {
  const [openControlMb, setOpenControlMb] = useState(false);
  const [openModalEditAvatar, setOpenModalEditAvatar] = useState(false);
  const [openModalAvatar, setOpenModalAvatar] = useState(false);
  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const controlMbRef = useRef();
  const modalAvatarRef = useRef();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { id } = useParams();
  const controlPathname = pathname.split("/").filter(Boolean).pop();

  const getUser = async () => {
    try {
      const res = await makeRequest.get("/user/find/" + id);
      setUser(res.data);
    } catch (error) {
      setErr("id không đúng");
    }
  };

  const { isLoading, error, data } = useQuery(["user", id], () => {
    return getUser();
  });

  const mutation = useMutation(
    () => {
      return getUser();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!controlMbRef?.current?.contains(e.target)) {
        setOpenControlMb(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  useEffect(() => {
    setOpenControlMb(false);
  }, [controlPathname]);

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!modalAvatarRef.current.contains(e.target)) {
        setOpenModalAvatar(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  useEffect(() => {
    if (openModalAvatar === true) {
      document.body.style.overflow = "hidden";
    }
    if (openModalAvatar === false) {
      document.body.style.overflow = "unset";
    }
  }, [openModalAvatar]);

  console.log(user);

  return (
    <div>
      {loading && <Loader />}
      {err && <NotFound />}
      {user && (
        <div className="detailUser">
          <div className="container">
            <div className="detailUser__wrapper">
              <div className="detailUser__wrapper__header">
                <div className="detailUser__wrapper__header__bg">
                  <img src={bg} alt="" />
                </div>
                <div className="detailUser__wrapper__header__main">
                  <div className="detailUser__wrapper__header__main__left">
                    <div className="detailUser__wrapper__header__main__left__image">
                      <img
                        onClick={() => setOpenModalAvatar(true)}
                        src={user?.avatarPic ? apiImage + user?.avatarPic : avatar}
                        alt=""
                      />
                      {user?.id === currentUser?.id && (
                        <button
                          className="detailUser__wrapper__header__main__left__image__edit"
                          onClick={() => setOpenModalEditAvatar(true)}
                        >
                          <i className="fa-solid fa-camera"></i>
                        </button>
                      )}
                    </div>
                    <div className="detailUser__wrapper__header__main__left__text">
                      <span className="tag">Người dùng</span>
                      <h4 className="name">{user?.name}</h4>
                      <div className="date">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>
                          {user?.birthDay
                            ? moment(user?.birthDay).format("DD/MM/YYYY")
                            : "00/00/0000"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {user?.id === currentUser?.id && (
                    <Link to={`/nguoi-dung/${currentUser?.id}/info`}>
                      <div className="detailUser__wrapper__header__main__button">
                        <button>Chỉnh sửa</button>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
              <div className="detailUser__wrapper__body row">
                <div className=" col pc-9 t-8 m-12">
                  <div className="detailUser__wrapper__body__left">
                    <div className="detailUser__wrapper__body__left__control">
                      <Link
                        to={`/nguoi-dung/${id}/`}
                        className={`${controlPathname === id && "active"}`}
                      >
                        <span>Giới thiệu</span>
                      </Link>

                      {user?.id === currentUser?.id && (
                        <>
                          <Link
                            to={`/nguoi-dung/${id}/info`}
                            className={`${controlPathname === "info" && "active"}`}
                          >
                            <span>Thông tin</span>
                          </Link>
                          <Link
                            to={`/nguoi-dung/${id}/apply`}
                            className={`${controlPathname === "apply" && "active"}`}
                          >
                            <span>Ứng tuyển</span>
                          </Link>
                          <Link
                            to={`/nguoi-dung/${id}/jobs`}
                            className={`${controlPathname === "jobs" && "active"}`}
                          >
                            <span>Việc làm</span>
                          </Link>
                          <Link
                            to={`/nguoi-dung/${id}/companies`}
                            className={`${controlPathname === "companies" && "active"}`}
                          >
                            <span>Theo dõi</span>
                          </Link>
                        </>
                      )}
                    </div>

                    <div className="detailUser__wrapper__body__left__control-mobile">
                      <Link
                        to={`/nguoi-dung/${id}/`}
                        className={`${controlPathname === id && "active"}`}
                      >
                        <span>Giới thiệu</span>
                      </Link>
                      {currentUser?.id === user.id && (
                        <Link
                          to={`/nguoi-dung/${id}/info`}
                          className={`${controlPathname === "info" && "active"}`}
                        >
                          <span>Thông tin</span>
                        </Link>
                      )}
                      {currentUser?.id === user.id && (
                        <div className="button__more" ref={controlMbRef}>
                          <button
                            className={`button__more__toggle ${openControlMb && "active"}`}
                            onClick={() => setOpenControlMb(!openControlMb)}
                          >
                            <span>Thêm</span>
                            <i className="fa-solid fa-angle-down"></i>
                          </button>
                          {openControlMb && (
                            <div className="button__more__dropdown">
                              <Link
                                to={`/nguoi-dung/${id}/apply`}
                                className={`${controlPathname === "apply" && "active"}`}
                              >
                                <span>Ứng tuyển</span>
                              </Link>
                              <Link
                                to={`/nguoi-dung/${id}/jobs`}
                                className={`${controlPathname === "jobs" && "active"}`}
                              >
                                <span>Công việc</span>
                              </Link>
                              <Link
                                to={`/nguoi-dung/${id}/companies`}
                                className={`${controlPathname === "companies" && "active"}`}
                              >
                                <span>Công ty</span>
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="detailUser__wrapper__body__left__content">
                      <Routes>
                        <Route index element={<IntroUser intro={user?.intro} />} />
                        <Route path="info" element={<InfoUser />} />
                        <Route path="apply" element={<AppliedJobs />} />
                        <Route path="jobs" element={<JobsSave />} />
                        <Route path="companies" element={<CompaniesSave />} />
                      </Routes>
                    </div>
                  </div>
                </div>
                <div className="col pc-3 t-4 m-12">
                  <div className="detailUser__wrapper__body__right">
                    <h4>Thông tin</h4>
                    <div className="cv">
                      <i className="fa-solid fa-globe"></i>
                      {user?.linkCv ? (
                        <a href={user?.linkCv}>{user?.linkCv}</a>
                      ) : (
                        <span>Không có</span>
                      )}
                    </div>
                    <div className="mail">
                      <i className="fa-regular fa-envelope"></i>
                      <a href={`mailto:${user?.email}`}>{user?.email}</a>
                    </div>
                    <div className="province">
                      <i className="fa-solid fa-location-dot"></i>
                      {user?.province ? (
                        <span href="">{user?.province}</span>
                      ) : (
                        <span>Không có</span>
                      )}
                    </div>
                  </div>
                  <RecomKeywork />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalCropImage openModal={openModalEditAvatar} setOpenModal={setOpenModalEditAvatar} />
      <div className={`modal__avatar ${openModalAvatar ? "active" : ""}`}>
        <div ref={modalAvatarRef} className="modal__avatar__wrapper">
          <img src={user?.avatarPic ? apiImage + user?.avatarPic : avatar} alt="" />
          <button onClick={() => setOpenModalAvatar(false)} className="modal__avatar__close">
            <i className="fa fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
