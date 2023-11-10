import React, { useEffect, useState } from "react";
import "./listJobCol.scss";
import ItemJob from "../../components/itemJob/ItemJob";
import { makeRequest } from "../../axios";

export default function ListJobCol({ name, idField, idJob }) {
  const [jobs, setJobs] = useState();
  const limit = 6;
  const paginate = 1;

  useEffect(() => {
    const getJob = async () => {
      try {
        const res = await makeRequest.get(
          `job/field/${idField}?page=${paginate}&limit=${limit}`
        );
        setJobs(res.data.data);
        console.log(res);
      } catch (error) {}
    };
    getJob();
  }, [idField]);

  return (
    <div className="listJobCol">
      <div className="listJobCol__wrapper">
        <div className="listJobCol__wrapper__header">
          <h4>{name}</h4>
        </div>
        <div className="listJobCol__wrapper__body">
          {jobs?.map((job) => {
            if (job?.id === idJob) return;
            return <ItemJob job={job} className={"col pc-12"} />;
          })}
        </div>
        <div className="listJobCol__wrapper__bottom"></div>
      </div>
    </div>
  );
}
