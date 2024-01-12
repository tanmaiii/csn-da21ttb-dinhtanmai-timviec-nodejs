import React, { useRef, useEffect } from "react";
import "./modalAvatar.scss";
import { apiImage } from "../../axios";
import img from '../../assets/images/avatar.png';

export default function ModalAvatar({ openModal, setOpenModal, avatarPic }) {
  const modalAvatarRef = useRef();

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!modalAvatarRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  useEffect(() => {
    if (openModal === true) {
      document.body.style.overflow = "hidden";
    }
    if (openModal === false) {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

  return (
    <div className={`modal__avatar ${openModal ? "active" : ""}`}>
      <div ref={modalAvatarRef} className="modal__avatar__wrapper">
        <div className="modal__avatar__wrapper__image">
          <img src={avatarPic} alt={avatarPic} onError={(e) => (e.target.src = img)} />
        </div>
        <button onClick={() => setOpenModal(false)} className="modal__avatar__close">
          <i className="fa fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}
