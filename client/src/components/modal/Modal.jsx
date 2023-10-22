import React, { useEffect, useState } from "react";
import "./modal.scss";

export default function Modal({ children, title, openModal, setOpenModal }) {
  
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  return (
    <div className={`Modal ${openModal ? "active" : ""}`}>
      <div className="Modal__wrapper">
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
