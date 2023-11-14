import React, { useEffect, useRef, useState } from "react";
import "./dropdownItem.scss";
import formatStr from '../../config/formatStr'

export default function DropdownItem(props) {
  const {
    icon,
    title = "Lựa chọn",
    option,
    optionActive,
    setOptionActive,
    search = false,
  } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const dropdownRef = useRef();

  const handleClickOption = (name) => {
    if (optionActive.includes(name)) {
      const newFilter = [...optionActive];
      newFilter.splice(optionActive.indexOf(name), 1);
      setOptionActive(newFilter);
    } else {
      setOptionActive((current) => [...current, name]);
    }
  };

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
      <div
        className={`dropdown__toggle ${optionActive?.length > 0 && "active"}`}
        onClick={() => setOpen(!open)}
      >
        {icon && icon}
        <span className="text">{title}</span>
        <i className={`fa-solid fa-angle-down ${open ? "open" : ""}`}></i>
      </div>
      {open && (
        <div className="dropdown__menu">
          {search && (
            <div className="dropdown__menu__search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {value.length > 0 && <button className="btn-clear" onClick={() => setValue('')}>
                  <i className="fa-solid fa-xmark"></i>
              </button>}
            </div>
          )}
          <div className="dropdown__menu__list">
            {}
            {option
              ?.filter((asd) => formatStr(asd.name).includes(formatStr(value)))
              .map((option, i) => (
                <div key={i} className="dropdown__menu__list__item">
                  <label htmlFor={i}>
                    <input
                      type="checkbox"
                      checked={optionActive.includes(option?.name)}
                      name=""
                      id={i}
                      onClick={() => handleClickOption(option?.name)}
                    />
                    <span>{option?.name}</span>
                  </label>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
