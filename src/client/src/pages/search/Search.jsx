import React, { useEffect } from "react";
import "./search.scss";
import DropdownItem from "../../components/dropdownItem/DropdownItem";
import ItemJob from "../../components/itemJob/ItemJob";
import PreviewJob from "../../components/previewJob/PreviewJob";
import Modal from "../../components/modal/Modal";
import ApplyJob from "../../components/applyJob/ApplyJob";
import Pagination from "../../components/pagination/Pagination";
import { useState } from "react";
import { makeRequest } from "../../axios";
import Select from "../../components/select/Select";

import img from "../../assets/images/bannerSearch.jpg";

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
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [totalJobs, setTotalJobs] = useState(0);
  const [idJobActive, setIdJobActive] = useState();
  const limit = 9;

  const handleSelectSort = (item) => {
    setOpenSort(false);
    setSortActive(item);
  };

  const getJob = async () => {
    try {
      let url = `/job?page=${paginate}&limit=${limit}`;

      if (sortActive !== "Sắp xêp") {
        url += `&sort=${sortActive?.value}`;
      }

      const res = await makeRequest.get(url);
      setTotalPage(res.data.pagination.totalPage);
      setTotalJobs(res.data.pagination.total);
      setJobs(res.data.data);
      setIdJobActive(res.data.data[0]?.id);
    } catch (error) {}
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getJob();
  }, [paginate, sortActive]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="search">
        <div className="search__wrapper">
          <div className="container">
            <BannerSearch />
            <div className="search__list">
              <div className="search__list__header">
                <h4>{totalJobs && totalJobs} việc làm</h4>
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
                  {jobs?.map((job, i) => (
                    <ItemJob
                      onClick={() => setIdJobActive(job?.id)}
                      key={i}
                      job={job}
                      className={`col pc-4 t-6 m-12 ${
                        idJobActive === job.id && "active"
                      }`}
                    />
                  ))}
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

function BannerSearch() {
  const [province, setProvince] = useState();
  const [selectedOptionProvince, setSelectedOptionProvince] = useState();

  const [field, setField] = useState();
  const [selectedOptionField, setSelectedOptionField] = useState();

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
        <div className="search__banner__wrapper__input">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Tên công ty, công việc..." />
          <button className="search__banner__wrapper__input__btn-search">
            Tìm kiếm
          </button>
        </div>
        <div className="search__banner__wrapper__filter">
          <div className="search__banner__wrapper__filter__item">
            <Select
              placeholder={"Tỉnh thành"}
              options={province}
              selectedOption={selectedOptionProvince}
              setSelectedOption={setSelectedOptionProvince}
            />
          </div>
          <div className="search__banner__wrapper__filter__item">
            <Select placeholder={"Ngành nghề"} options={field}    selectedOption={selectedOptionField}
              setSelectedOption={setSelectedOptionField}/>
          </div>
          <div className="search__banner__wrapper__filter__item">
            <Select placeholder={"Tỉnh thành"} />
          </div>
          <div className="search__banner__wrapper__filter__item">
            <Select placeholder={"Tỉnh thành"} />
          </div>
          {/* <DropdownItem type={"rank"} />
          <DropdownItem type={"type"} />
          <DropdownItem type={"academic"} /> */}
        </div>
      </div>
    </div>
  );
}
