import React, { useState, useEffect } from "react";
import "./previewJob.scss";
import img from "../../assets/images/avatarCpn.png";
import { useMode } from "../../context/ModeContext";
import Modal from "../../components/modal/Modal";
import ApplyJob from "../applyJob/ApplyJob";
import { makeRequest, apiImage } from "../../axios";
import Loader from "../loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

export default function PreviewJob({ setOpenModal, idJob }) {
  const [save, setSave] = useState(false);
  const { darkMode } = useMode();
  const [err, setErr] = useState(false);
  const [job, setJob] = useState();
  const [loading, setLoading] = useState(false);
  const [userSave, setUserSave] = useState();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getJob = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("job/" + idJob);
      setJob(res.data);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    getJob();
  }, [idJob]);

  useEffect(() => {
    const previewJobDoc = document.querySelector(".previewJob");
    previewJobDoc.scrollTo(0, 0);
  }, [idJob]);

  // save job
  const getUserSave = async () => {
    try {
      const res = await makeRequest.get(`save/user?idJob=${idJob}`);
      setUserSave(res.data);
    } catch (error) {}
  };

  const { isLoading, error, data } = useQuery(["save", idJob], () => {
    return getUserSave();
  });

  const mutationSave = useMutation(
    (saved) => {
      if (saved) return makeRequest.delete("/save?idJob=" + idJob);
      return makeRequest.post("/save?idJob=" + idJob);
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

  if (loading) return <Loader />;

  return (
    <>
      <div className="previewJob">
        <div className="previewJob__image">
          <img src={job?.avatarPic ? apiImage + job?.avatarPic : img} alt="" />
          <div className="previewJob__image__name">
            <h4>{job?.nameJob}</h4>
            <Link to={`/nha-tuyen-dung/${job?.idCompany}`}>
              <span>{job?.nameCompany}</span>
            </Link>
          </div>
        </div>
        <div className="previewJob__button">
          <button className="btn_apply" onClick={() => setOpenModal(true)}>
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
        <div className={`previewJob__info__main ${darkMode && "dark"}`}>
          <div className="previewJob__info__main__col col pc-6 t-6 m-12">
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
          <div className="previewJob__info__main__col col pc-6 t-6 m-12">
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
              <span className="content">{job?.level || "Không yêu cầu"}</span>
            </div>
          </div>
        </div>
        <div className="previewJob__content">
          <div className="previewJob__content__item previewJob__content__desctribe">
            <div className="previewJob__content__item__header">
              <h4>MÔ TẢ CÔNG VIỆC</h4>
            </div>
            <div
              className="previewJob__content__item__body"
              dangerouslySetInnerHTML={{ __html: job?.desc }}
            ></div>
          </div>
          <div className="previewJob__content__item previewJob__content__request">
            <div className="previewJob__content__item__header">
              <h4>YÊU CẦU CÔNG VIỆC</h4>
            </div>
            <div
              className="previewJob__content__item__body"
              dangerouslySetInnerHTML={{ __html: job?.request }}
            ></div>
          </div>
          <div className="previewJob__content__item previewJob__content__other">
            <div className="previewJob__content__item__header">
              <h4>THÔNG TIN KHÁC</h4>
            </div>
            <div
              className="previewJob__content__item__body"
              dangerouslySetInnerHTML={{ __html: job?.other }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
