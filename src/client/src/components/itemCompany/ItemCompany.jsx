import React, { useRef, useState } from "react";
import "./itemCompany.scss";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/avatarCpn.png";
import { apiImage } from "../../axios";
import { makeRequest } from "../../axios";
import PropTypes from "prop-types";

import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";

import { useAuth } from "../../context/authContext";

export default function ItemCompany({ company, className }) {
  const btnRef = useRef();
  const navigate = useNavigate();
  const [follower, setFollower] = useState();
  const [loadingSave, setLoadingSave] = useState(false);
  const [jobQty, setJobQty] = useState(0);
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  const handleClick = (e) => {
    if (!btnRef.current.contains(e.target)) {
      return navigate(`/nha-tuyen-dung/${company?.id}`);
    }
  };

  const getFollower = async () => {
    setLoadingSave(true);
    try {
      const res = await makeRequest.get("follow/follower?idCompany=" + company?.id);
      setFollower(res.data);
      setLoadingSave(false);
    } catch (error) {}
    setLoadingSave(false);
  };

  const getJobQty = async () => {
    try {
      const res = await makeRequest.get(`/job/company/${company?.id}`);
      setJobQty(res?.data?.pagination?.total);
    } catch (error) {}
  };

  const { isLoading: loadingJob, data: dataJob } = useQuery(["job", company?.id], () => {
    return getJobQty();
  });

  const { isLoading: loadingFollow, data: dataFollow } = useQuery(["follower", company?.id], () => {
    return getFollower();
  });
  

  const mutationFollow = useMutation(
    (following) => {
      if (following) return makeRequest.delete("/follow?idCompany=" + company?.id);
      return makeRequest.post("/follow?idCompany=" + company?.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["follower", company?.id]);
      },
    }
  );

  const handleSubmitFollow = () => {
    if (!currentUser) return navigate("/dang-nhap/nguoi-dung");
    mutationFollow.mutate(follower?.includes(currentUser?.id));

    follower?.includes(currentUser?.id)
      ? toast.success("Đã bỏ yêu thích công ty.")
      : toast.success("Đã thêm vào công ty yêu thích.");
  };

  return (
    company && (
      <div onClick={(e) => handleClick(e)} className={`itemCompany ${className && className}`}>
        <div className="itemCompany__wrapper">
          <div className="itemCompany__wrapper__image">
            <img
              className="image-loading"
              loading="lazy"
              src={company?.avatarPic ? apiImage + company?.avatarPic : img}
              onError={(e) => (e.target.src = img)}
              alt=""
            />
          </div>
          <div className="itemCompany__wrapper__body">
            <div className="itemCompany__wrapper__body__right">
              <h2 className="name">{company?.nameCompany}</h2>
              <div className="desc">
                <div className="province">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{company?.province}</span>
                </div>
                <span className="job">{jobQty ? (jobQty > 99 ? "+99" : jobQty) : 0} việc làm</span>
              </div>
            </div>
            <div className="itemCompany__wrapper__body__left">
              <button ref={btnRef} className={`btn__follow`} onClick={() => handleSubmitFollow()}>
                {loadingSave ? (
                  <div className="icon-loading">
                    <div className="loading"></div>
                  </div>
                ) : follower?.includes(currentUser?.id) ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

ItemCompany.propTypes = {
  company: PropTypes.object,
  className: PropTypes.string,
};
