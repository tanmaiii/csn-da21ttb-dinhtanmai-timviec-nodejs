import React, { useEffect, useRef, useState } from "react";
import "./searchHeroSlide.scss";
import SearchProvince from "../searchProvince/SearchProvince";
import SearchCareer from "../searchCareer/SearchCareer"

export default function SearchHeroSlide() {

  return (
    <div className="searchHeroSide">
      <div className="searchHeroSide__wrapper">
        <div className="searchHeroSide__wrapper__input">
          <SearchCareer/>
        </div>
        <div className="searchHeroSide__wrapper__select">
          <SearchProvince/>
        </div>
        <button className="btn-search">Tìm</button>
      </div>
    </div>
  );
}
