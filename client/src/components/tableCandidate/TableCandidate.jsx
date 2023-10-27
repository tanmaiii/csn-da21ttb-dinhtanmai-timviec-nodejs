import React, { useEffect, useState } from "react";
import "./tableCandidate.scss";
import Modal from '../../components/modal/Modal'
const renderHead = (item, index) => <th key={index}>{item}</th>;

const headData = [
  "",
  "Thông tin cá nhân",
  "Ngày nộp",
  "Công việc",
  "Trạng thái",
  "",
];

export default function TableCandidate(props) {
  const [openModal, setOpenModal] = useState(false)

  const initDataShow =
    props.data && props.limit
      ? props.data.slice(0, Number(props.limit))
      : props.data;

  const [dataShow, setDataShow] = useState(initDataShow);

  useEffect(() => {
    setDataShow(
      props.data.slice(
        Number(props.paginate) * Number(props.limit),
        Number(props.paginate + 1) * Number(props.limit)
      )
    );
  }, [props.paginate]);

  return (
    <>
      <div className="table">
        <table>
          <thead>
            <tr>{headData.map((item, index) => renderHead(item, index))}</tr>
          </thead>
          <tbody>
            {dataShow.map((item, index) => (
              <tr key={index}>
                <td data-cell={"Stt"}>{item.id}</td>
                <td data-cell="Thông tin cá nhân">
                  <div className="td_gr">
                    <div className="td-item">
                      <h6>Họ tên: </h6>
                      <span>{item.name}</span>
                    </div>
                    <div className="td-item">
                      <h6>Email: </h6>
                      <span>{item.email}</span>
                    </div>
                    <div className="td-item">
                      <h6>Sđt: </h6>
                      <span>{item.phone}</span>
                    </div>
                  </div>
                </td>
                <td data-cell={"Ngày nộp"}>{item.date}</td>
                <td data-cell={"Công việc"}>{item.nameJob}</td>
                <td data-cell={"Trạng thái"}>{item.status}</td>
                <td>
                  <button onClick={() => setOpenModal(true)}>
                    <i class="fa-regular fa-eye"></i>
                    <span>Xem</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal title={"Thư xin việc"} setOpenModal={setOpenModal} openModal={openModal}>

      </Modal>
    </>
  );
}
