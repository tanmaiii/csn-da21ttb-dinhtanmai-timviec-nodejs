import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sectionList.scss";
import ItemCompany from "../itemCompany/ItemCompany";
import companies from "../../config/companies";

export default function SectionList({ title }) {
  const [btnLeft, setBtnLeft] = useState(false);
  const [btnRight, setBtnRight] = useState(true);

  const sectionListRef = useRef();
  const btnRightTimeoutRef = useRef();
  const btnLeftTimeoutRef = useRef();

  const handleTimeoutLeft = () => {
    if (btnLeftTimeoutRef.current) {
      clearTimeout(btnLeftTimeoutRef.current);
    }
    btnLeftTimeoutRef.current = setTimeout(() => {
      handleClickLeft();
    }, 300);
  };

  const handleTimeoutRight = () => {
    if (btnRightTimeoutRef.current) {
      clearTimeout(btnRightTimeoutRef.current);
    }
    btnRightTimeoutRef.current = setTimeout(() => {
      handleClickRight();
    }, 300);
  };

  const handleClickRight = () => {
    const widthSection = sectionListRef.current.clientWidth;
    sectionListRef.current.scrollLeft += widthSection;
    handleHideBtn();
  };

  const handleClickLeft = () => {
    const widthSection = sectionListRef.current.clientWidth;
    sectionListRef.current.scrollLeft -= widthSection;
    handleHideBtn();
  };

  const handleHideBtn = () => {
    setBtnLeft(sectionListRef.current.scrollLeft > 0 ? true : false);
    setBtnRight(
      sectionListRef.current.scrollLeft <
        sectionListRef.current.scrollWidth - sectionListRef.current.clientWidth
        ? true
        : false
    );
  };

  return (
    <div className="sectionList">
      <div className="sectionList__header">
        <h4>{title}</h4>
        <Link className="sectionCategories__header__link">
          <span>Xem tất cả</span> <i className="fa-solid fa-chevron-right"></i>
        </Link>
      </div>
      <div className="sectionList__body">
        {btnLeft && (
          <button
            className=" sectionList__body__btn sectionList__body__left"
            onClick={() => handleTimeoutLeft()}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        )}
        <div
          ref={sectionListRef}
          className=" sectionList__body__list row"
        >
          {companies &&
            companies.map((company, i) => (
              <ItemCompany
                key={i}
                company={company}
                className="col pc-3 t-4 m-6"
              />
            ))}
        </div>
        {btnRight && (
          <button
            className=" sectionList__body__btn sectionList__body__right"
            onClick={() => handleTimeoutRight()}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
}
