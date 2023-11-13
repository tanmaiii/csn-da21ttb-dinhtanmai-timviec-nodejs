import React, { useState, useEffect } from "react";
import Pagination from "../../../components/pagination/Pagination";
import ItemJob from "../../../components/itemJob/ItemJob";
import { makeRequest } from "../../../axios";
import { useParams } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import "./jobsSave.scss";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

export default function JobsSave() {
  const [jobs, setJobs] = useState();
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);
  const limit = 4;
  const { id } = useParams();

  const getJobs = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get(
        `/save?idUser=${id}&limit=${limit}&page=${paginate}`
      );
      console.log(res);
      setJobs(res.data.data);
      setTotalPage(res.data.pagination.totalPage);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  const { isLoading, data } = useQuery(["save"], () => {
    return getJobs();
  });

  useEffect(() => {
    getJobs();
    window.scroll(0, 0);
  }, [paginate]);

  return (
    <div className="jobsSave">
      <div className="jobsSave__list row">
        {loading ? (
          <Loader />
        ) : (
          jobs?.map((job, i) => (
            <ItemJob key={i} job={job} className={"col pc-6 m-12 t-12"} />
          ))
        )}
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
