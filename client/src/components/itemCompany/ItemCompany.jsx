import React, { useRef, useState } from "react";
import "./itemCompany.scss";
import {Link, useNavigate} from 'react-router-dom'

export default function ItemCompany({ company, className, style }) {
  const [follow, setFollow] = useState(false);
  const btnRef = useRef()
  const navigate = useNavigate()

  const handleFollow = () => {
    setFollow(!follow)
  }

  const handleClick = (e) => {
    if(!btnRef.current.contains(e.target)){
      return navigate('/nha-tuyen-dung/123')
    }
  }

  return (
    company && (
      <div onClick={(e) => handleClick(e)} className={`itemCompany ${className && className}`} >
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
          <button ref={btnRef} className={`btn__follow ${follow ? 'active' : ''}`} onClick={() => handleFollow()}>
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    )
  );
}
