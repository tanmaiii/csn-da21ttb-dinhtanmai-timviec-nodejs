import React from "react";
import "./pagination.scss";
import { useState } from "react";

export default function Pagination({
  totalItem,
  limit,
  paginate,
  setPaginate,
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(totalItem / limit); i++) {
    pageNumbers.push(i);
  }

  if (totalItem === undefined || paginate === undefined || limit === undefined) {
    return;
  }

  const handleClickLeft = () => {
    if (paginate - 1 < 0) return;
    setPaginate(paginate - 1);
  };

  const handleClickRight = () => {
    if (paginate + 1 >= pageNumbers.length) return;
    setPaginate(paginate + 1);
  };

  return (
    <div className="pagination">
      <div className="pagination__wrapper">
        <div className="pagination__wrapper__btn__left">
          <button onClick={handleClickLeft}>
            <i class="fa-solid fa-angle-left"></i>
          </button>
        </div>
        <div className="pagination__wrapper__list">
          {pageNumbers.map((number) => (
            <button
              onClick={() => setPaginate(number)}
              className={`pagination__wrapper__list__item ${
                paginate === number ? "active" : ""
              }`}
            >
              {number + 1}
            </button>
          ))}
        </div>
        <div className="pagination__wrapper__btn__right">
          <button onClick={handleClickRight}>
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
