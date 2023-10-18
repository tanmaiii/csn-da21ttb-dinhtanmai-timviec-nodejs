import React, { useEffect, useRef, useState } from "react";
import iconLocation from "../../assets/icon/icons8-location-48.png";
import "./searchProvince.scss";

import province from "../../config/province";

import formatStr from "../../config/formatStr";

export default function SearchProvince() {
  const [listProvince, setListProvince] = useState(null);
  const [valueProvince, setValueProvince] = useState("");
  const [openProvince, setOpenProvince] = useState(false);

  const typingTimeoutRef = useRef(null);
  const inputProvinceRef = useRef();

  const handleSearchProvince = (e) => {
    let value = e.target.value;
    value = formatStr(value);

    if (value === "") return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSearchProvince(value);
    }, 300);
  };

  const onSearchProvince = (value) => {
    const valueFormat = formatStr(value);
    setValueProvince(valueFormat);

    setListProvince(
      province
        .filter((item) => {
          const name = formatStr(item.name);
          return name.includes(valueFormat);
        })
        .slice(0, 5)
    );
  };

  const handleSlectedItemProvince = (value) => {
    setOpenProvince(false);
    inputProvinceRef.current.value = value;
  };

  const handleDeleteValueProvince = () => {
    setValueProvince("");
    setOpenProvince(false);
    inputProvinceRef.current.value = "";
  };

  useEffect(() => {
    inputProvinceRef.current.addEventListener("focus", () => {
      setOpenProvince(true);
    });
  }, []);

  useEffect(() => {
    setListProvince(province.slice(0, 5));
  }, []);

  return (
    <div className="searchProvince">
      <i class="fa-solid fa-location-dot"></i>
      <input
        type="text"
        placeholder="Tên tỉnh, thành phố..."
        onChange={(e) => handleSearchProvince(e)}
        ref={inputProvinceRef}
      />
      {valueProvince !== "" && (
        <button
          className="btn_delete_value"
          onClick={() => handleDeleteValueProvince()}
        >
          <i className="bx bxs-x-circle"></i>
        </button>
      )}
      <div className={`searchProvince__list ${openProvince ? "show" : ""}`}>
        {listProvince &&
          listProvince.map((item, i) => (
            <div
              key={i}
              className="searchProvince__list__item"
              onClick={() => handleSlectedItemProvince(item.name)}
            >
              <i class="fa-solid fa-location-dot"></i>
              <span>{item.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
