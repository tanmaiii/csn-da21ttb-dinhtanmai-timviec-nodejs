import React, { useEffect, useState } from "react";
import "./jobsCompany.scss";
import ItemJob from "../../../components/itemJob/ItemJob";
import Pagination from "../../../components/pagination/Pagination";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../../axios";

export default function JobsCompany() {
  const [paginate, setPaginate] = useState(1);
  const [jobs, setJobs] = useState();
  const { id } = useParams();

  const getJob = async () => {
    try {
      const res = await makeRequest.get(`/job/company/${id}?page=1&limit=5`);
      setJobs(res.data);
    } catch (error) {}
  };

  console.log(jobs);

  useEffect(() => {
    getJob();
  }, []);

  return (
    <div className="jobsCompany">
      <Pagination
        totalItem={30}
        limit={10}
        paginate={paginate}
        setPaginate={setPaginate}
      />
    </div>
  );
}
