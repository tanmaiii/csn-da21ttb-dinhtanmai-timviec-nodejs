import React, { useState, useRef, useEffect } from "react";
import "./infoCompany.scss";
import SearchProvince from "../../components/searchProvince/SearchProvince";
import Select from "../../components/select/Select";
import scale from "../../config/scale";
import province from "../../config/province";

export default function InfoCompany() {
  return (
    <div className="infoCompany">
      <div className="infoCompany__wrapper">
        <div className="infoCompany__wrapper__header"></div>
        <div className="infoCompany__wrapper__body">
          <ItemInfoCompany title={"Tên công ty"} desc={"FPT Telecom"} />
          <ItemInfoCompany title={"Tên người đại diện"} desc={"tan mai"} />
          <ItemInfoCompany title={"Email"} desc={"tanmai833@gmail.com"} />
          <ItemInfoCompany title={"Điện thoại"} desc={"03234123123"} />
          <ItemInfoCompany title={"Email"} desc={"tanmai833@gmail.com"} />
          <ItemInfoCompany
            title={"Địa chỉ"}
            desc={"Tra vinh"}
            select={true}
            options={province}
          />
          <ItemInfoCompany
            title={"Quy mô"}
            desc={"5000 - 1000 nhân viên"}
            select={true}
            options={scale}
          />
        </div>
      </div>
    </div>
  );
}

function ItemInfoCompany({ title, desc, type = "text", select, options }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="infoCompany__wrapper__body__item">
      <div className="infoCompany__wrapper__body__item__left">
        <h6>{title}</h6>
        {!edit ? (
          <span>{desc}</span>
        ) : select ? (
          <Select options={options} />
        ) : (
          <input type={type} defaultValue={desc} />
        )}
      </div>
      <div className="infoCompany__wrapper__body__item__right">
        {!edit ? (
          <button className="btn-edit" onClick={() => setEdit(true)}>
            Thay đổi
          </button>
        ) : (
          <>
            <button className="btn-save" onClick={() => setEdit(false)}>
              Lưu
            </button>
            <button className="btn-cancel" onClick={() => setEdit(false)}>
              Hủy
            </button>
          </>
        )}
      </div>
    </div>
  );
}
