import React, { useEffect, useRef, useState } from "react";
import "./itemJob.scss";
import { Link, useNavigate } from "react-router-dom";
import { apiImage, makeRequest } from "../../axios";
import { useAuth } from "../../context/authContext";
import img from "../../assets/images/avatarCpn.png";
import moment from "moment";
import "moment/locale/vi";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

// export default function ItemJob({ className, job, onClick }) {
//   const [save, setSave] = useState(false);
//   const [openMore, setOpenMore] = useState(false);
//   const { currentCompany, currentUser } = useAuth();
//   const [userSave, setUserSave] = useState();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const buttonMoreRef = useRef();

//   const getUserSave = async () => {
//     try {
//       const res = await makeRequest.get(`save/user?idJob=${job.id}`)
//       setUserSave(res.data);
//     } catch (error) {}
//   };

//   const { isLoading, error, data } = useQuery(["save", job.id], () => {
//     return getUserSave();
//   });

//   const mutationSave = useMutation(
//     (saved) => {
//       if (saved) return makeRequest.delete("/save?idJob=" + job?.id);
//       return makeRequest.post("/save?idJob=" + job?.id);
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["save"]);
//       },
//     }
//   );

//   const handleSubmitSave = () => {
//     if (!currentUser) return navigate("/nguoi-dung/dang-nhap");
//     mutationSave.mutate(userSave?.includes(currentUser?.id));
//   };

//   useEffect(() => {
//     if (currentCompany?.id === job?.idCompany) {
//       const handleMousedown = (e) => {
//         if (!buttonMoreRef.current.contains(e.target)) {
//           setOpenMore(false);
//         }
//       };
//       document.addEventListener("mousedown", handleMousedown);
//       return () => document.removeEventListener("mousedown", handleMousedown);
//     }
//   });

//   return (
//     <div className={`itemJob ${className && className}`} onClick={onClick}>
//       <div className="itemJob__wrapper">
//         <div className="itemJob__wrapper__header">
//           <div className="itemJob__wrapper__header__infoCpn">
//             <img
//               src={job?.avatarPic ? apiImage + job?.avatarPic : img}
//               alt=""
//             />
//             <div className="text">
//               <Link to={`/nha-tuyen-dung/${job?.idCompany}`}>
//                 <h2 className="nameCompany">{job?.nameCompany}</h2>
//               </Link>
//               <div className="place">
//                 <i className="fa-solid fa-location-dot"></i>
//                 <span>{job?.province}</span>
//               </div>
//             </div>
//           </div>
//           <div className="itemJob__wrapper__header__button">
//             {job?.idCompany === currentCompany?.id && (
//               <div ref={buttonMoreRef} className="button__more">
//                 <button onClick={() => setOpenMore(!openMore)}>
//                   <i className="fa-solid fa-ellipsis"></i>
//                 </button>
//                 <div className={`button__more__body  ${openMore && "active"}`}>
//                   <button>
//                     <i className="fa-solid fa-pen-to-square"></i>
//                     <span>Sửa</span>
//                   </button>
//                   <button>
//                     <i className="fa-solid fa-trash"></i>
//                     <span>Xóa</span>
//                   </button>
//                 </div>
//               </div>
//             )}
//             <button className="button__save" onClick={() => handleSubmitSave()}>
//               {userSave?.includes(currentUser?.id) ? (
//                 <i class="fa-solid fa-heart"></i>
//               ) : (
//                 <i class="fa-regular fa-heart"></i>
//               )}
//             </button>
//           </div>
//         </div>
//         <div className="itemJob__wrapper__body">
//           <Link to={`/viec-lam/${job?.id}`}>
//             <h4 className="nameJob">{job?.nameJob}</h4>
//           </Link>
//           <div className="inportant">
//             <div className="wage">
//               <i className="fa-solid fa-dollar-sign"></i>
//               <span>
//                 {job?.salaryMax === 0 && job?.salaryMin === 0
//                   ? "Thảo thuận"
//                   : `${job?.salaryMin} - ${job?.salaryMax}`}
//               </span>
//             </div>
//             <div className="typeWork">
//               <span>{job?.typeWork}</span>
//             </div>
//           </div>
//           <span className="createdAt">{moment(job?.createdAt).fromNow()}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function ItemJob({ className, job, onClick }) {
  const [save, setSave] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const { currentCompany, currentUser } = useAuth();
  const [userSave, setUserSave] = useState();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const buttonMoreRef = useRef();

  const getUserSave = async () => {
    try {
      const res = await makeRequest.get(`save/user?idJob=${job.id}`);
      setUserSave(res.data);
    } catch (error) {}
  };

  const { isLoading, error, data } = useQuery(["save", job.id], () => {
    return getUserSave();
  });

  const mutationSave = useMutation(
    (saved) => {
      if (saved) return makeRequest.delete("/save?idJob=" + job?.id);
      return makeRequest.post("/save?idJob=" + job?.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["save"]);
      },
    }
  );

  const handleSubmitSave = () => {
    if (!currentUser) return navigate("/nguoi-dung/dang-nhap");
    mutationSave.mutate(userSave?.includes(currentUser?.id));
  };

  useEffect(() => {
    if (currentCompany?.id === job?.idCompany) {
      const handleMousedown = (e) => {
        if (!buttonMoreRef.current.contains(e.target)) {
          setOpenMore(false);
        }
      };
      document.addEventListener("mousedown", handleMousedown);
      return () => document.removeEventListener("mousedown", handleMousedown);
    }
  });

  return (
    <div className={`itemJob ${className && className}`} onClick={onClick}>
      <div className="itemJob__wrapper">
        <div className="itemJob__wrapper__header">
          <img src={job?.avatarPic ? apiImage + job?.avatarPic : img} alt="" />
          <div className="text">
            <Link to={`/viec-lam/${job?.id}`}>
              <h4 className="nameJob">{job?.nameJob}</h4>
            </Link>
            <Link to={`/nha-tuyen-dung/${job?.idCompany}`}>
              <h6 className="nameCompany">{job?.nameCompany}</h6>
            </Link>
          </div>
        </div>
        <div className="itemJob__wrapper__body">
          <div className="itemJob__wrapper__body__inportant">
            <div className="wage">
              <i className="fa-solid fa-dollar-sign"></i>
              <span>
                {job?.salaryMax === 0 && job?.salaryMin === 0
                  ? "Thảo thuận"
                  : `${job?.salaryMin} - ${job?.salaryMax} triệu`}
              </span>
            </div>
            <div className="typeWork">
              <span>{job?.typeWork}</span>
            </div>
            <div className="province">
              <i className="fa-solid fa-location-dot"></i>
              <span>{job?.province}</span>
            </div>
          </div>
        </div>
        <div className="itemJob__wrapper__bottom">
          <span className="createdAt">{moment(job?.createdAt).fromNow()}</span>
          <div className="itemJob__wrapper__bottom__button">
            {job?.idCompany === currentCompany?.id && (
              <div ref={buttonMoreRef} className="button__more">
                <button onClick={() => setOpenMore(!openMore)}>
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
                <div className={`button__more__body  ${openMore && "active"}`}>
                  <button>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span>Sửa</span>
                  </button>
                  <button>
                    <i className="fa-solid fa-trash"></i>
                    <span>Xóa</span>
                  </button>
                </div>
              </div>
            )}
            {!currentCompany && (
              <button
                className="button__save"
                onClick={() => handleSubmitSave()}
              >
                {userSave?.includes(currentUser?.id) ? (
                  <i class="fa-solid fa-heart"></i>
                ) : (
                  <i class="fa-regular fa-heart"></i>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}