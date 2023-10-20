import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sectionJobs.scss";
import ItemJob from "../itemJob/ItemJob";
import jobs from "../../config/jobs";

export default function SectionJobs({ title }) {
  const sectionJobsRef = useRef();

  return (
    <div className="sectionJobs">
      <div className="sectionJobs__header">
        <h4>{title}</h4>
      </div>
      <div className="sectionJobs__body">
        <div ref={sectionJobsRef} className=" sectionJobs__body__list row">
          {jobs && jobs.map((job , i) => <ItemJob key={i} job={job} className={"col pc-6 t-6 m-12"} />)}
        </div>
      </div>
      <Link className="sectionJobs__btn">
        <button className="">
          <span>Xem tất cả</span> <i className="fa-solid fa-chevron-right"></i>
        </button>
      </Link>
    </div>
  );
}
