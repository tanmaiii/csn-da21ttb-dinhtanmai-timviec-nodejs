import React, { useEffect, useState } from "react";
import Pagination from "../../../components/pagination/Pagination";
import ItemCompany from "../../../components/itemCompany/ItemCompany";
import { makeRequest } from "../../../axios";
import { useParams } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import "./companiesSave.scss";
import NotFoundData from "../../../components/notFoundData/NotFoundData";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

export default function CompaniesSave() {
  const [companies, setCompanies] = useState();
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);
  const limit = 6;
  const { id } = useParams();

  const getCompanies = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get(
        `/follow/company/${id}?page=${paginate}&limit=${limit}`
      );
      setCompanies(res.data.data);
      setTotalPage(res.data.pagination.totalPage);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  const { isLoading: loadingFollow, data: dataFollow } = useQuery(
    ["follower"],
    () => {
      return getCompanies();
    }
  );

  useEffect(() => {
    getCompanies();
   // window.scroll(0, 0);
  }, [paginate]);

  return (
    <div className="companiesSave">
      <div className="companiesSave__wrapper row">
        {loading ? (
          <Loader />
        ) : companies?.length > 0 ? (
          companies?.map((company, i) => (
            <ItemCompany
              key={i}
              company={company}
              className={"col pc-4 t-6 m-12"}
            />
          ))
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
