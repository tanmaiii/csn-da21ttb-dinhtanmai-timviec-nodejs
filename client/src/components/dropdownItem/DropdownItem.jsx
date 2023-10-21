import React, { useEffect, useRef, useState } from "react";
import "./dropdownItem.scss";
import filter from "../../config/filter";

export default function DropdownItem({ type }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  console.log(filter.filter((item) => item.name === type));

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
    <>
      {filter &&
        filter
          .filter((item) => item.name === type)
          .map((group) => (
            <div className="dropdown" ref={dropdownRef}>
              <div className="dropdown__toggle" onClick={() => setOpen(!open)}>
                {group?.icon}
                <span className="text">{group.displayName}</span>
                <i class="fa-solid fa-angle-down"></i>
              </div>
              {open && (
                <div className="dropdown__menu">
                  {group.list.map((item, i) => (
                    <div className="dropdown__menu__item">
                      <label htmlFor={item.id}>
                        <input type="checkbox" name="" id={item.id} />
                        <span>{item.displayName}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
    </>
  );
}
