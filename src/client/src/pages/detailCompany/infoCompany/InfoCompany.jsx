import React, { useState, useRef, useEffect } from "react";
import "./infoCompany.scss";
import Select from "../../../components/select/Select";
import scale from "../../../config/scale";
import province from "../../../config/province";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../../axios";

export default function InfoCompany() {
  const [company, setCompany] = useState();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getCompany = async () => {
      try {
        const res = await makeRequest.get("/company/owner/" + id);
        setCompany(res.data);
      } catch (err) {
        setErr("id không hợp lệ");
      }
    };
    getCompany();
  }, []);

  return (
    <div className="infoCompany">
      <div className="infoCompany__wrapper">
        <div className="infoCompany__wrapper__header"></div>
        <div className="infoCompany__wrapper__body">
          <ItemInfoCompany title={"Tên công ty"} desc={company?.nameCompany || "..."} />
          <ItemInfoCompany title={"Tên người đại diện"} desc={company?.nameAdmin || "..."} />
          <ItemInfoCompany title={"Email"} desc={company?.email || "..."} />
          <ItemInfoCompany title={"Điện thoại"} desc={company?.phone || "..."} />
          <ItemInfoCompany title={"Web"} desc={company?.web || "..."}/>
          <ItemInfoCompany
            title={"Địa chỉ"}
            desc={company?.address || "..."}
            select={true}
            options={province}
          />
          <ItemInfoCompany
            title={"Quy mô"}
            desc={company?.scale || "..."}
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
