import React from "react";
import "./search.scss";
import SearchCareer from "../../components/searchCareer/SearchCareer";
import SearchProvince from "../../components/searchProvince/SearchProvince";
import DropdownItem from "../../components/dropdownItem/DropdownItem";
import ItemJob from "../../components/itemJob/ItemJob";
import jobs from "../../config/jobs";
import { useState } from "react";

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
]

export default function Search() {
  const [openSort , setOpenSort] = useState(false);
  const [sortActive, setSortActive] = useState("Sắp xếp");

  const handleSelectSort = (item) => {
    setOpenSort(false)
    setSortActive(item.displayName)
  }

  return (
    <div className="search">
      <div className="search__wrapper">
        <div className="container">
          <div className="search__banner">
            <div className="search__banner__wrapper">
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
                  <div className="header" onClick={() => setOpenSort(!openSort)}>
                    <span>{sortActive && sortActive}</span>
                    <i class="fa-solid fa-angle-down"></i>
                  </div>
                  {openSort && <div className="list">
                    {sort.map(item => (
                      <span className={`list__item ${sortActive === item.displayName ? 'active' : ''}`}onClick={() => handleSelectSort(item)}>{item.displayName}</span>
                    ))}
                  </div>}
                </div>
              </div>
            </div>
            <div className="search__list__body row">
              {jobs.map((job) => (
                <ItemJob job={job} className={"col pc-6 t-6 m-12"} />
              ))}
            </div>
            <div className="search__list__bottom">
              <button>Thêm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
