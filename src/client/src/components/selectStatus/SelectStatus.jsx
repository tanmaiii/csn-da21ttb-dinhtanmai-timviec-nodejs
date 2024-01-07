import React, { useRef, useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";

export default function SelectStatus({ option, defaultActive, id }) {
  const [open, setOpen] = useState(false);
  const [optionActive, setOptionActive] = useState(defaultActive);
  const rowSelectStatusRef = useRef();
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
        queryClient.invalidateQueries(["apply", id]);
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
      if (!rowSelectStatusRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  return (
    <div className="rowSelectStatus" ref={rowSelectStatusRef}>
      {optionActive &&
        option?.map((option, i) => {
          if (option.id === optionActive)
            return (
              <div
                key={i}
                className={`rowSelectStatus__toggle  status-${option?.id}`}
                onClick={() => setOpen(!open)}
              >
                <div className={`rowSelectStatus__toggle__title`}>
                  {option?.icon}
                  <span className="text">{option.name}</span>
                </div>
                <i className={`fa-solid fa-angle-down icon-down ${open ? "open" : ""}`}></i>
              </div>
            );
        })}
      {open && (
        <div className="rowSelectStatus__menu">
          <div className={`rowSelectStatus__menu__list`}>
            {option?.map((option, i) => (
              <div
                key={i}
                className={`rowSelectStatus__menu__list__item  ${
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
