import React, { useEffect, useState } from "react";
import img from "../../assets/images/avatar.png";
import "./tableCandidate.scss";
import Modal from "../../components/modal/Modal";
import DetailCandidate from "../../components/detailCandidate/DetailCandidate";
import moment from "moment";
import { status } from "../../config/data.js";
import { apiImage } from "../../axios.js";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios.js";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function TableCandidate({ data }) {
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
          <span>STT</span>
          <span>Thông tin</span>
          <span>Nhận vào</span>
          <span>Công việc</span>
          <span>Trạng thái</span>
          <span></span>
        </div>
        <div className="table__candidate__body">
          {data?.map((item, i) => (
            <RowTableCandidate
              index={i}
              key={i}
              item={item}
              handleClickView={handleClickView}
            />
          ))}
        </div>
      </div>
      <Modal
        title={"Thư xin việc"}
        setOpenModal={setOpenModal}
        openModal={openModal}
      >
        <DetailCandidate idApply={idApply} />
      </Modal>
    </>
  );
}

function RowTableCandidate({ item, index, handleClickView }) {
  const [statusId, setStatusId] = useState();

  const getStatus = async () => {
    try {
      const res = await makeRequest.get(`apply/status?id=${item?.id}`);
      setStatusId(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getStatus();
  }, []);

  const { isLoading, error, data } = useQuery(["apply", item.id], () => {
    console.log("load lai");
    return getStatus();
  });

  return (
    <div className="table__candidate__body__row">
      <div className="table__candidate__body__row__item" data-cell={"STT"}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <div
        className="table__candidate__body__row__item"
        data-cell={"Thông tin"}
      >
        <div className="table__candidate__body__row__item__info">
          <Link to={`/nguoi-dung/${item?.idUser}`}>
            <img
              className="table__candidate__body__row__item__info__image"
              src={apiImage + item?.avatarPic || img}
            />
          </Link>
          <span>{item?.name}</span>
        </div>
      </div>
      <div
        className="table__candidate__body__row__item"
        data-cell={"Ngày nhận"}
      >
        {moment(item?.createdAt).format("DD/MM/YYYY")}
      </div>
      <span
        className="table__candidate__body__row__item"
        data-cell={"Công việc"}
      >
        {item.nameJob}
      </span>
      <div
        className="table__candidate__body__row__item"
        data-cell={"Trạng thái"}
      >
        {status.map(
          (status) =>
            status.id === parseInt(statusId) && (
              <div className={`status status-${status.id}`}>
                {status?.icon}
                <span className={status.id}>{status?.name}</span>
              </div>
            )
        )}
      </div>
      <div className="table__candidate__body__row__item" data-cell={"Chi tiết"}>
        <button
          className="button-eye"
          onClick={() => handleClickView(item?.id)}
        >
          <i class="fa-solid fa-eye"></i>
        </button>
      </div>
    </div>
  );
}
