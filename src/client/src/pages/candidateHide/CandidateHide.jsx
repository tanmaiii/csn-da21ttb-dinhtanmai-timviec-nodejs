import React, { useEffect, useRef, useState } from "react";
import "./candidateHide.scss";

import TableCandidate from "../../components/tableCandidate/TableCandidate.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import NotFoundData from "../../components/notFoundData/NotFoundData.jsx";
import Loader from "../../components/loader/Loader.jsx";

import { makeRequest } from "../../axios.js";
import { useAuth } from "../../context/authContext.js";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function CandidateHide() {
  const [data, setData] = useState();
  const [jobs, seJobs] = useState();
  const [paginate, setPaginate] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(10);
  const limit = 10;
  const { currentCompany } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [listCheck, setListCheck] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const getJob = async () => {
      try {
        const res = await makeRequest.get("job/name/" + currentCompany?.id);
        seJobs(res.data);
      } catch (error) {}
    };
    getJob();
  }, []);

  const getApply = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get(`/apply/userHideApply?&limit=${limit}&page=${paginate}`);
      setLoading(false);
      setData(res.data.data || []);
      setTotalPage(res.data?.pagination.totalPage || 0);
    } catch (error) {}
    setLoading(false);
  };

  const { isLoading, error } = useQuery(["apply"], () => {
    return getApply();
  });

  useEffect(() => {
    getApply();
  }, [paginate, location]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const mutationHidden = useMutation(
    () => {
      let url = "/apply/unHidden?";

      if (listCheck) {
        listCheck?.map((item) => {
          url += `&id[]=${item.id}`;
        });
      }

      return makeRequest.put(url);
    },
    {
      onSuccess: () => {
        toast.success("Bỏ ẩn ứng viên thành công.");
        queryClient.invalidateQueries(["apply"]);
      },
    }
  );

  const handleClickHidden = () => {
    mutationHidden.mutate();
    setListCheck([]);
  };

  const handleCheckAll = () => {
    if (listCheck?.length === data?.length) {
      setListCheck([]);
    } else {
      setListCheck([]);
      data.map((item) => {
        setListCheck((current) => [
          ...current,
          {
            id: item.id,
            email: item.email,
            cv: item.cv,
          },
        ]);
      });
    }
  };

  useEffect(() => {
    if (!currentCompany) navigate("/dang-nhap/nha-tuyen-dung");
  }, []);

  return (
    <div className="candidateHide">
      <div className="container">
        <div className="candidateHide__wrapper">
          <div className="candidateHide__wrapper__header">
            <Link to={"/nha-tuyen-dung/ung-vien"}>
              <button className="btn-cancel">
                <i className="fa-solid fa-angle-left"></i>
                <span>Quay lại</span>
              </button>
            </Link>
            <h2>Danh sách ứng viên đã ẩn</h2>
          </div>
          <div className="candidateHide__wrapper__body">
            <div className="candidateHide__wrapper__body__list">
              {loading ? (
                <Loader />
              ) : data?.length === 0 ? (
                <NotFoundData />
              ) : (
                <div>
                  <div className="candidateHide__wrapper__body__list__control">
                    <button className="button__checkAll">
                      <label htmlFor="input_checkAll">
                        <input
                          onChange={handleCheckAll}
                          type="checkbox"
                          name=""
                          id="input_checkAll"
                          checked={listCheck?.length === data?.length}
                        />
                        <span>Chọn tất cả</span>
                      </label>
                    </button>
                    {listCheck?.length > 0 && (
                      <>
                        <button className="button__delete" onClick={handleClickHidden}>
                          <i className="fa-regular fa-eye"></i>
                          <span>Bỏ ẩn</span>
                        </button>
                        <a href={`mailto:${listCheck.map((item) => item.email).join(",")}`}>
                          <button className="button__send">
                            <i className="fa-regular fa-paper-plane"></i>
                            <span>Gửi mail</span>
                          </button>
                        </a>
                      </>
                    )}
                  </div>
                  <TableCandidate
                    data={data}
                    setListCheck={setListCheck}
                    listCheck={listCheck}
                    handleClickHidden={handleClickHidden}
                  />
                </div>
              )}
            </div>
            <div className="candidateHide__wrapper__body__pgn">
              <div className="candidateHide__wrapper__body__pgn__left">
                <span>
                  {totalPage !== 0 &&
                    `Trang ${String(paginate).padStart(2, "0")} trên ${String(totalPage).padStart(
                      2,
                      "0"
                    )}`}
                </span>
              </div>
              <div className="candidateHide__wrapper__body__pgn__right">
                <Pagination
                  totalPage={totalPage}
                  limit={limit}
                  paginate={paginate}
                  setPaginate={setPaginate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
