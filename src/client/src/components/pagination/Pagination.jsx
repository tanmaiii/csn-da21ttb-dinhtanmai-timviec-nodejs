import React, { useEffect } from "react";
import "./pagination.scss";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Pagination({
  totalPage,
  limit,
  paginate,
  setPaginate,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  if (
    totalPage === undefined ||
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
    if (paginate >= pageNumbers.length) return;
    setPaginate(paginate + 1);
  };

  return (
    <div className="pagination">
      <div className="pagination__wrapper">
        <div
          className={`pagination__wrapper__btn__left ${
            paginate - 1 == 0 ? "hidden" : ""
          }`}
        >
          <button onClick={handleClickLeft}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </div>
        <div className="pagination__wrapper__list">
          {pageNumbers.map((number, i) => {
            if (paginate <= 3) {
              if (number <= 5) {
                return (
                  <button
                    key={i}
                    onClick={() => setPaginate(number)}
                    className={`pagination__wrapper__list__item ${
                      paginate === number ? "active" : ""
                    }`}
                  >
                    {number}
                  </button>
                );
              }
            } else if (paginate > totalPage - 3) {
              if (number > totalPage - 5) {
                return (
                  <button
                    key={i}
                    onClick={() => setPaginate(number)}
                    className={`pagination__wrapper__list__item ${
                      paginate === number ? "active" : ""
                    }`}
                  >
                    {number}
                  </button>
                );
              }
            } else if (
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
                  {number}
                </button>
              );
            }
          })}
        </div>
        <div
          className={`pagination__wrapper__btn__right ${
            paginate + 1 > totalPage ? "hidden" : ""
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
