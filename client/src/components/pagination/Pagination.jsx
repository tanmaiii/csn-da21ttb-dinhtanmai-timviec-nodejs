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

  if (
    totalItem === undefined ||
    paginate === undefined ||
    limit === undefined
  ) {
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
        <div
          className={`pagination__wrapper__btn__left ${
            paginate === 0 ? "hidden" : ""
          }`}
        >
          <button onClick={handleClickLeft}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </div>
        <div className="pagination__wrapper__list">
          {pageNumbers.map((number, i) => {
            if (
              number - 2 == paginate ||
              number + 2 == paginate ||
              number - 1 == paginate ||
              number + 1 == paginate ||
              number === paginate
            ) {
              return (
                <button
                  key={i}
                  onClick={() => setPaginate(number)}
                  className={`pagination__wrapper__list__item ${
                    paginate === number ? "active" : ""
                  }`}
                >
                  {number + 1}
                </button>
              );
            } else if (paginate < 2) {
            }
          })}

          {/* {pageNumbers.map((number, i) => (
            <button
              key={i}
              onClick={() => setPaginate(number)}
              className={`pagination__wrapper__list__item ${
                paginate === number ? "active" : ""
              }`}
            >
              {number + 1}
            </button>
          ))} */}
        </div>
        <div
          className={`pagination__wrapper__btn__right ${
            paginate + 1 === pageNumbers.length ? "hidden" : ""
          } `}
        >
          <button onClick={handleClickRight}>
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}