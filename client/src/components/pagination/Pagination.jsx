import React from "react";
import "./pagination.scss";

export default function Pagination({ page, limit, witdPagi }) {
  if (!witdPagi || !page || !limit) {
    return;
  }

  return (
    <div className="pagination">
      <div className="pagination__wrapper">
        <div className="pagination__wrapper__btn__left">
          <button>
            <i class="fa-solid fa-angle-left"></i>
          </button>
        </div>
        <div className="pagination__wrapper__list">
          <button className="pagination__wrapper__list__item active">1</button>
          <button className="pagination__wrapper__list__item">2</button>
          <button className="pagination__wrapper__list__item">3</button>
        </div>
        <div className="pagination__wrapper__btn__right">
          <button>
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
