import React, { useRef, useState } from "react";
import "./itemCompany.scss";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/avatarCpn.png";
import { apiImage } from "../../axios";

// export default function ItemCompany({ company, className, style }) {
//   const [follow, setFollow] = useState(false);
//   const btnRef = useRef();
//   const navigate = useNavigate();

//   const handleFollow = () => {
//     setFollow(!follow);
//   };

//   const handleClick = (e) => {
//     if (!btnRef.current.contains(e.target)) {
//       return navigate(`/nha-tuyen-dung/${company?.id}`);
//     }
//   };

//   console.log(company);

//   return (
//     company && (
//       <div
//         onClick={(e) => handleClick(e)}
//         className={`itemCompany ${className && className}`}
//       >
//         <div className="itemCompany__wrapper">
//           <div className="itemCompany__wrapper__header">
//             <div className="itemCompany__wrapper__header__image">
//               <img
//                 src={company?.avatarPic ? apiImage + company?.avatarPic : img}
//                 alt=""
//               />
//             </div>
//             <h4>{company?.nameCompany}</h4>
//             <p
//               className="desc"
//               dangerouslySetInnerHTML={{ __html: company?.intro }}
//             ></p>
//           </div>
//           <div className="itemCompany__wrapper__body">
//             <p className="quantity">{company?.quantityJob}</p>
//             <div className="address">
//               <i className="fa-solid fa-location-dot"></i>
//               <span>{company?.province}</span>
//             </div>
//           </div>
//           <button
//             ref={btnRef}
//             className={`btn__follow ${follow ? "active" : ""}`}
//             onClick={() => handleFollow()}
//           >
//             <i className="fa-regular fa-heart"></i>
//             <i className="fa-solid fa-heart"></i>
//           </button>
//         </div>
//       </div>
//     )
//   );
// }

export default function ItemCompany({ company, className, style }) {
  const [follow, setFollow] = useState(false);
  const btnRef = useRef();
  const navigate = useNavigate();

  const handleFollow = () => {
    setFollow(!follow);
  };

  const handleClick = (e) => {
    if (!btnRef.current.contains(e.target)) {
      return navigate(`/nha-tuyen-dung/${company?.id}`);
    }
  };

  return (
    company && (
      <div
        onClick={(e) => handleClick(e)}
        className={`itemCompany ${className && className}`}
      >
        <div className="itemCompany__wrapper">
          <img
            className="itemCompany__wrapper__image"
            src={company?.avatarPic ? apiImage + company?.avatarPic : img}
            alt=""
          />
          <div className="itemCompany__wrapper__body">
            <h2 className="name">{company?.nameCompany}</h2>
            <div className="desc">
              <div className="province">
                <i class="fa-solid fa-location-dot"></i>
                <span>{company?.province}</span>
              </div>
              <span className="job">12 việc làm</span>
            </div>
          </div>
          <button
            ref={btnRef}
            className={`btn__follow ${follow ? "active" : ""}`}
            onClick={() => handleFollow()}
          >
            <i className="fa-regular fa-heart"></i>
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    )
  );
}
