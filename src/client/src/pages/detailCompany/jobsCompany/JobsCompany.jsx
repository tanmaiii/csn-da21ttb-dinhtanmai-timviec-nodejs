import React, { useEffect, useState } from "react";
import "./jobsCompany.scss";
import ItemJob from "../../../components/itemJob/ItemJob";
import Pagination from "../../../components/pagination/Pagination";
import { useParams } from "react-router-dom";
import { makeRequest, apiImage } from "../../../axios";
import { useQuery, useSearchParams } from "react-query";
import { Link } from "react-router-dom";
import Loader from "../../../components/loader/Loader";

export default function JobsCompany() {
  const [jobs, setJobs] = useState();
  const { id } = useParams();
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);
  const limit = 4;

  const getJob = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get(
        `/job/company/${id}?page=${paginate}&limit=${limit}`
      );
      setJobs(res.data.data);
      setTotalPage(res.data.pagination.totalPage);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    getJob();
  }, [paginate]);

  if (loading) return <Loader />;

  return (
    <div className="jobsCompany">
      {!jobs && <span>Chưa có việc làm.</span>}
      <div className="jobsCompany__list row">
        {jobs?.map((job, i) => (
          <ItemJob key={i} job={job} className={"col pc-6 t-12 m-12"} />
        ))}
      </div>
      <Pagination
        totalPage={totalPage}
        limit={limit}
        paginate={paginate}
        setPaginate={setPaginate}
      />
    </div>
  );
}
