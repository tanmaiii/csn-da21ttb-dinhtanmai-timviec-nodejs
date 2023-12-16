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
import queryString from "query-string";
import { useQuery } from "react-query";

import { typeWorks, experienceJob, educationJob } from "../../config/data";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
  const location = useLocation();

  const handleSelectSort = (item) => {
    setOpenSort(false);
    setSortActive(item);
  };

  const getJob = async () => {
    const params = queryString.parse(location.search, {
      arrayFormat: "bracket-separator",
      arrayFormatSeparator: "|",
    });

    setLoading(true);
    try {
      let url = `/job?page=${paginate}&limit=${limit}`;

      if (sortActive) {
        url += `&sort=${sortActive?.value}`;
      }

      if (keyword !== undefined) {
        url += `&search=${keyword}`;
      }

      if (params?.province) {
        params?.province?.map((province) => {
          url += `&province[]=${province}`;
        });
      }

      if (params?.field) {
        params?.field?.map((province) => {
          url += `&field[]=${province}`;
        });
      }

      if (params?.typeWork) {
        params?.typeWork?.map((typeWork) => {
          url += `&typeWork[]=${typeWork}`;
        });
      }

      if (params?.exp) {
        params?.exp?.map((exp) => {
          url += `&exp[]=${exp}`;
        });
      }

      if (params?.edu) {
        params?.edu?.map((edu) => {
          url += `&edu[]=${edu}`;
        });
      }

      if (params?.salary) {
        url += `&salary[]=${params?.salary[0]}&salary[]=${params?.salary[1]}`;
      }

      const res = await makeRequest.get(url);
      setJobs(res.data.data || []);
      setTotalPage(res.data?.pagination.totalPage || 0);
      setTotalJobs(res.data?.pagination.total || 0);
      setIdJobActive(res.data.data[0]?.id);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  const {} = useQuery(["job", paginate, sortActive, location, keyword], () => {
    return getJob();
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="search">
        <div className="search__wrapper">
          <div className="container">
            <BannerSearch />
            {jobs?.length === 0 ? (
              <NotFoundData />
            ) : (
              <div className="search__list">
                <div className="search__list__header">
                  <h4>
                    {totalJobs && totalJobs} việc làm {keyword && keyword}
                  </h4>
                  <div className="search__list__header__sort">
                    <span>Sắp xếp :</span>
                    <div className="dropdown">
                      <div className="header" onClick={() => setOpenSort(!openSort)}>
                        <span>{sortActive && sortActive?.displayName}</span>
                        <i className="fa-solid fa-angle-down"></i>
                      </div>
                      {openSort && (
                        <div className="list">
                          {sort.map((item) => (
                            <span
                              className={`list__item ${
                                sortActive?.displayName === item?.displayName ? "active" : ""
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
                          className={`col pc-4 t-6 m-12 ${idJobActive === job.id && "active"}`}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function BannerSearch() {
  const [province, setProvince] = useState();
  const [field, setField] = useState();
  const [qtyFilter, setQtyFilter] = useState(0);
  const [btnDelete, setBtnDelete] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const params = queryString.parse(location.search, {
    arrayFormat: "bracket-separator",
    arrayFormatSeparator: "|",
  });

  const [optionActiveProvince, setOptionActiveProvince] = useState(params?.province || []);
  const [optionActiveField, setOptionActiveField] = useState(params?.field || []);
  const [optionActiveTypeWork, setOptionActiveTypeWork] = useState(params?.typeWork || []);
  const [optionActiveExperience, setOptionActiveExperience] = useState(params?.exp || []);
  const [optionActiveEducation, setOptionActiveEducation] = useState(params?.edu || []);
  const [salaryFilter, setSalaryFilter] = useState(params?.salary || []);

  useEffect(() => {
    let params = "";
    if (optionActiveProvince.length > 0) {
      const filter = optionActiveProvince.join("|");
      params += `&province[]=${filter}`;
    }
    if (optionActiveTypeWork.length > 0) {
      const filter = optionActiveTypeWork.join("|");
      params += `&typeWork[]=${filter}`;
    }
    if (optionActiveField.length > 0) {
      const filter = optionActiveField.join("|");
      params += `&field[]=${filter}`;
    }
    if (optionActiveExperience.length > 0) {
      const filter = optionActiveExperience.join("|");
      params += `&exp[]=${filter}`;
    }
    if (optionActiveEducation.length > 0) {
      const filter = optionActiveEducation.join("|");
      params += `&edu[]=${filter}`;
    }
    if (salaryFilter.length > 0) {
      const filter = salaryFilter.join("|");
      params += `&salary[]=${filter}`;
    }

    navigate(`?${params}`);
  }, [
    optionActiveProvince,
    optionActiveField,
    optionActiveTypeWork,
    optionActiveExperience,
    optionActiveEducation,
    salaryFilter,
  ]);

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

  const handleDeleteFilter = () => {
    setOptionActiveProvince([]);
    setOptionActiveField([]);
    setOptionActiveTypeWork([]);
    setOptionActiveExperience([]);
    setOptionActiveEducation([]);
    setSalaryFilter([]);
    location.search = null;
  };

  useEffect(() => {
    setQtyFilter(
      optionActiveProvince.length +
        optionActiveField.length +
        optionActiveTypeWork.length +
        optionActiveExperience.length +
        optionActiveEducation.length +
        salaryFilter.length
    );

    if (
      optionActiveProvince.length > 0 ||
      optionActiveField.length > 0 ||
      optionActiveTypeWork.length > 0 ||
      optionActiveExperience.length > 0 ||
      optionActiveEducation.length > 0 ||
      salaryFilter.length > 0
    ) {
      setBtnDelete(true);
    } else {
      setBtnDelete(false);
    }
  }, [
    optionActiveProvince,
    optionActiveField,
    optionActiveTypeWork,
    optionActiveExperience,
    optionActiveEducation,
    salaryFilter,
  ]);

  return (
    <div className="search__banner">
      <div className="search__banner__wrapper" style={{ backgroundImage: `url(${img})` }}>
        <InputSearch />
        <div className="search__banner__wrapper__filter">
          <button className="button-filter" onClick={() => setOpenFilter(!openFilter)}>
            <i className="fa-solid fa-filter"></i>
          </button>
          <div className={`search__banner__wrapper__filter__list ${openFilter && "open"}`}>
            <DropdownItem
              name={"province"}
              icon={<i className="fa-solid fa-location-dot"></i>}
              title={"Tỉnh thành"}
              option={province}
              optionActive={optionActiveProvince}
              setOptionActive={setOptionActiveProvince}
              search={true}
            />
            <DropdownItem
              name={"field"}
              icon={<i className="fa-solid fa-briefcase"></i>}
              title={"Ngành nghề"}
              option={field}
              optionActive={optionActiveField}
              setOptionActive={setOptionActiveField}
              search={true}
            />
            <DropdownItem
              icon={<i className="fa-solid fa-dollar-sign"></i>}
              title={"Mức lương"}
              salary={true}
              salaryFilter={salaryFilter}
              setSalaryFilter={setSalaryFilter}
            />
            <DropdownItem
              icon={<i className="fa-solid fa-chart-gantt"></i>}
              title={"Loại công việc"}
              option={typeWorks}
              optionActive={optionActiveTypeWork}
              setOptionActive={setOptionActiveTypeWork}
            />
            <DropdownItem
              icon={<i className="fa-solid fa-business-time"></i>}
              title={"Kinh nghiệm"}
              option={experienceJob}
              optionActive={optionActiveExperience}
              setOptionActive={setOptionActiveExperience}
            />
            <DropdownItem
              icon={<i className="fa-solid fa-graduation-cap"></i>}
              title={"Học vấn"}
              option={educationJob}
              optionActive={optionActiveEducation}
              setOptionActive={setOptionActiveEducation}
            />
            {btnDelete && (
              <button className="button-delete-filter" onClick={() => handleDeleteFilter()}>
                <i className="fa-regular fa-trash-can"></i>
                <span>Xóa lọc ({qtyFilter})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputSearch() {
  const [keyword, setKeyWord] = useState(useParams().keyword || undefined);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage?.getItem("searchHistory" || null))
  );
  const [openHistory, setOpenHistory] = useState(false);
  const inputRef = useRef();
  const inputSearchRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

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
      navigate(`/tim-kiem/${keyword.trim()}${location.search}`);
      handleSaveHistory(keyword.trim());
    } else {
      navigate(`/tim-kiem${location.search}`);
    }
  };

  const handleSaveHistory = (item) => {
    if (!searchHistory?.includes(item)) {
      const updateHistory = [item.trim(), ...searchHistory];
      setSearchHistory(updateHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updateHistory));
    }
  };

  const handleSubmitHistory = (item) => {
    setKeyWord(item);
    setOpenHistory(false);
    navigate(`/tim-kiem/${item}`);
  };

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
        <i className="fa-solid fa-magnifying-glass"></i>
        <div className="inputSearch__input__box">
          <input
            type="text"
            placeholder="Tên công ty, công việc..."
            onChange={(e) => setKeyWord(e.target.value)}
            value={keyword}
            ref={inputRef}
          />
          {keyword?.length > 0 && (
            <button className="btn-clear" onClick={() => setKeyWord("")}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          )}
        </div>
        <button className={`inputSearch__input__btn-search`} onClick={() => goToSearch()}>
          <span>Tìm kiếm</span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {searchHistory && (
        <div className={`inputSearch__history  ${openHistory ? "active" : ""}`}>
          <ul>
            {searchHistory?.slice(0, 4).map((item, i) => (
              <li onClick={() => handleSubmitHistory(item)}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
