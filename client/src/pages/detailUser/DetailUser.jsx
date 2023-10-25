import React, { useEffect, useState } from "react";
import "./detailUser.scss";
import img from "../../assets/images/FPT_logo.png";
import ItemJob from "../../components/itemJob/ItemJob";
import ItemCompany from "../../components/itemCompany/ItemCompany";
import { Link } from "react-router-dom";

import jobs from "../../config/jobs";
import companies from "../../config/companies";

export default function DetailUser() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="detailUser">
      <div className="container">
        <div className="detailUser__wrapper">
          <div className="detailUser__wrapper__header">
            <div className="detailUser__wrapper__header__main">
              <div className="detailUser__wrapper__header__main__image">
                <img src={img} alt="" />
              </div>
              <div className="detailUser__wrapper__header__main__text">
                <h4 className="detailUser__wrapper__header__main__text__name">
                  Đinh Tấn Mãi
                </h4>
                <div className="detailUser__wrapper__header__main__text__date">
                  <i class="fa-solid fa-calendar-days"></i>
                  <span>03/10/2003</span>
                </div>
              </div>
            </div>
            <div className="detailUser__wrapper__header__button">
              <button>Chỉnh sửa</button>
            </div>
          </div>
          <div className="detailUser__wrapper__body row">
            <div className=" col pc-9 t-9 m-12">
              <div className="detailUser__wrapper__body__left">
                <div className="detailUser__wrapper__body__left__control">
                  <button
                    onClick={() => setActive(1)}
                    className={`${active === 1 && "active"}`}
                  >
                    <span>Thông tin cá nhân</span>
                  </button>
                  <button
                    onClick={() => setActive(2)}
                    className={`${active === 2 && "active"}`}
                  >
                    <span>Đã ứng tuyển 0</span>
                  </button>
                  <button
                    onClick={() => setActive(3)}
                    className={`${active === 3 && "active"}`}
                  >
                    <span>Công việc đã lưu 0</span>
                  </button>
                  <button
                    onClick={() => setActive(4)}
                    className={`${active === 4 && "active"}`}
                  >
                    <span>Công ty đã lưu 0</span>
                  </button>
                </div>
                <div className="detailUser__wrapper__body__left__content">
                  {active === 1 && <InfoUser />}
                  {active === 2 && <AppliedJobs />}
                  {active === 3 && (
                    <div className="jobsSave">
                      {jobs.map((job, i) => (
                        <ItemJob job={job} key={i} className={"col pc-12"} />
                      ))}
                    </div>
                  )}
                  {active === 4 && (
                    <div className="companiesSave row">
                      {companies.map((company, i) => (
                        <ItemCompany
                          company={company}
                          key={i}
                          className={"col pc-6"}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col pc-3 t-3 m-0">
              <div className="detailUser__wrapper__body__right">
                <h6>Website</h6>
                <div className="detailUser__wrapper__body__right__web">
                  <a href="https://www.facebook.com/">
                    https://www.facebook.com/
                  </a>
                </div>
                <h6>Theo dõi</h6>
                <div className="detailUser__wrapper__body__right__list">
                  <a href="">
                    <i class="fa-brands fa-facebook"></i>
                  </a>
                  <a href="">
                    <i class="fa-solid fa-envelope"></i>
                  </a>
                  <a href="">
                    <i class="fa-brands fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppliedJobs({ job }) {
  return (
    <div className="appliedJobs">
      <div className="appliedJobs__wrapper">
        {jobs.map((job, i) => (
          <div className="appliedJobs__wrapper__item">
            <div className="col pc-9 t-9 m-7">
              <div className="appliedJobs__wrapper__item__left ">
                <h4 className="appliedJobs__wrapper__item__left__name">
                  {job?.name}
                </h4>
                <h5 className="appliedJobs__wrapper__item__left__company">
                  {job?.company}
                </h5>
                <div className="appliedJobs__wrapper__item__left__address">
                  <i class="fa-solid fa-location-dot"></i>
                  <span>{job?.address}</span>
                </div>
                <div className="appliedJobs__wrapper__item__left__wage">
                  <i class="fa-solid fa-dollar-sign"></i>
                  <span>{job?.wage}</span>
                </div>
                <p className="appliedJobs__wrapper__item__left__workingForm">
                  {job?.workingForm}
                </p>
              </div>
            </div>
            <div className="col pc-3 t-3 m-4">
              <div className="appliedJobs__wrapper__item__right">
                <span>Trạng thái</span>
                <button>Đã xem hồ sơ</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoUser() {
  return (
    <div className="infoUser">
      <div className="infoUser__wrapper">
        <ItemInfo title={"Họ tên"} desc={"Đinh Tấn Mãi"} />
        <ItemInfo title={"Ngày sinh :"} desc={"03/10/2003"} type={"date"} />
        <ItemInfo title={"Email :"} desc={"tanmai833@gmail.com"} />
        <ItemInfo title={"Số điện thoại :"} desc={"781263612"} />
        <ItemInfo
          title={"Liên kết CV (Kết nối với Google Drive) :"}
          desc={
            "https://drive.google.com/file/d/12YACDCDYGxxk-hMVwJxzD1s7HvwvZNAm/view?usp=sharing"
          }
        />
      </div>
    </div>
  );
}

function ItemInfo({ title, desc, type = "text" }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="personalInformation__wrapper__item">
      <div className="personalInformation__wrapper__item__left">
        <h6>{title}</h6>
        {!edit ? (
          <span>{desc}</span>
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
