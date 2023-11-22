import React, { useEffect, useRef, useState } from "react";
import "./candidate.scss";
import TableCandidate from "../../components/tableCandidate/TableCandidate";
import Pagination from "../../components/pagination/Pagination";
import { makeRequest } from "../../axios";
import { useAuth } from "../../context/authContext";
import NotFoundData from "../../components/notFoundData/NotFoundData";
import { useNavigate } from "react-router-dom";

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
  const [data, setData] = useState();
  const [jobs, seJobs] = useState();
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const limit = 10;
  const [optionActive, setOptionActive] = useState();
  const [sortActive, setSortActive] = useState(sort[0]);
  const [keyword, setKeyword] = useState();
  const [search, setSearch] = useState();
  const { currentCompany } = useAuth();
  const navigate = useNavigate()

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
    try {
      let url = "/apply/userApply?";

      if (sortActive) {
        url += `sort=${sortActive.label}`;
      }

      if (optionActive) {
        url += `&idJob=${optionActive}`;
      }

      if (search) {
        url += `&search=${search}`;
      }

      const res = await makeRequest.get(
        `${url}&limit=${limit}&page=${paginate}`
      );

      setData(res.data.data);
      console.log(data);
      setTotalPage(res.data?.pagination.totalPage || 0);
    } catch (error) {}
  };

  useEffect(() => {
    getApply();
  }, [paginate, optionActive, sortActive, search]);

  useEffect(() => {
    setPaginate(1);
  }, [optionActive]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        setSearch(keyword);
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword]);

  const handleSelectSort = (item) => {
    setOpenSort(false);
    setSortActive(item);
  };

  useEffect(() => {
      if(!currentCompany) navigate('/nha-tuyen-dung/dang-nhap')
  }, [])

  return (
    <div className="candidate">
      <div className="container">
        <div className="candidate__wrapper">
          <h2 className="candidate__wrapper__header">Đơn xin việc đã nhận</h2>
          <div className="candidate__wrapper__body">
            <div className="candidate__wrapper__body__control">
              <div className="candidate__wrapper__body__control__left">
                <div className="candidate__wrapper__body__control__left__search">
                  <i class="fa-solid fa-magnifying-glass icon-glass"></i>
                  <input
                    type="text"
                    placeholder="Nhập tên ứng viên..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  {keyword && (
                    <button
                      className="button-clear"
                      onClick={() => setKeyword("")}
                    >
                      <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="candidate__wrapper__body__control__right">
                <div className="candidate__wrapper__body__control__right__select">
                  <SelectJob
                    search={true}
                    title={"Công việc"}
                    option={jobs}
                    optionActive={optionActive}
                    setOptionActive={setOptionActive}
                  />
                </div>
                <div className="candidate__wrapper__body__control__right__select">
                  <div className="button-sort">
                    <div
                      className="toogle"
                      onClick={() => setOpenSort(!openSort)}
                    >
                      <span>{sortActive && sortActive?.name}</span>
                      <i class="fa-solid fa-bars-staggered"></i>
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
              {data?.length === 0 ? (
                <NotFoundData />
              ) : (
                <TableCandidate data={data} limit={10} paginate={paginate} />
              )}
            </div>
            <div className="candidate__wrapper__body__pgn">
              <div className="candidate__wrapper__body__pgn__left">
                <span>
                  {totalPage !== 0 &&
                    `Trang ${String(paginate).padStart(2, "0")} trên ${String(
                      totalPage
                    ).padStart(2, "0")}`}
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

function SelectJob({ title, icon, option, optionActive, setOptionActive }) {
  const [open, setOpen] = useState(false);
  const selectJobRef = useRef();

  const handleClickOption = (item) => {
    setOptionActive(item);
    setOpen(false);
    console.log(optionActive);
  };

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!selectJobRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  return (
    <div className="selectJob" ref={selectJobRef}>
      <div
        className={`selectJob__toggle ${
          optionActive !== undefined ? "active" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <div className="selectJob__toggle__title">
          {icon && icon}
          <span className="text">
            {optionActive
              ? option?.map((option) => {
                  if (option.id === optionActive) return option.name;
                })
              : "Tất cả"}
          </span>
        </div>
        <i
          className={`fa-solid fa-angle-down icon-down ${open ? "open" : ""}`}
        ></i>
      </div>
      {open && (
        <div className="selectJob__menu">
          <div className="selectJob__menu__list">
            <div
              className={`selectJob__menu__list__item ${
                optionActive === undefined ? "active" : ""
              }`}
              onClick={() => handleClickOption()}
            >
              <span>Tất cả</span>
            </div>
            {option?.map((option, i) => (
              <div
                key={i}
                className={`selectJob__menu__list__item ${
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
