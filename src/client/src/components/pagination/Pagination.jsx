import React, { useEffect } from "react";
import "./pagination.scss";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// export default function Pagination({
//   totalItem,
//   limit,
//   paginate,
//   setPaginate,
// }) {
//   const pageNumbers = [];
//   const navigate =useNavigate();
//   let [searchParams, setSearchParams] = useSearchParams();

//   for (let i = 0; i < Math.ceil(totalItem / limit); i++) {
//     pageNumbers.push(i);
//   }

//   if (
//     totalItem === undefined ||
//     paginate === undefined ||
//     limit === undefined
//   ) {
//     return;
//   }

//   const handleClickLeft = () => {
//     if (paginate - 1 < 0) return;
//     setPaginate(paginate - 1);
//   };

//   const handleClickRight = () => {
//     if (paginate + 1 >= pageNumbers.length) return;
//     setPaginate(paginate + 1);
//   };

//   return (
//     <div className="pagination">
//       <div className="pagination__wrapper">
//         <div
//           className={`pagination__wrapper__btn__left ${
//             paginate === 0 ? "hidden" : ""
//           }`}
//         >
//           <button onClick={handleClickLeft}>
//             <i className="fa-solid fa-angle-left"></i>
//           </button>
//         </div>
//         <div className="pagination__wrapper__list">
//           {pageNumbers.map((number, i) => {
//             if (
//               number - 2 == paginate ||
//               number + 2 == paginate ||
//               number - 1 == paginate ||
//               number + 1 == paginate ||
//               number === paginate
//             ) {
//               return (
//                 <button
//                   key={i}
//                   onClick={() => setPaginate(number)}
//                   className={`pagination__wrapper__list__item ${
//                     paginate === number ? "active" : ""
//                   }`}
//                 >
//                   {number + 1}
//                 </button>
//               );
//             } else if (paginate < 2) {
//             }
//           })}
//         </div>
//         <div
//           className={`pagination__wrapper__btn__right ${
//             paginate + 1 === pageNumbers.length ? "hidden" : ""
//           } `}
//         >
//           <button onClick={handleClickRight}>
//             <i className="fa-solid fa-angle-right"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

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
          {pageNumbers.map((num, i) => (
            <button
              key={i}
              className={paginate == num ? "active" : ""}
              onClick={() => setPaginate(num)}
            >
              {num}
            </button>
          ))}
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
