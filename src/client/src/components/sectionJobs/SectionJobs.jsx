import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sectionJobs.scss";
import ItemJob from "../itemJob/ItemJob";
import { makeRequest } from "../../axios";

export default function SectionJobs({ title }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState();
  const [err, setErr] = useState(false);
  const sectionJobsRef = useRef();

  const getJobs = async () => {
    setLoading(true);
    try {
      const res = await makeRequest("/job?limit=6&page1");
      setJobs(res.data.data);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    getJobs()
  },[])
  

  return (
    <div className="sectionJobs">
      <div className="sectionJobs__header">
        <h4>{title}</h4>
      </div>
      <div className="sectionJobs__body">
        <div ref={sectionJobsRef} className=" sectionJobs__body__list row">
          {jobs &&
            jobs?.map((job, i) => (
              <ItemJob key={i} job={job} className={"col pc-6 t-6 m-12"} />
            ))}
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
