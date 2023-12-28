import React, { useEffect, useRef, useState } from "react";
import "./sectionCategories.scss";
import { categories } from "../../config/data.js";
import { Link, useNavigate } from "react-router-dom";

import Slider from "react-slick";

import "./slick.scss";
import "./slick-theme.scss";

// import img from '../../assets/icon/1.png'

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slider__nextArrow`}
      //   style={{ ...style, display: "block", background: "", right: "0px", zIndex: 9999, width: "60px", height: "60px" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slider__sprevArrow`}
      //  style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6, // Số lượng hiển thị item mỗi lần
  slidesToScroll: 6,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function SectionCategories() {
  const navigate = useNavigate();

  return (
    <div className="sectionCategories">
      <div className="sectionCategories__header">
        <h4>Ngành nghề phổ biến</h4>
        <Link className="sectionCategories__header__link" to={"/tim-viec-lam-nhanh"}>
          <span>Xem tất cả</span> <i className="fa-solid fa-chevron-right"></i>
        </Link>
      </div>
      <div className="sectionCategories__body">
        <div className="sectionCategories__body__list">
          <Slider {...settings}>
            {categories.map((item, i) => (
              <div key={i} className="sectionCategories__body__list__item">
                <div key={item.id} className="sectionCategories__body__list__item__box">
                  <Link
                    to={`/tim-kiem${item.link}`}
                    target="_blank"
                    className="sectionCategories__body__list__item__box__text"
                  >
                    <h4>{item.text}</h4>
                  </Link>
                  <Link
                    to={`/tim-kiem${item.link}`}
                    target="_blank"
                    className="sectionCategories__body__list__item__box__image"
                  >
                    <img src={item?.icon} alt="" />
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
