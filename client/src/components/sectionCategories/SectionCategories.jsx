import React from "react";
import "./sectionCategories.scss";
import categories from "../../config/categories";
import img from "../../assets/images/logoJobQuest.png";
import iconBuild from "../../assets/icon/icons8-build-100.png";
import SvgAccountant from '../../assets/icon/accountant.svg';

export default function SectionCategories() {
  return (
    <div className="sectionCategories">
      <div className="sectionCategories__header">
        <h4>Ngành nghề phổ biến</h4>
      </div>
      <div className="sectionCategories__body">
        <div className="sectionCategories__body__list row">
          <div className="sectionCategories__body__list__item col pc-2-4">
            <div className="sectionCategories__body__list__item__box">
              <img className="img_icon" src={SvgAccountant} alt="" />
              <span>Xây dựng</span>
            </div>
          </div>
          <div className="sectionCategories__body__list__item col pc-2-4">
            <div className="sectionCategories__body__list__item__box">
              <img className="img_icon" src={SvgAccountant} alt="" />
              <span>Xây dựng</span>
            </div>
          </div>
          <div className="sectionCategories__body__list__item col pc-2-4">
            <div className="sectionCategories__body__list__item__box">
              <img className="img_icon" src={SvgAccountant} alt="" />
              <span>Xây dựng</span>
            </div>
          </div>
          <div className="sectionCategories__body__list__item col pc-2-4">
            <div className="sectionCategories__body__list__item__box">
              <img className="img_icon" src={SvgAccountant} alt="" />
              <span>Xây dựng</span>
            </div>
          </div>
          <div className="sectionCategories__body__list__item col pc-2-4">
            <div className="sectionCategories__body__list__item__box">
              <img className="img_icon" src={SvgAccountant} alt="" />
              <span>Xây dựng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
