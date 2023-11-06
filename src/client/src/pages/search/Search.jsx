import React, { useEffect } from "react";
import "./search.scss";
import SearchCareer from "../../components/searchCareer/SearchCareer";
import SearchProvince from "../../components/searchProvince/SearchProvince";
import DropdownItem from "../../components/dropdownItem/DropdownItem";
import ItemJob from "../../components/itemJob/ItemJob";
import PreviewJob from "../../components/previewJob/PreviewJob";
import jobs from "../../config/jobs";
import Modal from "../../components/modal/Modal";
import ApplyJob from "../../components/applyJob/ApplyJob";
import { useState } from "react";

import img from '../../assets/images/bannerSearch.jpg'

const sort = [
  {
    displayName: "Mới nhất",
  },
  {
    displayName: "Lương cao đến thấp",
  },
  {
    displayName: "Lương thấp đến cao",
  },
];

export default function Search() {
  const [openSort, setOpenSort] = useState(false);
  const [sortActive, setSortActive] = useState("Sắp xếp");
  const [openModal, setOpenModal] = useState(false);

  const handleSelectSort = (item) => {
    setOpenSort(false);
    setSortActive(item.displayName);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="search">
        <div className="search__wrapper">
          <div className="container">
            <div className="search__banner">
              <div className="search__banner__wrapper" style={{backgroundImage: `url(${img})`}}>
                <div className="search__banner__wrapper__input">
                  <div className="search__banner__wrapper__input__career">
                    <SearchCareer />
                  </div>
                  <div className="search__banner__wrapper__input__province">
                    <SearchProvince />
                  </div>
                  <button className="search__banner__wrapper__input__btn-search">
                    Tìm kiếm
                  </button>
                </div>
                <div className="search__banner__wrapper__filter">
                  <DropdownItem type={"rank"} />
                  <DropdownItem type={"type"} />
                  <DropdownItem type={"academic"} />
                </div>
              </div>
            </div>
            <div className="search__list">
              <div className="search__list__header">
                <h4>120 việc làm</h4>
                <div className="search__list__header__sort">
                  <div className="dropdown">
                    <div
                      className="header"
                      onClick={() => setOpenSort(!openSort)}
                    >
                      <span>{sortActive && sortActive}</span>
                      <i class="fa-solid fa-angle-down"></i>
                    </div>
                    {openSort && (
                      <div className="list">
                        {sort.map((item) => (
                          <span
                            className={`list__item ${
                              sortActive === item.displayName ? "active" : ""
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
              <div className="search__list__body row">
                <div className="search__list__body__side pc-4 t-4 m-12">
                  {jobs.map((job) => (
                    <ItemJob job={job} className={"col pc-12 t-12 m-12"} />
                  ))}
                  <div className="search__list__body__side__btn">
                    <button>Thêm</button>
                  </div>
                </div>

                <div className="search__list__body__preview col pc-8 t-8 m-0">
                  <div className="search__list__body__preview__wrapper">
                    <PreviewJob setOpenModal={setOpenModal}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={"Nộp hồ sơ ứng tuyển :"}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <ApplyJob />
      </Modal>
    </>
  );
}
