import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import "./itemJob.scss";
import { Link, useNavigate } from "react-router-dom";
import { apiImage, makeRequest } from "../../axios";
import { useAuth } from "../../context/authContext";
import img from "../../assets/images/avatarCpn.png";
import moment from "moment";
import "moment/locale/vi";

import { useMutation, useQuery, useQueryClient } from "react-query";

export default function ItemJob({ className, job, onClick }) {
  const [save, setSave] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const { currentCompany, currentUser } = useAuth();
  const [userSave, setUserSave] = useState();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const buttonMoreRef = useRef();

  const getUserSave = async () => {
    try {
      const res = await makeRequest.get(`save/user?idJob=${job.id}`);
      setUserSave(res.data);
    } catch (error) {}
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
      await makeRequest.put("job/hidden?idJob=" + job.id);
      toast.success("Xóa bài tuyển dụng thành công.");
    } catch (error) {
      toast.error(error?.reponse?.data);
    }
  };

  const mutationDelete = useMutation(
    () => {
      return putHiddenJob();
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
    <div className={`itemJob ${className && className}`} onClick={onClick}>
      <div className="itemJob__wrapper">
        <div className="itemJob__wrapper__header">
          <img src={job?.avatarPic ? apiImage + job?.avatarPic : img} alt="" />
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
            {job?.idCompany === currentCompany?.id && (
              <div ref={buttonMoreRef} className="button__more">
                <button onClick={() => setOpenMore(!openMore)}>
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
                <div className={`button__more__body  ${openMore && "active"}`}>
                  <Link to={`/nha-tuyen-dung/chinh-sua/${job?.id}`}>
                    <button>
                      <i className="fa-solid fa-pen-to-square"></i>
                      <span>Sửa</span>
                    </button>
                  </Link>
                  <button onClick={() => handleClickDelete()}>
                    <i className="fa-regular fa-trash-can"></i>
                    <span>Xóa</span>
                  </button>
                </div>
              </div>
            )}
            {!currentCompany && (
              <button className="button__save" onClick={() => handleSubmitSave()}>
                {userSave?.includes(currentUser?.id) ? (
                  <i class="fa-solid fa-heart"></i>
                ) : (
                  <i class="fa-regular fa-heart"></i>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
