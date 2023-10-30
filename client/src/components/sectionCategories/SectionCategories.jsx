import React, { useEffect, useRef, useState } from "react";
import "./sectionCategories.scss";
import img from "../../assets/images/logoJobQuest.png";
import iconBuild from "../../assets/icon/icons8-build-100.png";
import SvgAccountant from "../../assets/svg/SvgAccountant";
import categories from "../../config/categories";
import { Link } from "react-router-dom";

export default function SectionCategories() {
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

  const handleClickLeft = () => {
    const widthSection = sectionListRef.current.clientWidth;
    sectionListRef.current.scrollLeft -= widthSection;
    //  handleBtnSections();
    setBtnLeft(sectionListRef.current.scrollLeft > 0 ? true : false);
    setBtnRight(
      sectionListRef.current.scrollLeft <
        sectionListRef.current.scrollWidth - sectionListRef.current.clientWidth
        ? true
        : false
    );
  };

  const handleClickRight = () => {
    const widthSection = sectionListRef.current.clientWidth;
    sectionListRef.current.scrollLeft += widthSection;
    //  handleBtnSections();
    setBtnLeft(sectionListRef.current.scrollLeft > 0 ? true : false);
    setBtnRight(
      sectionListRef.current.scrollLeft <
        sectionListRef.current.scrollWidth - sectionListRef.current.clientWidth
        ? true
        : false
    );
  };

  useEffect(() => {
    setBtnLeft(sectionListRef.current.scrollLeft > 0 ? true : false);
    setBtnRight(
      sectionListRef.current.scrollLeft <
        sectionListRef.current.scrollWidth - sectionListRef.current.clientWidth
        ? true
        : false
    );
  }, []);

  return (
    <div className="sectionCategories">
      <div className="sectionCategories__header">
        <h4>Ngành nghề phổ biến</h4>
        <Link className="sectionCategories__header__link">
          <span>Xem tất cả</span> <i class="fa-solid fa-chevron-right"></i>
        </Link>
      </div>
      <div className="sectionCategories__body">
        {btnLeft && (
          <button
            className="sectionCategories__body__left"
            onClick={() => handleTimeoutLeft()}
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>
        )}
        
        <div ref={sectionListRef} className="sectionCategories__body__list row">
          {categories.map((item, i) => (
            <div
              key={i}
              className="sectionCategories__body__list__item col pc-2-4 t-3 m-6"
            >
              <Link
                to={`viec-lam/${item.slug}`}
                className="sectionCategories__body__list__item__box"
              >
                <SvgAccountant />
                <h6>{item.text}</h6>
                <span>(120 việc làm)</span>
              </Link>
            </div>
          ))}
        </div>

        {btnRight && (
          <button
            className="sectionCategories__body__right"
            onClick={() => handleTimeoutRight()}
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
}
