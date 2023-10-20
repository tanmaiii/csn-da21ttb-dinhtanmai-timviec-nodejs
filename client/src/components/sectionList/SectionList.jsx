import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sectionList.scss";
import ItemCompany from "../itemCompany/ItemCompany";
import companies from "../../config/companies";

export default function SectionList({ title }) {

  const sectionListRef = useRef();

  return (
    <div className="sectionList">
      <div className="sectionList__header">
        <h4>{title}</h4>
      </div>
      <div className="sectionList__body">
        <div ref={sectionListRef} className=" sectionList__body__list row">
          {companies &&
            companies.map((company, i) => (
              <ItemCompany
                key={i}
                company={company}
                className="col pc-3 t-4 m-6"
              />
            ))}
        </div>
      </div>
      <div className="sectionList__btn">
        <button className="">
          <span>Xem tất cả</span> <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
