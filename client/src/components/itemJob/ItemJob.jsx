import React, { useState } from "react";
import "./itemJob.scss";
import img from "../../assets/images/FPT_logo.png";

export default function ItemJob({ className, job }) {
  const [save, setSave] = useState(false);

  return (
    <div className={`itemJob ${className && className}`}>
      <div className="itemJob__wrapper">
        <div className="itemJob__wrapper__image">
          <img src={job?.photo} alt="" />
        </div>
        <div className="itemJob__wrapper__body">
          <div className="itemJob__wrapper__body__header">
            <h4 className="name">{job?.name}</h4>
            <button onClick={() => setSave(!save)}>
              {save ? (
                <i class="fa-solid fa-bookmark"></i>
              ) : (
                <i class="fa-regular fa-bookmark"></i>
              )}
            </button>
          </div>
          <h5 className="company">{job?.company}</h5>
          <div className="address">
            <i class="fa-solid fa-location-dot"></i>
            <span>{job?.address}</span>
          </div>
          <div className="itemJob__wrapper__body__bottom">
            <div className="wage">
              <i class="fa-solid fa-dollar-sign"></i>
              <span>{job?.wage}</span>
            </div>
            <p className="workingForm">{job?.workingForm}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
