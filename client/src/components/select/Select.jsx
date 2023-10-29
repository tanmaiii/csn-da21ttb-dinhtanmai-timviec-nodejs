import React, { useRef, useState, useEffect, CSSProperties } from "react";
import "./select.scss";
import { default as SL } from "react-select";

// export default function Select({ options, optionActive, setOptionActive }) {
//   const [open, setOpen] = useState(false);
//   const selectRef = useRef();

//   console.log(optionActive);

//   useEffect(() => {
//     const handleMousedown = (e) => {
//       if (!selectRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleMousedown);
//     return () => document.removeEventListener("mousedown", handleMousedown);
//   });

//   const handleSetActive = (i) => {
//     setOptionActive(i);
//     setOpen(false);
//   };

//   return (
//     <div className="select" ref={selectRef}>
//       <div
//         className={`select__header ${open ? "open" : ""}`}
//         onClick={() => setOpen(!open)}
//       >
//         <span>{options[optionActive && optionActive]}</span>
//         <i class="fa-solid fa-chevron-down"></i>
//       </div>
//       {open && (
//         <div className="select__body">
//           {options.map((item, i) => (
//             <div
//               key={i}
//               className={`select__body__item ${
//                 optionActive === i ? "active" : ""
//               }`}
//               onClick={() => handleSetActive(i)}
//             >
//               {item}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

export default function Select({ options, placeholder="Chọn..." , defaultValue}) {
  return (
    <div className="select" >
      <SL
        options={options}
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></SL>
    </div>
  );
}
