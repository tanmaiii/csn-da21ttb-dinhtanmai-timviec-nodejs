import React from "react";
import "./company.scss";
import province from "../../config/province";
import companies from "../../config/companies"

import ItemCompany from "../../components/itemCompany/ItemCompany";

const scale = [
  {
    name: "25 - 100",
  },
  {
    name: "100 - 500",
  },
  {
    name: "500 - 1000",
  },
  {
    name: "1000 - 5000",
  },
  {
    name: "5000 - 10000",
  },
  {
    name: "10000  - 20000",
  },
];

export default function Company() {
  console.log(scale);
  return (
    <div className="company">
      <div className="container">
        <div className="company__wrapper">
          <div className="company__wrapper__header">
            <h4>Nhà tuyển dụng hàng đầu</h4>
            <div className="company__wrapper__header__search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Tìm công ty" />
              <button>Tìm</button>
            </div>
          </div>
          <div className="company__wrapper__main row">
            <div className="col pc-3 t-3 m-0">
              <div className="company__wrapper__main__filter">
                <div className="company__wrapper__main__filter__address">
                  <h6>Địa chỉ</h6>
                  <div className="company__wrapper__main__filter__address__list">
                    {province
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((item, i) => (
                        <label
                          key={i}
                          className="company__wrapper__main__filter__address__list__item"
                        >
                          <input type="checkbox" />
                          <span>{item.name}</span>
                        </label>
                      ))}
                  </div>
                </div>
                <div className="company__wrapper__main__filter__scale">
                  <h6>Quy mô</h6>
                  <div className="company__wrapper__main__filter__scale__list">
                    {scale.map((item, i) => (
                      <div
                        key={i}
                        className="company__wrapper__main__filter__scale__list__item"
                      >
                        <input type="checkbox" />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col pc-9 t-9 m-12">
              <div className="company__wrapper__main__list">
                      {
                        companies.map((company, i) => (
                              <ItemCompany company={company} key={i} className={"col pc-4 t-6 m-12"}/>
                        ))
                      }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
