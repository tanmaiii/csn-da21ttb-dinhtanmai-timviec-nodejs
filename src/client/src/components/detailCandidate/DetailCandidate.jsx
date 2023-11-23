import React, { useEffect, useState, useRef } from "react";
import "./detailCandidate.scss";
import Select from "../select/Select";
import { status } from "../../config/data.js";

export default function DetailCandidate({ candidate }) {
  const [optionActive, setOptionActive] = useState();

  return (
    candidate && (
      <div className="detailCandidate">
        <div className="detailCandidate__wrapper">
          <div className="detailCandidate__wrapper__control">
            <h4 className="detailCandidate__wrapper__control__title">
              Trạng thái hồ sơ
            </h4>
            <div className="detailCandidate__wrapper__control__select">
              {/* <Select options={status} defaultValue={activeStatus} /> */}
              <SelectStatus
                option={status}
                optionActive={optionActive}
                setOptionActive={setOptionActive}
                defaultActive={candidate?.status}
              />
            </div>
          </div>
          <div className="detailCandidate__wrapper__group">
            <h4 className="detailCandidate__wrapper__group__title">
              Thông tin người ứng tuyển
            </h4>
            <div className="detailCandidate__wrapper__group__content">
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Họ tên: </h6>
                <span>{candidate.name}</span>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Email: </h6>
                <span>{candidate.email}</span>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>SDT: </h6>
                <span>{candidate.phone}</span>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Công việc: </h6>
                <span>{candidate.nameJob}</span>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Ngày nộp: </h6>
                <span>{candidate.date}</span>
              </div>
            </div>
          </div>
          <div className="detailCandidate__wrapper__group">
            <h4 className="detailCandidate__wrapper__group__title">
              Thư xin việc
            </h4>
            <div className="detailCandidate__wrapper__group__content">
              <div
                className="detailCandidate__wrapper__group__content__item__letters"
                dangerouslySetInnerHTML={{ __html: candidate?.letter }}
              ></div>
            </div>
          </div>
          <div className="detailCandidate__wrapper__group">
            <h4 className="detailCandidate__wrapper__group__title">
              Liên kết cv
            </h4>
            <div className="detailCandidate__wrapper__group__content">
              <div className="detailCandidate__wrapper__group__content__item__cv">
                {candidate?.linkCv ? (
                  <a href={candidate?.linkCv}>Truy cập</a>
                ) : (
                  <span>Không có liên kết</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function SelectStatus({
  icon,
  option,
  optionActive,
  setOptionActive,
  defaultActive,
}) {
  const [open, setOpen] = useState(false);
  const SelectStatusRef = useRef();

  const handleClickOption = (item) => {
    setOptionActive(item);
    setOpen(false);
  };

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!SelectStatusRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });
  return (
    <div className="SelectStatus" ref={SelectStatusRef}>
      <div
        className={`SelectStatus__toggle ${
          optionActive !== undefined ? "active" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <div className="SelectStatus__toggle__title">
          {icon && icon}
          <span className="text"></span>
        </div>
        <i
          className={`fa-solid fa-angle-down icon-down ${open ? "open" : ""}`}
        ></i>
      </div>
      {open && (
        <div className="SelectStatus__menu">
          <div className={`SelectStatus__menu__list`}>
            {option?.map((option, i) => (
              <div
                key={i}
                className={`SelectStatus__menu__list__item  status-${
                  option?.id
                } ${optionActive === option?.id ? "active" : ""}`}
                onClick={() => handleClickOption(option?.id)}
              >
                {option?.icon}
                <span>{option?.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
