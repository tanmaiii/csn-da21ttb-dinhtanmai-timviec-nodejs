import React from "react";
import "./itemCandidate.scss";

export default function ItemCandidate() {
  return (
    <div className="itemCandidate">
      <div className="itemCandidate__wrapper row">
        <div className="col pc-3">
          <div className="itemCandidate__wrapper__info">
            <div className="name">Đinh tấn mãi</div>
            <div className="email">Đinh tấn mãi</div>
            <div className="sdt">Đinh tấn mãi</div>
          </div>
        </div>
        <div className="col pc-3"></div>
        <div className="col pc-3"></div>
        <div className="col pc-3"></div>
      </div>
    </div>
  );
}
