import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import "./detailJob.scss";
import img from "../../assets/images/avatarCpn.png";
import ListJobCol from "../../components/listJobCol/ListJobCol";
import Modal from "../../components/modal/Modal";
import ApplyJob from "../../components/applyJob/ApplyJob";
import Loader from "../../components/loader/Loader";
import { makeRequest, apiImage } from "../../axios";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useMode } from "../../context/ModeContext";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import NotFound from "../notFound/NotFound";
import RecomKeyword from "../../components/recomKeyword/RecomKeyword";

import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  FacebookShareButton,
  EmailShareButton,
  TwitterShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon,
} from "react-share";

export default function DetailJob() {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(location?.state?.apply || false);
  const [openModalHidden, setOpenModalHidden] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [userSave, setUserSave] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [userApply, setUserApply] = useState();
  const [job, setJob] = useState([]);
  const [openMore, setOpenMore] = useState(false);
  const { idJob } = useParams();
  const { currentCompany, currentUser } = useAuth();
  const { darkMode } = useMode();
  const buttonMoreRef = useRef();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const urlShare = window.location.href;

  const getJob = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("job/" + idJob);
      setJob(res.data);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  const {} = useQuery(["job", idJob], () => {
    return getJob();
  });

  useEffect(() => {
    if (currentCompany?.id === job?.idCompany) {
      const handleMousedown = (e) => {
        if (!buttonMoreRef?.current?.contains(e.target)) {
          setOpenMore(false);
        }
      };
      document.addEventListener("mousedown", handleMousedown);
      return () => document.removeEventListener("mousedown", handleMousedown);
    }
  });

  const getUserSave = async () => {
    setLoadingSave(true);
    try {
      const res = await makeRequest.get(`save/user?idJob=${job?.id}`);
      setUserSave(res.data);
      setLoadingSave(false);
    } catch (error) {}
    setLoadingSave(false);
  };

  const {} = useQuery(["save", job?.id], () => {
    return getUserSave();
  });

  const getUseApply = async () => {
    try {
      const res = await makeRequest.get(`apply/user?idJob=${job?.id}`);
      setUserApply(res.data);
    } catch (error) {}
  };

  const {} = useQuery(["apply", job?.id], () => {
    return getUseApply();
  });

  const mutationSave = useMutation(
    (saved) => {
      if (saved) return makeRequest.delete("/save?idJob=" + job?.id);
      return makeRequest.post("/save?idJob=" + job?.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["save"]);
      },
    }
  );

  const handleSubmitSave = () => {
    if (!currentUser) return navigate("/dang-nhap/nguoi-dung");
    mutationSave.mutate(userSave?.includes(currentUser?.id));
    userSave?.includes(currentUser?.id)
      ? toast.success("Đã gỡ khỏi việc làm yêu thích.", {
          action: {
            label: "Việc làm",
            onClick: () => navigate(`/nguoi-dung/${currentUser?.id}/jobs`),
          },
        })
      : toast.success("Đã thêm vào việc làm yêu thích.", {
          action: {
            label: "Việc làm",
            onClick: () => navigate(`/nguoi-dung/${currentUser?.id}/jobs`),
          },
        });
  };

  const putHiddenJob = async () => {
    try {
      job.deletedAt !== null
        ? await makeRequest.put("job/unHidden?idJob=" + job.id)
        : await makeRequest.put("job/hidden?idJob=" + job.id);

      toast.success("Thay đổi trạng thái bài tuyển dụng thành công.");
      setOpenModalHidden(false);
    } catch (error) {
      toast.error(error?.reponse?.data);
    }
  };

  const mutationHidden = useMutation(
    () => {
      return putHiddenJob();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["job"]);
      },
    }
  );

  const handleClickHidden = async () => {
    mutationHidden.mutate();
  };

  const deleteJob = async () => {
    try {
      await makeRequest.delete("job/?idJob=" + job.id);
      setOpenModalDelete(false);
      navigate(-1);
      toast.success("Xóa bài tuyển dụng thành công.");
    } catch (error) {
      console.log(error);
    }
  };

  const mutationDelete = useMutation(
    () => {
      return deleteJob();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["job"]);
      },
    }
  );

  const handleClickDelete = async () => {
    mutationDelete.mutate();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [idJob]);

  return (
    <>
      <div className="detailJob">
        {!job ? (
          <NotFound />
        ) : (
          <div className="container">
            <Breadcrumbs field={job?.nameField} name={job?.nameJob} />
            <div className="detailJob__share">
              <div className="detailJob__share__wrapper">
                <div className="detailJob__share__wrapper__list">
                  <div
                    className="detailJob__share__wrapper__list__item"
                    data-tooltip="Chia sẻ qua Facebook"
                  >
                    <FacebookShareButton url={urlShare}>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </div>
                  <div
                    className="detailJob__share__wrapper__list__item"
                    data-tooltip="Chia sẻ qua Email"
                  >
                    <EmailShareButton url={urlShare}>
                      <EmailIcon size={32} round />
                    </EmailShareButton>
                  </div>
                  <div
                    className="detailJob__share__wrapper__list__item"
                    data-tooltip="Chia sẻ qua X"
                  >
                    <TwitterShareButton url={urlShare}>
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="detailJob__wrapper row">
              <div className="col pc-9 t-8 m-12">
                {loading ? (
                  <Loader />
                ) : (
                  <div className="detailJob__wrapper__main">
                    <div className="detailJob__wrapper__main__image">
                      <img
                        className="image-loading"
                        src={job?.avatarPic ? apiImage + job.avatarPic : img}
                        onError={(e) => (e.target.src = img)}
                        alt=""
                      />
                      <div className="detailJob__wrapper__main__image__name">
                        <h4>{job?.nameJob}</h4>
                        <Link to={`/nha-tuyen-dung/${job?.idCompany}`}>
                          <span>{job?.nameCompany}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="detailJob__wrapper__main__button">
                      <div className="detailJob__wrapper__main__button__user">
                        {job?.deletedAt === null ? (
                          userApply?.includes(currentUser?.id) ? (
                            <button className="btn_applied">
                              <i class="fa-regular fa-circle-check"></i>
                              <span>Đã ứng tuyển</span>
                            </button>
                          ) : (
                            <button className="btn_apply" onClick={() => setOpenModal(true)}>
                              Ứng tuyển
                            </button>
                          )
                        ) : (
                          <button className="btn_stops">
                            <i class="fa-solid fa-exclamation"></i>
                            <span>Ngừng ứng tuyển</span>
                          </button>
                        )}
                        {loadingSave ? (
                          <div className="loading"></div>
                        ) : (
                          <button className="btn_save" onClick={() => handleSubmitSave()}>
                            {userSave?.includes(currentUser?.id) ? (
                              <>
                                <i class="fa-solid fa-heart"></i>
                                <span>Đã Lưu</span>
                              </>
                            ) : (
                              <>
                                <i class="fa-regular fa-heart"></i>
                                <span>Lưu</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      <div className="detailJob__wrapper__main__button__company">
                        {job?.idCompany === currentCompany?.id && (
                          <div ref={buttonMoreRef} className="button__more">
                            <button onClick={() => setOpenMore(!openMore)}>
                              <i className="fa-solid fa-ellipsis"></i>
                            </button>
                            <div className={`button__more__body  ${openMore && "active"}`}>
                              <Link to={`/nha-tuyen-dung/chinh-sua/${job?.id}`}>
                                <button>
                                  <i className="fa-regular fa-pen-to-square"></i>
                                  <span>Sửa</span>
                                </button>
                              </Link>
                              <button onClick={() => setOpenModalDelete(true)}>
                                <i class="fa-regular fa-trash-can"></i>
                                <span>Xóa</span>
                              </button>
                              <button onClick={() => setOpenModalHidden(true)}>
                                {job.deletedAt !== null ? (
                                  <>
                                    <i className="fa-regular fa-circle-check"></i>
                                    <span>Tuyển dụng</span>
                                  </>
                                ) : (
                                  <>
                                    <i className="fa-regular fa-circle-xmark"></i>
                                    <span>Ngừng tuyển dụng</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`detailJob__wrapper__main__important  ${darkMode && "dark"}`}>
                      <div className="detailJob__wrapper__main__important__col col pc-6 t-6 m-12">
                        <div className="item">
                          <div className="header">
                            <i class="fa-solid fa-location-dot"></i>
                            <h4>Địa điểm</h4>
                          </div>
                          <Link to={`/tim-kiem?&province[]=${job?.province}`}>
                            <span className="content">{job?.province}</span>
                          </Link>
                        </div>
                        <div className="item">
                          <div className="header">
                            <i class="fa-solid fa-briefcase"></i>
                            <h4>Ngành nghề</h4>
                          </div>
                          <Link to={`/tim-kiem?&field[]=${job?.nameField}`}>
                            <span className="content">{job?.nameField || "..."}</span>
                          </Link>
                        </div>
                        <div className="item">
                          <div className="header">
                            <i class="fa-solid fa-dollar-sign"></i>
                            <h4>Lương</h4>
                          </div>
                          <span className="content">
                            {job?.salaryMin === 0 || job?.salaryMax === 0
                              ? "Thảo thuận"
                              : `${job?.salaryMin} - ${job?.salaryMax} tr`}
                          </span>
                        </div>
                        <div className="item">
                          <div className="header">
                            <i class="fa-solid fa-user"></i>
                            <h4>Giới tính</h4>
                          </div>
                          <span className="content">{job?.sex || "n"}</span>
                        </div>
                      </div>
                      <div className="detailJob__wrapper__main__important__col col pc-6 t-6 m-12">
                        <div className="item">
                          <div className="header">
                            <i className="fa-solid fa-business-time"></i>
                            <h4>Kinh nghiệm</h4>
                          </div>
                          <span className="content">{job?.experience || "Không yêu cầu"}</span>
                        </div>
                        <div className="item">
                          <div className="header">
                            <i class="fa-solid fa-chart-gantt"></i>
                            <h4>Hình thức</h4>
                          </div>
                          <span className="content">{job?.typeWork || "Không yêu cầu"}</span>
                        </div>
                        <div className="item">
                          <div className="header">
                            <i className="fa-solid fa-graduation-cap"></i>
                            <h4>Học vấn</h4>
                          </div>
                          <span className="content">{job?.education || "Không yêu cầu"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="detailJob__wrapper__main__content">
                      <div className="detailJob__wrapper__main__content__item previewJob__content__desctribe">
                        <div className="detailJob__wrapper__main__content__item__header">
                          <h4>MÔ TẢ CÔNG VIỆC</h4>
                        </div>
                        <div
                          className="detailJob__wrapper__main__content__item__body"
                          dangerouslySetInnerHTML={{ __html: job?.desc }}
                        ></div>
                      </div>
                      <div className="detailJob__wrapper__main__content__item previewJob__content__request">
                        <div className="detailJob__wrapper__main__content__item__header">
                          <h4>YÊU CẦU CÔNG VIỆC</h4>
                        </div>
                        <div
                          className="detailJob__wrapper__main__content__item__body"
                          dangerouslySetInnerHTML={{ __html: job?.request }}
                        ></div>
                      </div>
                      <div className="detailJob__wrapper__main__content__item previewJob__content__other">
                        <div className="detailJob__wrapper__main__content__item__header">
                          <h4>THÔNG TIN KHÁC</h4>
                        </div>
                        <div
                          className="detailJob__wrapper__main__content__item__body"
                          dangerouslySetInnerHTML={{ __html: job?.other }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col pc-3 t-4 m-12">
                <ListJobCol
                  name={"Công việc liên quan"}
                  nameField={job?.nameField}
                  idField={job?.idField}
                  idJob={job?.id}
                />
                <RecomKeyword />
              </div>
            </div>
          </div>
        )}
      </div>
      {!userApply?.includes(currentUser?.id) && (
        <Modal title={"Ứng tuyển"} openModal={openModal} setOpenModal={setOpenModal}>
          {openModal && <ApplyJob job={job && job} setOpenModal={setOpenModal} />}
        </Modal>
      )}
      {
        <Modal
          title={"Ngừng tuyển dụng"}
          openModal={openModalHidden}
          setOpenModal={setOpenModalHidden}
        >
          <div className="modal__sure">
            <h2>{`${
              job.deletedAt !== null
                ? "Bạn có chắc chắn muốn tuyển dụng lại công việc này không?"
                : "Bạn có chắc chắn muốn ngừng tuyển dụng công việc này không?"
            }`}</h2>
            <div className="modal__sure__footer">
              <button className="btn-cancel" onClick={() => setOpenModalHidden(false)}>
                Hủy
              </button>
              <button className="btn-submit" onClick={handleClickHidden}>
                Xác nhận
              </button>
            </div>
          </div>
        </Modal>
      }
      {
        <Modal
          title={"Xóa bài tuyển dụng"}
          openModal={openModalDelete}
          setOpenModal={setOpenModalDelete}
        >
          <div className="modal__sure">
            <h2>Bạn có chắc chắn muốn xóa công việc này không ?</h2>
            <span>
              Khi đã xóa bài tuyển dụng, những người dùng đã ứng tuyển cũng sẽ bị xóa theo.
            </span>
            <div className="modal__sure__footer">
              <button className="btn-cancel" onClick={() => setOpenModalDelete(false)}>
                Hủy
              </button>
              <button className="btn-submit" onClick={handleClickDelete}>
                Xác nhận
              </button>
            </div>
          </div>
        </Modal>
      }
    </>
  );
}
