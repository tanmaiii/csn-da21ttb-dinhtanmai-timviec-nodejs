import React from "react";
import loader from "../../assets/svg/loader.svg";
import './loader.scss'

export default function Loader() {
  return (
    <div className="loader">
      <img src={loader} alt="" />
    </div>
  );
}
