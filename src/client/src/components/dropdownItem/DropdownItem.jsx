import React, { useEffect, useRef, useState } from "react";
import "./dropdownItem.scss";

export default function DropdownItem({title, option, optionActive, setOptionActive}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown__toggle" onClick={() => setOpen(!open)}>
        <span className="text">Heder</span>
        <i className={`fa-solid fa-angle-down ${open ? "open" : ""}`}></i>
      </div>
      {open && (
        <div className="dropdown__menu">
          <div className="dropdown__menu__item">
            <label htmlFor={"item.id"}>
              <input type="checkbox" name="" id={"item.id"} />
              <span>option</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
