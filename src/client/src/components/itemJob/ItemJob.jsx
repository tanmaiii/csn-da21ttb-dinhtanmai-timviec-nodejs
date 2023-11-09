import React, { useEffect, useRef, useState } from "react";
import "./itemJob.scss";
import { Link } from "react-router-dom";
import { apiImage } from "../../axios";
import { useAuth } from "../../context/authContext";
import img from "../../assets/images/avatarCpn.png";
import moment from "moment";
import "moment/locale/vi";

export default function ItemJob({ className, job }) {
  const [save, setSave] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const { currentCompany } = useAuth();
  const buttonMoreRef = useRef();

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

  return (
    <div className={`itemJob ${className && className}`}>
      <div className="itemJob__wrapper">
        <div className="itemJob__wrapper__header">
          <div className="itemJob__wrapper__header__infoCpn">
            <img
              src={job?.avatarPic ? apiImage + job?.avatarPic : img}
              alt=""
            />
            <div className="text">
              <h2 className="nameCompany">{job?.nameCompany}</h2>
              <div className="place">
                <i className="fa-solid fa-location-dot"></i>
                <span>{job?.province}</span>
              </div>
            </div>
          </div>
          <div className="itemJob__wrapper__header__button">
            {job?.idCompany === currentCompany?.id && (
              <div ref={buttonMoreRef} className="button__more">
                <button onClick={() => setOpenMore(!openMore)}>
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
                <div className={`button__more__body  ${openMore && "active"}`}>
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
            <button onClick={() => setSave(!save)} className="button__save">
              {save ? (
                <i className="fa-solid fa-bookmark"></i>
              ) : (
                <i className="fa-regular fa-bookmark"></i>
              )}
            </button>
          </div>
        </div>
        <div className="itemJob__wrapper__body">
          <Link to={`/cong-viec/${job?.id}`}>
            <h4 className="nameJob">{job?.nameJob}</h4>
          </Link>
          <div className="inportant">
            <div className="wage">
              <i className="fa-solid fa-dollar-sign"></i>
              <span>
                {job?.salaryMax === 0 && job?.salaryMin === 0
                  ? "Thảo thuận"
                  : `${job?.salaryMin} - ${job?.salaryMax}`}
              </span>
            </div>
            <div className="typeWork">
              <span>{job?.typeWork}</span>
            </div>
          </div>
          <span className="createdAt">{moment(job?.createdAt).fromNow()}</span>
        </div>
      </div>
    </div>
  );
}
