import React from "react";
import { Link } from "react-router-dom";
import "./sectionList.scss";
import ItemCompany from "../itemCompany/ItemCompany";
import companies from "../../config/companies";

export default function SectionList({ title }) {
  return (
    <div className="sectionList">
      <div className="sectionList__header">
        <h4>{title}</h4>
        <Link className="sectionCategories__header__link">
          <span>Xem tất cả</span> <i className="fa-solid fa-chevron-right"></i>
        </Link>
      </div>
      <div className="sectionList__body">
        <button className=" sectionList__body__btn sectionList__body__left">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className=" sectionList__body__list row">
          {companies &&
            companies.map((company, i) => (
              <ItemCompany
                key={i}
                company={company}
                className="col pc-3 t-4 m-6"
              />
            ))}
        </div>
        <button className=" sectionList__body__btn sectionList__body__right">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
