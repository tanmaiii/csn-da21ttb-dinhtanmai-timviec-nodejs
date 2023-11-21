import React, { useEffect, useState } from "react";
import "./tableCandidate.scss";
import Modal from "../../components/modal/Modal";
import DetailCandidate from "../../components/detailCandidate/DetailCandidate";
import moment from "moment";
import { status } from "../../config/data.js";

export default function TableCandidate({ data }) {
  const [openModal, setOpenModal] = useState(false);
  const [candidate, setCandidate] = useState(null);

  const handleClickView = (item) => {
    setCandidate(item);
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
            <div className="table__candidate__body__row">
              <div
                className="table__candidate__body__row__item"
                data-cell={"STT"}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                className="table__candidate__body__row__item"
                data-cell={"Thông tin"}
              >
                <div className="table__candidate__body__row__item__info">
                  <div>
                    <h6>Họ tên: </h6>
                    <span>{item.name}</span>
                  </div>

                  <div>
                    <h6>Email: </h6>
                    <span>{item.email}</span>
                  </div>

                  <div>
                    <h6>SDT: </h6>
                    <span>{item.phone}</span>
                  </div>
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
                    status.id === parseInt(item?.status) && (
                      <div className={`status status-${item?.status}`}>
                        {status?.icon}
                        <span className={item?.status}>{status?.name}</span>
                      </div>
                    )
                )}
              </div>
              <div
                className="table__candidate__body__row__item"
                data-cell={"Chi tiết"}
              >
                <button
                  className="button-eye"
                  onClick={() => handleClickView(item)}
                >
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title={"Thư xin việc"}
        setOpenModal={setOpenModal}
        openModal={openModal}
      >
        <DetailCandidate candidate={candidate} />
      </Modal>
    </>
  );
}
