import React, { useEffect, useState, useRef } from "react";
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

export default function TableCandidate({ data, listCheck, setListCheck }) {
  const [openModal, setOpenModal] = useState(false);
  const [idApply, setIdApply] = useState(null);

  const handleClickView = (id) => {
    setIdApply(id);
    setOpenModal(true);
  };

  const handleClickAll = () => {
    if (listCheck?.length === data?.length) {
      setListCheck([]);
    } else {
      setListCheck([]);
      data.map((item) => {
        setListCheck((current) => [...current, item?.id]);
      });
    }
  };

  return (
    <>
      <div className="table__candidate">
        <div className="table__candidate__header">
          <label className="table__candidate__header__checkbox" htmlFor="input_candidate_all">
            <input
              id="input_candidate_all"
              onChange={() => handleClickAll()}
              checked={listCheck?.length === data?.length}
              type="checkbox"
              className="table__candidate__header__checkAll"
            />
          </label>
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

function RowTableCandidate({ item, index, handleClickView, setListCheck, listCheck }) {
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
    setActive(listCheck?.includes(item?.id));
  }, [listCheck]);

  const handleClickOption = (id) => {
    if (listCheck.includes(id)) {
      const newFilter = [...listCheck];
      newFilter.splice(listCheck.indexOf(id), 1);
      setListCheck(newFilter);
    } else {
      setListCheck((current) => [...current, id]);
    }
  };

  return (
    <div className={`table__candidate__body__row ${active && "active"}`}>
      <div className="table__candidate__body__row__item" data-cell={"Chọn"}>
        <label
          className="table__candidate__body__row__item__checkbox"
          htmlFor={`item_cadi_${item?.id}`}
        >
          <input
            id={`item_cadi_${item?.id}`}
            type="checkbox"
            onChange={() => handleClickOption(item?.id)}
            checked={listCheck?.includes(item?.id)}
          />
        </label>
      </div>
      <div className="table__candidate__body__row__item" data-cell={"STT"}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="table__candidate__body__row__item" data-cell={"Thông tin"}>
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
      <div className="table__candidate__body__row__item" data-cell={"Ngày nhận"}>
        {moment(item?.createdAt).format("DD/MM/YYYY")}
      </div>
      <span className="table__candidate__body__row__item" data-cell={"Công việc"}>
        {item.nameJob}
      </span>
      <div className="table__candidate__body__row__item" data-cell={"Trạng thái"}>
        <RowSelectStatus option={status} defaultActive={item?.status} id={item?.id} />
      </div>
      <div className="table__candidate__body__row__item" data-cell={"Chi tiết"}>
        <button className="button-eye" onClick={() => handleClickView(item?.id)}>
          <i className="fa-solid fa-eye"></i>
        </button>
      </div>
    </div>
  );
}

function RowSelectStatus({ option, defaultActive, id }) {
  const [open, setOpen] = useState(false);
  const [optionActive, setOptionActive] = useState(defaultActive);
  const rowSelectStatusRef = useRef();
  const queryClient = useQueryClient();

  useEffect(() => {
    setOptionActive(defaultActive);
  }, [defaultActive]);

  const mutation = useMutation(
    (status) => {
      return makeRequest.put(`/apply/status?id=${id}&status=${status}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["apply"]);
      },
    }
  );

  const handleClickOption = (status) => {
    setOptionActive(status);
    mutation.mutate(status);
    setOpen(false);
  };

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!rowSelectStatusRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  return (
    <div className="rowSelectStatus" ref={rowSelectStatusRef}>
      {optionActive &&
        option?.map((option, i) => {
          if (option.id === optionActive)
            return (
              <div
                key={i}
                className={`rowSelectStatus__toggle  status-${option?.id}`}
                onClick={() => setOpen(!open)}
              >
                <div className={`rowSelectStatus__toggle__title`}>
                  {option?.icon}
                  <span className="text">{option.name}</span>
                </div>
                <i className={`fa-solid fa-angle-down icon-down ${open ? "open" : ""}`}></i>
              </div>
            );
        })}
      {open && (
        <div className="rowSelectStatus__menu">
          <div className={`rowSelectStatus__menu__list`}>
            {option?.map((option, i) => (
              <div
                key={i}
                className={`rowSelectStatus__menu__list__item  ${
                  optionActive === option?.id ? "active" : ""
                }`}
                onClick={() => handleClickOption(option?.id)}
              >
                {option?.icon}
                <span>{option?.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
