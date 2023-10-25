import React, { useState, useRef, useEffect } from "react";
import "./infoCompany.scss";
import SearchProvince from "../../components/searchProvince/SearchProvince";
import scale from "../../config/scale";

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
          <ItemInfoAddressCompany title={"Địa chỉ"} desc={"Tra vinh"} />
          <ItemInfoScaleCompany
            title={"Quy mô"}
            desc={"5000 - 1000 nhân viên"}
          />
        </div>
      </div>
    </div>
  );
}

function ItemInfoScaleCompany({ title, desc, type = "text" }) {
  const [edit, setEdit] = useState(false);
  const [openScale, setOpenScale] = useState(false);
  const [scaleActive, setScaleActive] = useState("Số lượng");
  const listScaleRef = useRef();

  useEffect(() => {
    let handleMousedown = (e) => {
      if (!listScaleRef.current?.contains(e.target)) {
        setOpenScale(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => {
      document.removeEventListener("mousedown", handleMousedown);
    };
  });

  return (
    <div className="infoCompany__wrapper__body__item">
      <div className="infoCompany__wrapper__body__item__left">
        <h6>{title}</h6>
        {!edit ? (
          <span>{desc}</span>
        ) : (
          <div
            className="infoCompany__wrapper__body__item__left__scale"
            ref={listScaleRef}
          >
            <div
              className="infoCompany__wrapper__body__item__left__scale__header"
              onClick={() => setOpenScale(!openScale)}
            >
              <span>{scaleActive} nhân viên</span>
              <i class="fa-solid fa-sort-down"></i>
            </div>
            {openScale && (
              <div className="infoCompany__wrapper__body__item__left__scale__list">
                {scale.map((item, i) => (
                  <span
                    key={i}
                    onClick={() => setScaleActive(item.name)}
                    className={`${scaleActive === item.name && "active"}`}
                  >
                    {item.name} nhân viên
                  </span>
                ))}
              </div>
            )}
          </div>
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

function ItemInfoAddressCompany({ title, desc, type = "text" }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="infoCompany__wrapper__body__item">
      <div className="infoCompany__wrapper__body__item__left">
        <h6>{title}</h6>
        {!edit ? (
          <span>{desc}</span>
        ) : (
          <div className="infoCompany__wrapper__body__item__left__search__province">
            <SearchProvince />
          </div>
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

function ItemInfoCompany({ title, desc, type = "text" }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="infoCompany__wrapper__body__item">
      <div className="infoCompany__wrapper__body__item__left">
        <h6>{title}</h6>
        {!edit ? (
          <span>{desc}</span>
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
