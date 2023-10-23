import React from "react";
import ItemJob from "../../components/itemJob/ItemJob";
import jobs from '../../config/jobs'

export default function ListJobCol({ name, category }) {
  return (
    <div className="listJobCol">
      <div className="listJobCol__wrapper">
        <div className="listJobCol__wrapper__header">
          <h4>{name}</h4>
        </div>
        <div className="listJobCol__wrapper__body">
            {jobs.map(job =>(
                <ItemJob job={job} className={"col pc-12"}/>
            ))}
        </div>
        <div className="listJobCol__wrapper__bottom"></div>
      </div>
    </div>
  );
}
