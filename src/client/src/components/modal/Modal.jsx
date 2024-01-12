import React, { useEffect, useRef, useState } from "react";
import "./modal.scss";

export default function Modal({ children, title, openModal, setOpenModal }) {
  const modalBodyRef = useRef();

  useEffect(() => {
    if (openModal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!modalBodyRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  return (
    <div className={`Modal ${openModal ? "active" : ""}`}>
      <div ref={modalBodyRef} className="Modal__wrapper">
        <div className="Modal__wrapper__header">
          <h4>{title}</h4>
          <button className="btn_close" onClick={() => setOpenModal(false)}>
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="Modal__wrapper__body">{children}</div>
      </div>
    </div>
  );
}
