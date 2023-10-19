import React, { useState } from "react";
import "./itemCompany.scss";

export default function ItemCompany({ company, className }) {
  const [follow, setFollow] = useState(false);

  const handleFollow = () => {
    setFollow(!follow)
  }
  return (
    company && (
      <div className={`itemCompany ${className && className}`}>
        <div className="itemCompany__wrapper">
          <div className="itemCompany__wrapper__header">
            <div className="itemCompany__wrapper__header__image">
              <img src={company.photo} alt="" />
            </div>
            <h4>{company.name}</h4>
            <p className="desc">{company.desc}</p>
          </div>
          <div className="itemCompany__wrapper__body">
            <p className="quantity">{company.quantityJob}</p>
            <div className="address">
              <i className="fa-solid fa-location-dot"></i>
              <span>{company.address}</span>
            </div>
          </div>
          <button className={`btn__follow ${follow ? 'active' : ''}`} onClick={() => handleFollow()}>
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    )
  );
}
