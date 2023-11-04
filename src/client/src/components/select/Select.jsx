import React, { useRef, useState, useEffect, CSSProperties } from "react";
import "./select.scss";
import { default as SL } from "react-select";

export default function Select({
  options,
  placeholder = "Chọn...",
  defaultValue,
  selectedOption,
  setSelectedOption,
}) {

  return (
    <div className="select">
      <SL
        onChange={setSelectedOption}
        options={options}
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></SL>
    </div>
  );

}
