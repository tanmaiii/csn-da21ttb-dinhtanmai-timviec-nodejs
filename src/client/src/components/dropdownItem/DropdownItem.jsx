import React, { useEffect, useRef, useState } from "react";
import "./dropdownItem.scss";
import formatStr from "../../config/formatStr";

export default function DropdownItem(props) {
  const {
    icon,
    title = "Lựa chọn",
    option,
    salary,
    optionActive,
    setOptionActive,
    setSalaryFilter,
    salaryFilter,
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
        className={`dropdown__toggle ${
          (optionActive?.length > 0 && "active") || salaryFilter?.length > 0
            ? "active"
            : ""
        }`}
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
              {value.length > 0 && (
                <button className="btn-clear" onClick={() => setValue("")}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          )}
          {option && (
            <div className="dropdown__menu__list">
              {option
                ?.filter((asd) =>
                  formatStr(asd.name).includes(formatStr(value))
                )
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
          )}
          {salary && (
            <DropdownMenuSalary
              setSalaryFilter={setSalaryFilter}
              salaryFilter={salaryFilter}
            />
          )}
        </div>
      )}
    </div>
  );
}

function DropdownMenuSalary({ setSalaryFilter, salaryFilter }) {
  const minGap = 1;
  const min = 1;
  const max = 50;

  const [minVal, setMinVal] = useState(salaryFilter[0] || min);
  const [maxVal, setMaxVal] = useState(salaryFilter[1] || max);

  const [minTooltip, setMinTooltip] = useState(salaryFilter[0] || min);
  const [maxTooltip, setMaxTooltip] = useState(salaryFilter[1] || max);

  const minValRef = useRef();
  const maxValRef = useRef();

  const slideMin = () => {
    let gap =
      parseInt(maxValRef.current.value) - parseInt(minValRef.current.value);
    if (gap <= minGap) {
      minValRef.current.value = parseInt(maxValRef.current.value) - minGap;
    }
    setMinTooltip(minValRef.current.value);
    setMinVal(minValRef.current.value);

    setArea();
  };

  const slideMax = () => {
    let gap =
      parseInt(maxValRef.current.value) - parseInt(minValRef.current.value);
    if (gap <= minGap) {
      maxValRef.current.value = parseInt(minValRef.current.value) + minGap;
    }
    setMaxTooltip(maxValRef.current.value);
    setMaxVal(maxValRef.current.value);
    setArea();
  };

  const setArea = () => {
    const range = document.querySelector(".slider-track");
    const minTooltip = document.querySelector(".min-tooltip");
    const maxTooltip = document.querySelector(".max-tooltip");

    minTooltip.style.left = (minValRef.current?.value / 50) * 100 + "%";
    range.style.left = (minValRef.current?.value / 50) * 100 + "%";
    maxTooltip.style.right = 100 - (maxValRef.current?.value / 50) * 100 + "%";
    range.style.right = 100 - (maxValRef.current?.value / 50) * 100 + "%";
  };

  const handleClickSubmit = () => {
    setSalaryFilter([minVal, maxVal]);
  };

  const handleClickRemove = () => {
    setSalaryFilter([]);
    setMinVal(1);
    setMaxVal(50);
    minValRef.current.value = min;
    maxValRef.current.value = max;
    setArea()
  };

  useEffect(() => {
    slideMin();
    slideMax();
  }, []);

  return (
    <div className="dropdown__menu__salary">
      <h4>Mức lương trên tháng</h4>
      <div className="dropdown__menu__salary__slider">
        <span className="slider-track"></span>
        <input
          type="range"
          name="min"
          className="min-val"
          ref={minValRef}
          onInput={() => slideMin()}
          max={max}
          min={min}
          value={minVal}
        />
        <input
          type="range"
          name="min"
          className="max-val"
          ref={maxValRef}
          onInput={() => slideMax()}
          max={max}
          min={min}
          value={maxVal}
        />
        <div className="tooltip min-tooltip">{minTooltip}tr</div>
        <div className="tooltip max-tooltip">{maxTooltip}tr</div>
      </div>
      {/* <div className="dropdown__menu__salary__input">
        <div className="dropdown__menu__salary__input__min">
          <input
            ref={minInputRef}
            type="number"
            defaultValue={1}
            min={1}
            max={50}
            value={minInput}
          />
          <span>triệu</span>
        </div>
        -
        <div className="dropdown__menu__salary__input__max">
          <input
            ref={maxInputRef}
            type="number"
            defaultValue={50}
            min={1}
            max={50}
            value={maxInput}
          />
          <span>triệu</span>
        </div>
      </div> */}
      <div className="dropdown__menu__salary__button">
        <button className="btn-submit" onClick={() => handleClickSubmit()}>
          Áp dụng
        </button>
        <button className="btn-remove" onClick={() => handleClickRemove()}>
          <i class="fa-regular fa-trash-can"></i>
          <span>Xóa lọc</span>
        </button>
      </div>
    </div>
  );
}

