import React, { useRef, useState } from "react";
import "./itemCompany.scss";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/avatarCpn.png";
import { apiImage } from "../../axios";
import { makeRequest } from "../../axios";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useAuth } from "../../context/authContext";

export default function ItemCompany({ company, className, style }) {
  const btnRef = useRef();
  const navigate = useNavigate();
  const [follower, setFollower] = useState();
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  const handleClick = (e) => {
    if (!btnRef.current.contains(e.target)) {
      return navigate(`/nha-tuyen-dung/${company?.id}`);
    }
  };

  const { isLoading: loadingFollow, data: dataFollow } = useQuery(
    ["follower", company?.id],
    () => {
      return getFollower();
    }
  );

  const getFollower = async () => {
    try {
      const res = await makeRequest("follow/follower?idCompany=" + company?.id);
      setFollower(res.data);
    } catch (error) {}
  };

  const mutationFollow = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/follow?idCompany=" + company?.id);
      return makeRequest.post("/follow?idCompany=" + company?.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["follower"]);
      },
    }
  );

  const handleSubmitFollow = () => {
    if (!currentUser) return navigate("/nguoi-dung/dang-nhap");
    mutationFollow.mutate(follower?.includes(currentUser?.id));
  };

  return (
    company && (
      <div
        onClick={(e) => handleClick(e)}
        className={`itemCompany ${className && className}`}
      >
        <div className="itemCompany__wrapper">
          <img
            className="itemCompany__wrapper__image"
            src={company?.avatarPic ? apiImage + company?.avatarPic : img}
            alt=""
          />
          <div className="itemCompany__wrapper__body">
            <h2 className="name">{company?.nameCompany}</h2>
            <div className="desc">
              <div className="province">
                <i class="fa-solid fa-location-dot"></i>
                <span>{company?.province}</span>
              </div>
              <span className="job">12 việc làm</span>
            </div>
          </div>
          <button
            ref={btnRef}
            className={`btn__follow`}
            onClick={() => handleSubmitFollow()}
          >
            {follower?.includes(currentUser?.id) ? (
              <i className="fa-solid fa-heart"></i>
              ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </button>
        </div>
      </div>
    )
  );
}
