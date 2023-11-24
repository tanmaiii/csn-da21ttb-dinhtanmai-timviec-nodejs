import React, { useEffect, useState, useRef } from "react";
import "./detailCandidate.scss";
import Select from "../select/Select";
import { status } from "../../config/data.js";
import { makeRequest } from "../../axios.js";

import { useMutation, useQuery, useQueryClient } from "react-query";

export default function DetailCandidate({ idApply }) {
  const [candidate, setCandidate] = useState();

  // useEffect(() => {
  //   setOptionActive(candidate?.status);
  // }, [candidate]);

  const getApply = async () => {
    try {
      const res = await makeRequest.get("/apply/detail/" + idApply);
      setCandidate(res.data);
    } catch (error) {}
  };

  const {} = useQuery(["apply", idApply], () => {
    return getApply();
  });

  // useEffect(() => {
  //   mutation.mutate(optionActive);
  // }, [optionActive]);

  return (
    candidate && (
      <div className="detailCandidate">
        <div className="detailCandidate__wrapper">
          <div className="detailCandidate__wrapper__control">
            <h4 className="detailCandidate__wrapper__control__title">
              Trạng thái hồ sơ
            </h4>
            <div className="detailCandidate__wrapper__control__select">
              <SelectStatus
                option={status}
                // optionActive={optionActive}
                // setOptionActive={setOptionActive}
                defaultActive={candidate?.status}
                id={candidate?.id}
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

function SelectStatus({ option, defaultActive, id }) {
  const [open, setOpen] = useState(false);
  const [optionActive, setOptionActive] = useState(defaultActive);
  const SelectStatusRef = useRef();
  const queryClient = useQueryClient();

  useEffect(() => {
    setOptionActive(defaultActive);
  }, [defaultActive]);

  const mutation = useMutation(
    (status) => {
      return makeRequest.put(`/apply/status?id=${id}&status=${status}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["apply"]);
      },
    }
  );

  const handleClickOption = (status) => {
    setOptionActive(status);
    mutation.mutate(status);
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
      {optionActive &&
        option?.map((option) => {
          if (option.id === optionActive)
            return (
              <div
                className={`SelectStatus__toggle  status-${option?.id}`}
                onClick={() => setOpen(!open)}
              >
                <div className={`SelectStatus__toggle__title`}>
                  {option?.icon}
                  <span className="text">{option.name}</span>
                </div>
                <i
                  className={`fa-solid fa-angle-down icon-down ${
                    open ? "open" : ""
                  }`}
                ></i>
              </div>
            );
        })}

      {open && (
        <div className="SelectStatus__menu">
          <div className={`SelectStatus__menu__list`}>
            {option?.map((option, i) => (
              <div
                key={i}
                className={`SelectStatus__menu__list__item  ${
                  optionActive === option?.id ? "active" : ""
                }`}
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
