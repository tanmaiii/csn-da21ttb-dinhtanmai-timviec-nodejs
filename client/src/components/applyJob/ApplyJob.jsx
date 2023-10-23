import React from "react";
import "./applyJob.scss";

export default function ApplyJob() {
  return (
    <div className="applyJob">
      <div className="applyJob__header">
        <h6>IT - Thực tập sinh kiểm thử phần mềm.</h6>
      </div>
      <div className="applyJob__body">
        <div className="applyJob__body__item">
          <label>Họ tên: </label>
          <input type="text" defaultValue={"Đinh Tấn Mãi"} />
        </div>
        <div className="applyJob__body__item">
          <label>Email: </label>
          <input type="text" defaultValue={"tanmai@gmail.com"} />
        </div>
        <div className="applyJob__body__item__textarea">
          <label htmlFor="">Thư xin việc</label>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div className="applyJob__body__item__input">
          <h6>Hồ sơ của bạn</h6>
          <div className="applyJob__body__item__input__body" htmlFor="">
            <h6>Kéo thả vào hoặc </h6>
            <label htmlFor="">
              <span>Chọn file</span>
              <input type="file" />
            </label>
          </div>
        </div>
      </div>
      <div className="applyJob__bottom">
        <button>Nộp đơn ngay</button>
      </div>
    </div>
  );
}
