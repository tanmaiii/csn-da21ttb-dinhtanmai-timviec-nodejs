import React, { useEffect, useState } from "react";
import "./jobsCompany.scss";
import ItemJob from "../../../components/itemJob/ItemJob";
import Pagination from "../../../components/pagination/Pagination";
import { useParams } from "react-router-dom";
import { makeRequest, apiImage } from "../../../axios";
import { useQuery } from "react-query";
import NotFoundData from "../../../components/notFoundData/NotFoundData";
import Loader from "../../../components/loader/Loader";
import { toast } from "sonner";
import { useAuth } from "../../../context/authContext";

export default function JobsCompany() {
  const { id } = useParams();
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const limit = 4;
  const { currentCompany } = useAuth();

  const getJob = async () => {
    try {
      const res = await makeRequest.get(`/job/company/${id}?page=${paginate}&limit=${limit}`);
      setTotalPage(res?.data?.pagination?.totalPage);
      return res?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: jobs,
    isError,
    isLoading,
  } = useQuery(["job", paginate], () => {
    return getJob();
  });

  // useEffect(() => {
  //   window.scroll(0, 0);
  // }, []);

  return (
    <div id="jobs" className="jobsCompany">
      <div className="jobsCompany__wrapper">
        <div className="jobsCompany__wrapper__header">
          <h4>Tuyển dụng</h4>
        </div>
        <div className="jobsCompany__wrapper__list row">
          {isLoading ? (
            <Loader />
          ) : jobs?.length > 0 ? (
            jobs?.map((job, i) => <ItemJob key={i} job={job} className={"col pc-6 t-12 m-12"} />)
          ) : (
            <NotFoundData />
          )}
        </div>
        <Pagination
          totalPage={totalPage}
          limit={limit}
          paginate={paginate}
          setPaginate={setPaginate}
        />
      </div>
    </div>
  );
}
