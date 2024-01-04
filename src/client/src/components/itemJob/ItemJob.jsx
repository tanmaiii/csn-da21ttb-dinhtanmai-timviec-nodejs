import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import "./itemJob.scss";
import { Link, useNavigate } from "react-router-dom";
import { apiImage, makeRequest } from "../../axios";
import { useAuth } from "../../context/authContext";
import img from "../../assets/images/avatarCpn.png";
import Modal from "../modal/Modal";
import moment from "moment";
import "moment/locale/vi";
import PropTypes from "prop-types";

import { useMutation, useQuery, useQueryClient } from "react-query";

export default function ItemJob({ className, job, onClick }) {
  const [openModalHidden, setOpenModalHidden] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const { currentCompany, currentUser } = useAuth();
  const [userSave, setUserSave] = useState();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const buttonMoreRef = useRef();

  const getUserSave = async () => {
    setLoadingSave(true);
    try {
      const res = await makeRequest.get(`save/user?idJob=${job.id}`);
      setUserSave(res.data);
      setLoadingSave(false);
    } catch (error) {}
    setLoadingSave(false);
  };

  const { isLoading, error, data } = useQuery(["save", job.id], () => {
    return getUserSave();
  });

  const mutationSave = useMutation(
    (saved) => {
      if (saved) return makeRequest.delete("/save?idJob=" + job?.id);
      return makeRequest.post("/save?idJob=" + job?.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["save", job?.id]);
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
      toast.success("Xóa bài tuyển dụng thành công.");
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setOpenModalDelete(false);
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

  return (
    <>
      <div className={`itemJob ${className && className}`} onClick={onClick}>
        <div className="itemJob__wrapper">
          <div className="itemJob__wrapper__header">
            <img
              className="image-loading"
              src={job?.avatarPic ? apiImage + job?.avatarPic : img}
              alt=""
            />
            <div className="text">
              <Link to={`/viec-lam/${job?.id}`}>
                <h4 className="nameJob">{job?.nameJob}</h4>
              </Link>
              <Link to={`/nha-tuyen-dung/${job?.idCompany}`}>
                <h6 className="nameCompany">{job?.nameCompany}</h6>
              </Link>
            </div>
          </div>
          <div className="itemJob__wrapper__body">
            <div className="itemJob__wrapper__body__inportant">
              <div className="wage">
                <i className="fa-solid fa-dollar-sign"></i>
                <span>
                  {job?.salaryMax === 0 && job?.salaryMin === 0
                    ? "Thảo thuận"
                    : `${job?.salaryMin} - ${job?.salaryMax} triệu`}
                </span>
              </div>
              <div className="typeWork">
                <span>{job?.typeWork}</span>
              </div>
              <div className="province">
                <i className="fa-solid fa-location-dot"></i>
                <span>{job?.province}</span>
              </div>
            </div>
          </div>
          <div className="itemJob__wrapper__bottom">
            <span className="createdAt">{moment(job?.createdAt).fromNow()}</span>
            <div className="itemJob__wrapper__bottom__button">
              {job.deletedAt && job?.deletedAt !== null ? (
                <div className="job__hide">
                  <i className="fa-regular fa-circle-xmark"></i>
                  <span>Ngừng ứng tuyển</span>
                </div>
              ) : (
                <button
                  className="button__apply"
                  onClick={() => navigate(`/viec-lam/${job?.id}`, { state: { apply: true } })}
                >
                  <span>Ứng tuyển</span>
                </button>
              )}

              <button className="button__save" onClick={() => handleSubmitSave()}>
                {loadingSave ? (
                  <div className="icon-loading">
                    <div className="loading"></div>
                  </div>
                ) : userSave?.includes(currentUser?.id) ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>

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
                      <i className="fa-regular fa-trash-can"></i>
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
        </div>
      </div>
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

ItemJob.propTypes = {
  job: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
