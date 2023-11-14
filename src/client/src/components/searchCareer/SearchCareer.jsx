import React, { useEffect, useRef, useState } from "react";
import "./searchCareer.scss";
import career from "../../config/career";
import formatStr from "../../config/formatStr";

export default function SearchCareer() {
  const [listCareer, setListCareer] = useState("");
  const [openCareer, setOpenCareer] = useState(false);
  const [valueCareer, setValueProvince] = useState("");

  const typingTimeoutRef = useRef();
  const searchCareerRef = useRef();
  const inputCareerRef = useRef();

  const handleSearchCareer = (e) => {
    let value = e.target.value;
    value = formatStr(value);

    if (value === "") return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSearchCareer(value);
    }, 300);
  };

  const onSearchCareer = (value) => {
    const valueFormat = formatStr(value);
    setValueProvince(valueFormat);

    setListCareer(
      career
        .filter((item) => {
          const name = formatStr(item.name);
          return name.includes(valueFormat);
        })
        .slice(0, 5)
    );
  };

  const handleDeleteValueProvince = () => {
    inputCareerRef.current.value = "";
    setOpenCareer(false);
    setValueProvince("");
  };

  const handleSlectedItemProvince = (value) => {
    inputCareerRef.current.value = value;
    setValueProvince(value);
    setOpenCareer(false);
  };

  useEffect(() => {
    inputCareerRef.current.addEventListener("focus", () => {
      setOpenCareer(true);
    });
  },[]);

  useEffect(() => {
    let handleMousedown = (e) => {
      if (!searchCareerRef.current.contains(e.target)) {
        setOpenCareer(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => {
      document.removeEventListener("mousedown",handleMousedown);
    };
  });

  useEffect(() => {
    setListCareer(career.slice(0, 5));
  }, []);

  return (
    <div className="searchCareer" ref={searchCareerRef}>
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="Tên công việc, công ty..."
        ref={inputCareerRef}
        onChange={(e) => handleSearchCareer(e)}
      />
      {valueCareer !== "" && (
        <button
          className="btn_delete_value"
          onClick={() => handleDeleteValueProvince()}
        >
          <i className="bx bxs-x-circle"></i>
        </button>
      )}
      <div className={`searchCareer__list ${openCareer ? "show" : ""}`}>
        {listCareer &&
          listCareer.map((item, i) => (
            <div
              key={i}
              className="searchCareer__list__item"
              onClick={() => handleSlectedItemProvince(item.name)}
            >
              <i class="fa-solid fa-magnifying-glass"></i>
              <span>{item.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
