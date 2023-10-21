import React from "react";
import "./search.scss";
import SearchCareer from "../../components/searchCareer/SearchCareer";
import SearchProvince from "../../components/searchProvince/SearchProvince";
import DropdownItem from "../../components/dropdownItem/DropdownItem";

export default function Search() {
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
                <DropdownItem type={'rank'} />
                <DropdownItem type={'type'} />
                <DropdownItem type={'academic'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
