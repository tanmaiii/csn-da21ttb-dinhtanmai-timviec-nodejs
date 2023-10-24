import React from "react";
import "./listJobCol.scss";
import ItemJob from "../../components/itemJob/ItemJob";
import jobs from "../../config/jobs";

export default function ListJobCol({ name, category }) {
  return (
    <div className="listJobCol">
      <div className="listJobCol__wrapper">
        <div className="listJobCol__wrapper__header">
          <h4>{name}</h4>
        </div>
        <div className="listJobCol__wrapper__body">
          {jobs.slice(0, 5).map((job) => (
            <div className="listJobCol__wrapper__body__item col pc-12 t-12 m-0">
              <div className="listJobCol__wrapper__body__item__box">
                <h4 className="name__job">{job.name}</h4>
                <h6 className="name_company">{job.company}</h6>
                <div className="wage">
                  <i class="fa-solid fa-dollar-sign"></i>
                  <span>{job?.wage}</span>
                </div>
                <p className="workingForm">{job?.workingForm}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="listJobCol__wrapper__bottom"></div>
      </div>
    </div>
  );
}
