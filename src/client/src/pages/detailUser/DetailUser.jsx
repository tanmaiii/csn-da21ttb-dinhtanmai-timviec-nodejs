import React, { useEffect, useRef, useState } from "react";
import "./detailUser.scss";
import avatar from "../../assets/images/avatar.png";

import ItemJob from "../../components/itemJob/ItemJob";
import ItemCompany from "../../components/itemCompany/ItemCompany";
import Loader from "../../components/loader/Loader";
import NotFound from "../notFound/NotFound";
import InfoUser from "./infoUser/InfoUser";
import IntroUser from "./introUser/IntroUser";
import AppliedJobs from "./appliedJobs/AppliedJobs";

import { useSearchParams, useParams } from "react-router-dom";
import jobs from "../../config/jobs";
import companies from "../../config/companies";
import { useAuth } from "../../context/authContext";
import { makeRequest,apiImage } from "../../axios";
import moment from "moment";

import { useMutation, useQuery, useQueryClient } from "react-query";

export default function DetailUser() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [openControlMb, setOpenControlMb] = useState(false);
  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const controlMbRef = useRef();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState();
  const queryClient = useQueryClient();

  const { id } = useParams();

  const getUser = async () => {
    try {
      const res = await makeRequest.get("/user/find/"+ id);
      setUser(res.data)
    } catch (error) {
        setErr('id không đúng')
    }
  }

  const { isLoading, error, data } = useQuery(["user", id], () => {
    return getUser();
  });

  const mutation = useMutation(
    () => {
      return getUser()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleChangeInputFile = async (e) => {
      try {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const postImage = await makeRequest.post("/upload", formData);
        await makeRequest.put("/user/uploadImage", {avatarPic: postImage.data})
        getUser()
        return postImage.data
      } catch (error) {
        console.log(error);
      }
      mutation.mutate();
  } 

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
  }, [searchParams]);

  return (
    <>
      {loading && <Loader />}
      {err && <NotFound />}
      {user && (
        <div className="detailUser">
          <div className="container">
            <div className="detailUser__wrapper">
              <div className="detailUser__wrapper__header">
                <div className="detailUser__wrapper__header__main">
                  <div className="detailUser__wrapper__header__main__image">
                    <img
                      src={user?.avatarPic ? (apiImage + user?.avatarPic): avatar}
                      alt=""
                    />
                    {user?.id === currentUser?.id && (
                      <label
                        htmlFor="input-avt-user"
                        className="detailUser__wrapper__header__main__image__edit"
                      >
                        <i className="fa-solid fa-upload"></i>
                        <input id="input-avt-user" type="file" onChange={(e) => handleChangeInputFile(e)}/>
                      </label>
                    )}
                  </div>
                  <div className="detailUser__wrapper__header__main__text">
                    <h4 className="detailUser__wrapper__header__main__text__name">
                      {user?.name}
                    </h4>
                    <div className="detailUser__wrapper__header__main__text__date">
                      <i className="fa-solid fa-calendar-days"></i>
                      <span>
                        {user?.birthDay
                          ? moment(user?.birthDay).format("DD/MM/YYYY")
                          : "00/00/0000"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="detailUser__wrapper__header__button">
                  <button>Chỉnh sửa</button>
                </div>
              </div>
              <div className="detailUser__wrapper__body row">
                <div className=" col pc-9 t-9 m-12">
                  <div className="detailUser__wrapper__body__left">
                    <div className="detailUser__wrapper__body__left__control">
                      <button
                        onClick={() => setSearchParams()}
                        className={`${
                          searchParams.get("tag") === null && "active"
                        }`}
                      >
                        <span>Giới thiệu</span>
                      </button>

                      {user?.id === currentUser?.id && (
                        <>
                          <button
                            onClick={() => setSearchParams({ ["tag"]: "info" })}
                            className={`${
                              searchParams.get("tag") === "info" && "active"
                            }`}
                          >
                            <span>Thông tin</span>
                          </button>
                          <button
                            onClick={() =>
                              setSearchParams({ ["tag"]: "apply" })
                            }
                            className={`${
                              searchParams.get("tag") === "apply" && "active"
                            }`}
                          >
                            <span>Ứng tuyển</span>
                          </button>
                          <button
                            onClick={() => setSearchParams({ ["tag"]: "jobs" })}
                            className={`${
                              searchParams.get("tag") === "jobs" && "active"
                            }`}
                          >
                            <span>Công việc</span>
                          </button>
                          <button
                            onClick={() =>
                              setSearchParams({ ["tag"]: "companies" })
                            }
                            className={`${
                              searchParams.get("tag") === "companies" &&
                              "active"
                            }`}
                          >
                            <span>Công ty</span>
                          </button>
                        </>
                      )}
                    </div>

                    <div className="detailUser__wrapper__body__left__control-mobile">
                      <button
                        onClick={() => setSearchParams()}
                        className={`${
                          searchParams.get("tag") === null && "active"
                        }`}
                      >
                        <span>Giới thiệu</span>
                      </button>
                      {currentUser?.id === user.id && (
                        <button
                          onClick={() => setSearchParams({ ["tag"]: "info" })}
                          className={`${
                            searchParams.get("tag") === "info" && "active"
                          }`}
                        >
                          <span>Thông tin</span>
                        </button>
                      )}
                      {currentUser?.id === user.id && (
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
                                  setSearchParams({ ["tag"]: "apply" })
                                }
                                className={`${
                                  searchParams.get("tag") === "apply" &&
                                  "active"
                                }`}
                              >
                                <span>Ứng tuyển</span>
                              </button>
                              <button
                                onClick={() =>
                                  setSearchParams({ ["tag"]: "jobs" })
                                }
                                className={`${
                                  searchParams.get("tag") === "jobs" && "active"
                                }`}
                              >
                                <span>Công việc</span>
                              </button>
                              <button
                                onClick={() =>
                                  setSearchParams({ ["tag"]: "companies" })
                                }
                                className={`${
                                  searchParams.get("tag") === "companies" &&
                                  "active"
                                }`}
                              >
                                <span>Công ty</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="detailUser__wrapper__body__left__content">
                      {searchParams.get("tag") === null && (
                        <IntroUser intro={user?.intro} />
                      )}
                      {searchParams.get("tag") === "info" && <InfoUser />}
                      {searchParams.get("tag") === "apply" && <AppliedJobs />}
                      {searchParams.get("tag") === "jobs" && (
                        <div className="jobsSave row">
                          {jobs.map((job, i) => (
                            <ItemJob
                              job={job}
                              key={i}
                              className={"col pc-12"}
                            />
                          ))}
                        </div>
                      )}
                      {searchParams.get("tag") === "companies" && (
                        <div className="companiesSave row">
                          {companies.map((company, i) => (
                            <ItemCompany
                              company={company}
                              key={i}
                              className={"col pc-6"}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col pc-3 t-3 m-0">
                  <div className="detailUser__wrapper__body__right">
                    <h6>Website</h6>
                    <div className="detailUser__wrapper__body__right__web">
                      <a href="https://www.facebook.com/">
                        https://www.facebook.com/
                      </a>
                    </div>
                    <h6>Theo dõi</h6>
                    <div className="detailUser__wrapper__body__right__list">
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
