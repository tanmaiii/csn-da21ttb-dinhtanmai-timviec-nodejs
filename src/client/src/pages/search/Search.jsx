import React, { useEffect, useRef } from "react";
import "./search.scss";
import DropdownItem from "../../components/dropdownItem/DropdownItem";
import ItemJob from "../../components/itemJob/ItemJob";
import Pagination from "../../components/pagination/Pagination";
import NotFoundData from "../../components/notFoundData/NotFoundData";
import Loader from "../../components/loader/Loader";
import { useState } from "react";
import { makeRequest } from "../../axios";
import img from "../../assets/images/bannerSearch.jpg";

import { typeWorks } from "../../config/data";
import { useNavigate, useParams } from "react-router-dom";

const sort = [
  {
    id: 1,
    displayName: "Mới nhất",
    value: "new",
  },
  {
    id: 2,
    displayName: "Lương cao đến thấp",
    value: "maxToMin",
  },
  {
    id: 3,
    displayName: "Lương thấp đến cao",
    value: "minToMax",
  },
];

export default function Search() {
  const [openSort, setOpenSort] = useState(false);
  const [sortActive, setSortActive] = useState(sort[0]);
  const [jobs, setJobs] = useState();
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [totalJobs, setTotalJobs] = useState(0);
  const [idJobActive, setIdJobActive] = useState();
  const limit = 6;
  const { keyword } = useParams();

  const [optionActiveProvince, setOptionActiveProvince] = useState([]);
  const [optionActiveField, setOptionActiveField] = useState([]);
  const [optionActiveTypeWork, setOptionActiveTypeWork] = useState([]);

  const handleSelectSort = (item) => {
    setOpenSort(false);
    setSortActive(item);
  };

  const getJob = async () => {
    setLoading(true);
    try {
      let url = `/job?page=${paginate}&limit=${limit}`;

      if (sortActive) {
        url += `&sort=${sortActive?.value}`;
      }

      if (keyword !== undefined) {
        url += `&search=${keyword}`;
      }

      if (optionActiveProvince) {
        optionActiveProvince?.map((province) => {
          url += `&province[]=${province}`;
        });
      }

      if (optionActiveField) {
        optionActiveField?.map((province) => {
          url += `&field[]=${province}`;
        });
      }

      if (optionActiveTypeWork) {
        optionActiveTypeWork?.map((typeWork) => {
          url += `&typeWork[]=${typeWork}`;
        });
      }

      const res = await makeRequest.get(url);
      console.log(res);
      setJobs(res.data.data || []);
      setTotalPage(res.data?.pagination.totalPage || 0);
      setTotalJobs(res.data?.pagination.total || 0);
      setIdJobActive(res.data.data[0]?.id);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getJob();
  }, [
    paginate,
    sortActive,
    optionActiveProvince,
    optionActiveField,
    optionActiveTypeWork,
    keyword,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="search">
        <div className="search__wrapper">
          <div className="container">
            <BannerSearch
              optionActiveProvince={optionActiveProvince}
              setOptionActiveProvince={setOptionActiveProvince}
              optionActiveField={optionActiveField}
              setOptionActiveField={setOptionActiveField}
              optionActiveTypeWork={optionActiveTypeWork}
              setOptionActiveTypeWork={setOptionActiveTypeWork}
            />
            {jobs?.length === 0 && <NotFoundData />}
            <div className="search__list">
              <div className="search__list__header">
                <h4>{totalJobs && totalJobs} việc làm {keyword && keyword}</h4>
                <div className="search__list__header__sort">
                  <span>Sắp xếp :</span>
                  <div className="dropdown">
                    <div
                      className="header"
                      onClick={() => setOpenSort(!openSort)}
                    >
                      <span>{sortActive && sortActive?.displayName}</span>
                      <i class="fa-solid fa-angle-down"></i>
                    </div>
                    {openSort && (
                      <div className="list">
                        {sort.map((item) => (
                          <span
                            className={`list__item ${
                              sortActive?.displayName === item?.displayName
                                ? "active"
                                : ""
                            }`}
                            onClick={() => handleSelectSort(item)}
                          >
                            {item.displayName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="search__list__body">
                <div className="search__list__body__side row">
                  {loading ? (
                    <Loader />
                  ) : (
                    jobs?.map((job, i) => (
                      <ItemJob
                        onClick={() => setIdJobActive(job?.id)}
                        key={i}
                        job={job}
                        className={`col pc-4 t-6 m-12 ${
                          idJobActive === job.id && "active"
                        }`}
                      />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BannerSearch({
  optionActiveProvince,
  setOptionActiveProvince,
  optionActiveField,
  setOptionActiveField,
  optionActiveTypeWork,
  setOptionActiveTypeWork,
}) {
  const [province, setProvince] = useState();
  const [field, setField] = useState();

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const res = await makeRequest.get("provinces/");
        setProvince(res.data);
      } catch (error) {}
    };
    getProvinces();
  }, []);

  useEffect(() => {
    const getField = async () => {
      try {
        const res = await makeRequest.get("fields/");
        setField(res.data);
      } catch (error) {}
    };
    getField();
  }, []);

  return (
    <div className="search__banner">
      <div
        className="search__banner__wrapper"
        style={{ backgroundImage: `url(${img})` }}
      >
        <InputSearch />
        <div className="search__banner__wrapper__filter">
          <DropdownItem
            icon={<i className="fa-solid fa-location-dot"></i>}
            title={"Tỉnh thành"}
            option={province}
            optionActive={optionActiveProvince}
            setOptionActive={setOptionActiveProvince}
            search={true}
          />
          <DropdownItem
            icon={<i className="fa-solid fa-rectangle-list"></i>}
            title={"Ngành nghề"}
            option={field}
            optionActive={optionActiveField}
            setOptionActive={setOptionActiveField}
            search={true}
          />
          <DropdownItem
            icon={<i className="fa-solid fa-location-dot"></i>}
            title={"Vị trí"}
            option={typeWorks}
            optionActive={optionActiveTypeWork}
            setOptionActive={setOptionActiveTypeWork}
          />
        </div>
      </div>
    </div>
  );
}

function InputSearch() {
  const [keyword, setKeyWord] = useState();
  const [searchHistory, setSearchHistory] = useState([]);
  const [openHistory, setOpenHistory] = useState(false);
  const inputRef = useRef();
  const inputSearchRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword]);

  const goToSearch = () => {
    setOpenHistory(false);
    if (keyword?.trim().length > 0) {
      navigate(`/tim-kiem/${keyword.trim()}`);
      handleSaveHistory(keyword.trim());
    } else {
      navigate(`/tim-kiem`);
    }
  };

  const handleSaveHistory = (item) => {
    item = item.trim();
    if (!searchHistory?.includes(item)) {
      const updateHistory = [item, ...searchHistory.slice(0, 4)];
      setSearchHistory(updateHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updateHistory));
    }
  };

  const handleSubmitHistory = (item) => {
    setKeyWord(item);
    navigate(`/tim-kiem/${item}`);
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    let handleMousedown = (e) => {
      if (!inputSearchRef.current.contains(e.target)) {
        setOpenHistory(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => {
      document.removeEventListener("mousedown", handleMousedown);
    };
  });

  useEffect(() => {
    if (inputRef) {
      inputRef.current.addEventListener("focus", () => {
        setOpenHistory(true);
      });
    }
  }, []);

  return (
    <div className="inputSearch" ref={inputSearchRef}>
      <div className="inputSearch__input">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Tên công ty, công việc..."
          onChange={(e) => setKeyWord(e.target.value)}
          value={keyword}
          ref={inputRef}
        />
        <button
          className={`inputSearch__input__btn-search`}
          onClick={() => goToSearch()}
        >
          <span>Tìm kiếm</span>
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {searchHistory && (
        <div className={`inputSearch__history  ${openHistory ? "active" : ""}`}>
          <ul>
            {searchHistory?.map((item, i) => (
              <li onClick={() => handleSubmitHistory(item)}>
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}