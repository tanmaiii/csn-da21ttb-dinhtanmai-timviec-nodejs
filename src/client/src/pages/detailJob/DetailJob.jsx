import React, { useEffect, useRef, useState } from "react";
import "./detailJob.scss";
import img from "../../assets/images/avatarCpn.png";
import ListJobCol from "../../components/listJobCol/ListJobCol";
import Modal from "../../components/modal/Modal";
import ApplyJob from "../../components/applyJob/ApplyJob";
import Loader from "../../components/loader/Loader";
import { makeRequest, apiImage } from "../../axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useMode } from "../../context/ModeContext";
import PreviewJob from "../../components/previewJob/PreviewJob";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

export default function DetailJob() {
  const [openModal, setOpenModal] = useState(false);
  const [save, setSave] = useState(false);
  const [err, setErr] = useState(false);
  const [userSave, setUserSave] = useState();
  const [job, setJob] = useState();
  const [openMore, setOpenMore] = useState(false);
  const { idJob } = useParams();
  const { currentCompany, currentUser } = useAuth();
  const { darkMode } = useMode();
  const buttonMoreRef = useRef();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getJob = async () => {
    try {
      const res = await makeRequest.get("job/" + idJob);
      setJob(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getJob();
    window.scrollTo(0, 0);
  }, [idJob]);

  useEffect(() => {
    if (currentCompany?.id === job?.idCompany) {
      const handleMousedown = (e) => {
        if (!buttonMoreRef.current.contains(e.target)) {
          setOpenMore(false);
        }
      };
      document.addEventListener("mousedown", handleMousedown);
      return () => document.removeEventListener("mousedown", handleMousedown);
    }
  });

  const getUserSave = async () => {
    try {
      const res = await makeRequest.get(`save/user?idJob=${job?.id}`);
      setUserSave(res.data);
    } catch (error) {}
  };

  const { isLoading, error, data } = useQuery(["save", job?.id], () => {
    return getUserSave();
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
    if (!currentUser) return navigate("/nguoi-dung/dang-nhap");
    mutationSave.mutate(userSave?.includes(currentUser?.id));
  };

  return (
    <>
      <div className="detailJob">
        <div className="container">
          <div className="detailJob__wrapper row">
            <div className="detailJob__wrapper__main col pc-9 t-8 m-12">
              <div className="detailJob__wrapper__main__image">
                <img
                  src={job?.avatarPic ? apiImage + job.avatarPic : img}
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
                  <button
                    className="btn_apply"
                    onClick={() => setOpenModal(true)}
                  >
                    Ứng tuyển
                  </button>
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
                </div>
                <div className="detailJob__wrapper__main__button__company">
                  {job?.idCompany === currentCompany?.id && (
                    <div ref={buttonMoreRef} className="button__more">
                      <button onClick={() => setOpenMore(!openMore)}>
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                      <div
                        className={`button__more__body  ${
                          openMore && "active"
                        }`}
                      >
                        <button>
                          <i className="fa-solid fa-pen-to-square"></i>
                          <span>Sửa</span>
                        </button>
                        <button>
                          <i className="fa-solid fa-trash"></i>
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`detailJob__wrapper__main__important  ${
                  darkMode && "dark"
                }`}
              >
                <div className="detailJob__wrapper__main__important__col col pc-6 t-6 m-12">
                  <div className="item">
                    <div className="header">
                      <i class="fa-solid fa-location-dot"></i>
                      <h4>Địa điểm</h4>
                    </div>
                    <span className="content">{job?.province}</span>
                  </div>
                  <div className="item">
                    <div className="header">
                      <i class="fa-solid fa-briefcase"></i>
                      <h4>Ngành nghề</h4>
                    </div>
                    <Link to={`/search/${job?.idField}`}>
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
                        ? "Thương lượng"
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
                    <span className="content">
                      {job?.experience || "Không yêu cầu"}
                    </span>
                  </div>
                  <div className="item">
                    <div className="header">
                      <i class="fa-solid fa-chart-gantt"></i>
                      <h4>Hình thức</h4>
                    </div>
                    <span className="content">
                      {job?.typeWork || "Không yêu cầu"}
                    </span>
                  </div>
                  <div className="item">
                    <div className="header">
                      <i className="fa-solid fa-graduation-cap"></i>
                      <h4>Học vấn</h4>
                    </div>
                    <span className="content">
                      {job?.level || "Không yêu cầu"}
                    </span>
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
            <div className="detailJob__wrapper__side col pc-3 t-4 m-12">
              <ListJobCol
                name={"Công việc liên quan"}
                idField={job?.idField}
                idJob={job?.id}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={"Ứng tuyển"}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <ApplyJob />
      </Modal>
    </>
  );
}
