import React, { useState, useEffect } from "react";
import Pagination from "../../../components/pagination/Pagination";
import ItemJob from "../../../components/itemJob/ItemJob";
import { makeRequest } from "../../../axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import NotFoundData from "../../../components/notFoundData/NotFoundData";

import "./jobsSave.scss";

import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../../../context/authContext";

export default function JobsSave() {
  const [jobs, setJobs] = useState();
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);
  const limit = 4;
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const getJobs = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get(`/save?idUser=${id}&limit=${limit}&page=${paginate}`);
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
    // window.scroll(0, 0);
  }, [paginate]);

  useEffect(() => {
    if (parseInt(currentUser?.id) !== parseInt(id)) return navigate("/dang-nhap/nguoi-dung");
  }, []);

  return (
    <div className="jobsSave">
      <div className="jobsSave__list row">
        {loading ? (
          <Loader />
        ) : jobs?.length > 0 ? (
          jobs?.map((job, i) => <ItemJob key={i} job={job} className={"col pc-6 m-12 t-12"} />)
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
  );
}
