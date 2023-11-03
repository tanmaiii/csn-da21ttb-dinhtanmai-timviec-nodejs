import React, { useEffect, useState } from "react";
import "./infoUser.scss";
import province from "../../../config/province";
import Select from "../../../components/select/Select";

import { useAuth } from "../../../context/authContext";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../../axios";

export default function InfoUser() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const [err, setErr] = useState();

  const {id} = useParams();

  useEffect(() => {
    setErr();
    const getUser = async () => {
      try {
        const res = await makeRequest.get('/user/owner/' + id);
        setUser(res.data)
      } catch (error) {
        setErr('Lỗi !')
      }
    }
    getUser()
  },[id])

  return (
    <div className="infoUser">
      <div className="infoUser__wrapper">
        <ItemInfo title={"Họ tên"} desc={user?.name || '...'} />
        <ItemInfo
          title={"Ngày sinh :"}
          desc={user?.birthDay || '...'}
          type={"date"}
        />
        <ItemInfo title={"Email :"} desc={user?.email || '...'} />
        <ItemInfo title={"Số điện thoại :"} desc={user?.phone || '...'} />
        <ItemInfo
          title={"Địa chỉ :"}
          select={true}
          options={province}
          desc={user?.address || '...'}
        />
        <ItemInfo
          title={"Liên kết CV (Kết nối với Google Drive) :"}
          desc={user?.cv || '...'}
        />
      </div>
    </div>
  );
}

function ItemInfo({ title, desc, type = "text", select, options }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="personalInformation__wrapper__item">
      <div className="personalInformation__wrapper__item__left">
        <h6>{title}</h6>
        {!edit ? (
          <span>{desc}</span>
        ) : select ? (
          <Select options={options} />
        ) : (
          <input type={type} defaultValue={desc} />
        )}
      </div>
      <div className="personalInformation__wrapper__item__right">
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
