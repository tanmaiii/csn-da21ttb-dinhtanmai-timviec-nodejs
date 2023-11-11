import React, { useEffect, useState } from "react";
import Pagination from "../../../components/pagination/Pagination";
import ItemCompany from "../../../components/itemCompany/ItemCompany";
import { makeRequest } from "../../../axios";
import { useParams } from "react-router-dom";
import './companiesSave.scss'

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
  const {id} = useParams()

  const getCompanies = async () => {
    try {
      const res = await makeRequest.get(`/follow/company/${id}?page=${paginate}&limit=${limit}`);
      console.log(res);
      setCompanies(res.data.data);
      setTotalPage(res.data.pagination.totalPage);
    } catch (error) {}
  };

  const { isLoading: loadingFollow, data: dataFollow } = useQuery(
    ["follower", id],
    () => {
      return getCompanies();
    }
  );

  useEffect(() => {
    getCompanies();
  }, [paginate]);

  return (
    <div className="companiesSave">
      <div className="companiesSave__wrapper row">
        {companies?.map((company, i) => (
          <ItemCompany key={i} company={company}  className={"col pc-4 t-6 m-12"}/>
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
