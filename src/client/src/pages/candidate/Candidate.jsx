import React, { useEffect, useRef, useState } from "react";
import "./candidate.scss";

import TableCandidate from "../../components/tableCandidate/TableCandidate";
import Pagination from "../../components/pagination/Pagination";
import NotFoundData from "../../components/notFoundData/NotFoundData";
import Loader from "../../components/loader/Loader.jsx";


import { useAuth } from "../../context/authContext";
import { statusCompany } from "../../config/data.js";
import { apiCv,makeRequest } from "../../axios.js";

import { toast } from "sonner";
import queryString from "query-string";
import { saveAs } from "file-saver";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";


const sort = [
  {
    name: "Mới nhất",
    label: "Mới nhất",
    label: "new",
  },
  {
    name: "Cũ nhất",
    label: "Cũ nhất",
    label: "old",
  },
];

export default function Candidate() {
  const [openSort, setOpenSort] = useState(false);
  const [sortActive, setSortActive] = useState(sort[0]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [jobs, seJobs] = useState();
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const limit = 10;
  const [optionActive, setOptionActive] = useState();
  const [optionStatusActive, setOptionStatusActive] = useState();
  const [keyword, setKeyword] = useState();
  const [search, setSearch] = useState();
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
    const params = queryString.parse(location.search);
    setLoading(true);
    try {
      let url = "/apply/userApply?";

      if (params?.sort) {
        url += `sort=${params?.sort}`;
      }

      if (params?.idJob) {
        url += `&idJob=${params?.idJob}`;
      }

      if (params?.status) {
        url += `&status=${params?.status}`;
      }

      if (params?.search) {
        url += `&search=${params?.search}`;
      }

      const res = await makeRequest.get(`${url}&limit=${limit}&page=${paginate}`);
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
    window.scroll(0, 0);
  }, [paginate, location]);

  useEffect(() => {
    setPaginate(1);
  }, [optionActive]);

  useEffect(() => {
    let params = ``;

    if (sortActive !== undefined) {
      params += `&sort=${sortActive.label}`;
    }

    if (optionActive !== undefined) {
      params += `&idJob=${optionActive}`;
    }

    if (optionStatusActive !== undefined) {
      params += `&status=${optionStatusActive}`;
    }

    if (search?.length > 0) {
      params += `&search=${search}`;
    }

    navigate(`?${params}`);
  }, [optionActive, optionStatusActive, search, sortActive]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        setSearch(keyword?.trim());
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword]);

  const mutationHidden = useMutation(
    () => {
      let url = "/apply/hidden?";

      if (listCheck) {
        listCheck?.map((item) => {
          url += `&id[]=${item.id}`;
        });
      }

      return makeRequest.put(url);
    },
    {
      onSuccess: () => {
        toast.success("Ẩn ứng viên thành công.");
        queryClient.invalidateQueries(["apply"]);
      },
    }
  );

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

  const handleClickHidden = () => {
    mutationHidden.mutate();
    setListCheck([]);
  };

  const handleSelectSort = (item) => {
    setOpenSort(false);
    setSortActive(item);
  };

  const handleDownload = () => {
    // Lặp qua mảng listEmail và tải xuống từng CV
    listCheck.forEach((item) => {
      item.cv !== null && saveAs(apiCv + item.cv, item.cv);
    });
  };

  useEffect(() => {
    if (!currentCompany) navigate("/dang-nhap/nha-tuyen-dung");
  }, []);

  return (
    <div className="candidate">
      <div className="container">
        <div className="candidate__wrapper">
          <div className="candidate__wrapper__header">
            <Link to={`/nha-tuyen-dung/${currentCompany?.id}`}>
              <button className="btn-cancel">
                <i className="fa-solid fa-angle-left"></i>
                <span>Quay lại</span>
              </button>
            </Link>
            <h2>Đơn xin việc đã nhận</h2>
            <Link to={"/nha-tuyen-dung/ung-vien-an"}>
              <button className="btn-hidden">
                <i className="fa-regular fa-eye"></i>
                <span>Ẩn</span>
              </button>
            </Link>
          </div>
          <div className="candidate__wrapper__body">
            <div className="candidate__wrapper__body__control">
              <div className="candidate__wrapper__body__control__left">
                <div className="candidate__wrapper__body__control__left__search">
                  <div className="candidate__wrapper__body__control__left__search__input">
                    <button className="button-submit" onClick={() => setSearch(keyword)}>
                      <i className="fa-solid fa-magnifying-glass icon-glass"></i>
                    </button>
                    <input
                      type="text"
                      placeholder="Tìm kiếm ứng viên..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    {keyword && (
                      <button className="button-clear" onClick={() => setKeyword("")}>
                        <i className="fa-solid fa-circle-xmark"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="candidate__wrapper__body__control__right">
                <div className="candidate__wrapper__body__control__right__select">
                  <SelectCandidate
                    title={"Công việc"}
                    option={jobs}
                    optionActive={optionActive}
                    setOptionActive={setOptionActive}
                  />
                </div>
                <div className="candidate__wrapper__body__control__right__select">
                  <SelectCandidate
                    title={"Trạng thái"}
                    option={statusCompany}
                    optionActive={optionStatusActive}
                    setOptionActive={setOptionStatusActive}
                  />
                </div>
                <div className="candidate__wrapper__body__control__right__select">
                  <div className="button-sort">
                    <div className="toogle" onClick={() => setOpenSort(!openSort)}>
                      <span>{sortActive && sortActive?.name}</span>
                      <i className="fa-solid fa-bars-staggered"></i>
                    </div>
                    {openSort && (
                      <div className="list">
                        {sort.map((item) => (
                          <span
                            className={`list__item ${
                              sortActive?.name === item?.name ? "active" : ""
                            }`}
                            onClick={() => handleSelectSort(item)}
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="candidate__wrapper__body__list">
              {loading ? (
                <Loader />
              ) : data?.length === 0 ? (
                <NotFoundData />
              ) : (
                <>
                  <div className="candidate__wrapper__body__list__control">
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
                          <i className="fa-regular fa-eye-slash"></i>
                          <span>Ẩn</span>
                        </button>
                        <a href={`mailto:${listCheck.map((item) => item.email).join(",")}`}>
                          <button className="button__send">
                            <i className="fa-regular fa-paper-plane"></i>
                            <span>Gửi mail</span>
                          </button>
                        </a>
                        <button className="button__down" onClick={handleDownload}>
                          <i class="fa-regular fa-circle-down"></i>
                          <span>Tải CV</span>
                        </button>
                      </>
                    )}
                  </div>
                  <TableCandidate data={data} listCheck={listCheck} setListCheck={setListCheck} />
                </>
              )}
            </div>

            <div className="candidate__wrapper__body__pgn">
              <div className="candidate__wrapper__body__pgn__left">
                <span>
                  {totalPage !== 0 &&
                    `Trang ${String(paginate).padStart(2, "0")} trên ${String(totalPage).padStart(
                      2,
                      "0"
                    )}`}
                </span>
              </div>
              <div className="candidate__wrapper__body__pgn__right">
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

function SelectCandidate({ title, icon, option, optionActive, setOptionActive }) {
  const [open, setOpen] = useState(false);
  const selectCadidateRef = useRef();

  const handleClickOption = (item) => {
    setOptionActive(item);
    setOpen(false);
  };

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!selectCadidateRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  return (
    <div className="selectCadidate" ref={selectCadidateRef}>
      <label htmlFor="" className="selectCadidate__header">
        {title}
      </label>
      <div
        className={`selectCadidate__toggle ${optionActive !== undefined ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className="selectCadidate__toggle__title">
          {icon && icon}
          <span className="text">
            {optionActive
              ? option?.map((option) => {
                  if (option.id === optionActive) return option.name;
                })
              : "Tất cả"}
          </span>
        </div>
        <i className={`fa-solid fa-angle-down icon-down ${open ? "open" : ""}`}></i>
      </div>
      {open && (
        <div className="selectCadidate__menu">
          <div className="selectCadidate__menu__list">
            <div
              className={`selectCadidate__menu__list__item ${
                optionActive === undefined ? "active" : ""
              }`}
              onClick={() => handleClickOption()}
            >
              <span>Tất cả</span>
            </div>
            {option?.map((option, i) => (
              <div
                key={i}
                className={`selectCadidate__menu__list__item ${
                  optionActive === option?.id ? "active" : ""
                }`}
                onClick={() => handleClickOption(option?.id)}
              >
                <span>{option?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
