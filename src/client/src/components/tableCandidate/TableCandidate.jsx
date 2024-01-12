import React, { useEffect, useState, useRef } from "react";
import img from "../../assets/images/avatar.png";
import "./tableCandidate.scss";
import Modal from "../../components/modal/Modal";
import DetailCandidate from "../../components/detailCandidate/DetailCandidate";
import moment from "moment";
import { statusCompany } from "../../config/data.js";
import { apiImage } from "../../axios.js";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SelectStatus from "../selectStatus/SelectStatus.jsx";

export default function TableCandidate({ data, listCheck, setListCheck }) {
  const [openModal, setOpenModal] = useState(false);
  const [idApply, setIdApply] = useState(null);

  const handleClickView = (id) => {
    setIdApply(id);
    setOpenModal(true);
  };

  return (
    <>
      <div className="table__candidate">
        <div className="table__candidate__header">
          <span></span>
          <span>STT</span>
          <span>Thông tin</span>
          <span>Nhận vào</span>
          <span>Công việc</span>
          <span>Trạng thái</span>
          <span></span>
        </div>
        <div className="table__candidate__checkAll"></div>
        <div className="table__candidate__body">
          {data?.map((item, i) => (
            <RowTableCandidate
              index={i}
              key={i}
              item={item}
              handleClickView={handleClickView}
              listCheck={listCheck}
              setListCheck={setListCheck}
            />
          ))}
        </div>
      </div>
      <Modal title={"Thư xin việc"} setOpenModal={setOpenModal} openModal={openModal}>
        <DetailCandidate idApply={idApply} />
      </Modal>
    </>
  );
}

function RowTableCandidate({ item, index, handleClickView, setListCheck, listCheck = [] }) {
  const [statusId, setStatusId] = useState();
  const [active, setActive] = useState(false);

  const getStatus = async () => {
    try {
      const res = await makeRequest.get(`apply/status?id=${item?.id}`);
      setStatusId(res.data);
    } catch (error) {}
  };

  const { isLoading, error, data } = useQuery(["apply", item?.id], () => {
    return getStatus();
  });

  useEffect(() => {
    setActive(listCheck?.some((itemSelect) => itemSelect.id === item.id));
  }, [listCheck]);

  const handleClickOption = (id, email, cv) => {
    let isIdInList = listCheck?.some((item) => item.id === id);

    if (isIdInList) {
      // Đối tượng tồn tại, xóa nó khỏi mảng
      setListCheck((currentList) => currentList.filter((item) => item.id !== id));
    } else {
      setListCheck((currentList) => [
        ...currentList,
        {
          id: id,
          email: email,
          cv: cv,
        },
      ]);
    }
  };

  return (
    <div
      className={`table__candidate__body__row ${active && "active"} ${
        item?.status === 1 ? "notSeen" : ""
      }`}
    >
      <div className="table__candidate__body__row__item" data-cell={"Chọn"}>
        <label
          className="table__candidate__body__row__item__checkbox"
          htmlFor={`item_cadi_${item?.id}`}
        >
          <input
            id={`item_cadi_${item?.id}`}
            type="checkbox"
            onChange={() => handleClickOption(item?.id, item?.email, item?.cv)}
            checked={listCheck?.some((itemSelect) => itemSelect.id === item.id)}
          />
        </label>
      </div>
      <div className="table__candidate__body__row__item" data-cell={"STT"}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="table__candidate__body__row__item" data-cell={"Thông tin"}>
        <Link to={`/nguoi-dung/${item?.idUser}`}>
          <div className="table__candidate__body__row__item__info">
            <img
              className="table__candidate__body__row__item__info__image"
              src={item?.avatarPic ? apiImage + item?.avatarPic : img}
              onError={(e) => (e.target.src = img)}
            />
            <span>{item?.name}</span>
          </div>
        </Link>
      </div>
      <div className="table__candidate__body__row__item" data-cell={"Ngày nhận"}>
        {moment(item?.createdAt).format("DD/MM/YYYY")}
      </div>
      <span className="table__candidate__body__row__item name__job" data-cell={"Công việc"}>
        {item.nameJob}
      </span>
      <div className="table__candidate__body__row__item" data-cell={"Trạng thái"}>
        <SelectStatus option={statusCompany} defaultActive={item?.status} id={item?.id} />
      </div>
      <div className="table__candidate__body__row__item" data-cell={"Chi tiết"}>
        <button className="button-eye" onClick={() => handleClickView(item?.id)}>
          <i className="fa-solid fa-eye"></i>
        </button>
      </div>
    </div>
  );
}
