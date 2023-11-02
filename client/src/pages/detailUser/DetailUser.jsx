import React, { useEffect, useRef, useState } from "react";
import "./detailUser.scss";
import avt from "../../assets/images/avatar.png";

import ItemJob from "../../components/itemJob/ItemJob";
import ItemCompany from "../../components/itemCompany/ItemCompany";
import ReactQuill from "react-quill";
import { useSearchParams } from "react-router-dom";

import jobs from "../../config/jobs";
import companies from "../../config/companies";
import { useAuth } from "../../context/authContext";

export default function DetailUser() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [openControlMb, setOpenControlMb] = useState(false);
  const controlMbRef = useRef();
  const { currentUser } = useAuth();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const handleMousedown = (e) => {
      if (!controlMbRef.current.contains(e.target)) {
        setOpenControlMb(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  });

  useEffect(() => {
    setOpenControlMb(false);
  }, [searchParams]);

  

  return (
    <div className="detailUser">
      <div className="container">
        <div className="detailUser__wrapper">
          <div className="detailUser__wrapper__header">
            <div className="detailUser__wrapper__header__main">
              <div className="detailUser__wrapper__header__main__image">
                <img src={avt} alt="" />
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
                    onClick={() => setSearchParams()}
                    className={`${
                      searchParams.get("tag") === null && "active"
                    }`}
                  >
                    <span>Giới thiệu</span>
                  </button>
                  <button
                    onClick={() => setSearchParams({ ["tag"]: "info" })}
                    className={`${
                      searchParams.get("tag") === "info" && "active"
                    }`}
                  >
                    <span>Thông tin</span>
                  </button>
                  <button
                    onClick={() => setSearchParams({ ["tag"]: "apply" })}
                    className={`${
                      searchParams.get("tag") === "apply" && "active"
                    }`}
                  >
                    <span>Ứng tuyển</span>
                  </button>
                  <button
                    onClick={() => setSearchParams({ ["tag"]: "jobs" })}
                    className={`${
                      searchParams.get("tag") === "jobs" && "active"
                    }`}
                  >
                    <span>Công việc</span>
                  </button>
                  <button
                    onClick={() => setSearchParams({ ["tag"]: "companies" })}
                    className={`${
                      searchParams.get("tag") === "companies" && "active"
                    }`}
                  >
                    <span>Công ty</span>
                  </button>
                </div>

                <div className="detailUser__wrapper__body__left__control-mobile">
                  <button
                    onClick={() => setSearchParams()}
                    className={`${
                      searchParams.get("tag") === null && "active"
                    }`}
                  >
                    <span>Giới thiệu</span>
                  </button>
                  <button
                    onClick={() => setSearchParams({ ["tag"]: "info" })}
                    className={`${
                      searchParams.get("tag") === "info" && "active"
                    }`}
                  >
                    <span>Thông tin</span>
                  </button>

                  <div className="button__more" ref={controlMbRef}>
                    <button
                      className="button__more__toggle"
                      onClick={() => setOpenControlMb(!openControlMb)}
                    >
                      <span>Thêm</span>
                      <i class="fa-solid fa-angle-down"></i>
                    </button>
                    {openControlMb && (
                      <div className="button__more__dropdown">
                        <button
                          onClick={() => setSearchParams({ ["tag"]: "apply" })}
                          className={`${
                            searchParams.get("tag") === "apply" && "active"
                          }`}
                        >
                          <span>Ứng tuyển</span>
                        </button>
                        <button
                          onClick={() => setSearchParams({ ["tag"]: "jobs" })}
                          className={`${
                            searchParams.get("tag") === "jobs" && "active"
                          }`}
                        >
                          <span>Công việc</span>
                        </button>
                        <button
                          onClick={() =>
                            setSearchParams({ ["tag"]: "companies" })
                          }
                          className={`${
                            searchParams.get("tag") === "companies" && "active"
                          }`}
                        >
                          <span>Công ty</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="detailUser__wrapper__body__left__content">
                  {searchParams.get("tag") === null && <IntroUser />}
                  {searchParams.get("tag") === "info" && <InfoUser />}
                  {searchParams.get("tag") === "apply" && <AppliedJobs />}
                  {searchParams.get("tag") === "jobs" && (
                    <div className="jobsSave row">
                      {jobs.map((job, i) => (
                        <ItemJob job={job} key={i} className={"col pc-12"} />
                      ))}
                    </div>
                  )}
                  {searchParams.get("tag") === "companies" && (
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

function IntroUser() {
  const [edit, setEdit] = useState(false);

  return (
    <div className="introUser">
      <div className="introUser__wrapper">
        <div className="introUser__wrapper__header">
          <h4>Giới thiệu </h4>
          <div className="introUser__wrapper__header__edit">
            {!edit ? (
              <button className="btn-edit" onClick={() => setEdit(true)}>
                <i class="fa-solid fa-pen-to-square"></i>
                <span>Chỉnh sửa</span>
              </button>
            ) : (
              <>
                <button className="btn-save" onClick={() => setEdit(false)}>
                  <i class="fa-solid fa-pen-to-square"></i>
                  <span>Lưu</span>
                </button>
                <button className="btn-cancel" onClick={() => setEdit(false)}>
                  <i class="fa-solid fa-pen-to-square"></i>
                  <span>Hủy</span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="introUser__wrapper__body">
          {!edit ? (
            <div className="introUser__wrapper__body__content">
              <p>
                Được thành lập ngày 31/01/1997, Công ty Cổ phần Viễn thông FPT
                (FPT Telecom) khởi đầu từ Trung tâm Dịch vụ Trực tuyến với 4
                thành viên sáng lập cùng sản phẩm mạng Intranet đầu tiên của
                Việt Nam mang tên “Trí tuệ Việt Nam – TTVN”. Sau 21 năm hoạt
                động, FPT Telecom đã trở thành một trong những nhà cung cấp dịch
                vụ viễn thông và Internet hàng đầu khu vực với gần 14 000 nhân
                viên, 2 công ty thành viên, 59 chi nhánh trong và ngoài nước.
                Hiện nay, FPT Telecom đang cung cấp các sản phẩm, dịch vụ chính
                bao gồm:
              </p>

              <p>- Dịch vụ Internet</p>
              <p>
                - Kênh thuê riêng, Tên miền, Email, Lưu trữ web, Trung tâm dữ
                liệu
              </p>
              <p>
                - Các dịch vụ giá trị gia tăng trên Internet: Truyền hình
                internet (FPT play HD), Điện thoại cố định (VoIP), Giám sát từ
                xa(IP Camera), Chứng thực chữ ký số (CA), Điện toán đám mây
                (Cloud computing),...
              </p>
              <p>
                Với phương châm “Mọi dịch vụ trên một kết nối”, FPT Telecom luôn
                không ngừng nghiên cứu và triển khai tích hợp ngày càng nhiều
                các dịch vụ giá trị gia tăng trên cùng một đường truyền Internet
                nhằm đem lại lợi ích tối đa cho khách hàng sử dụng. Đồng thời,
                việc đẩy mạnh hợp tác với các đối tác viễn thông lớn trên thế
                giới, xây dựng các tuyến cáp quang quốc tế là những hướng đi
                được triển khai mạnh mẽ để đưa các dịch vụ tiếp cận với thị
                trường toàn cầu, nâng cao hơn nữa vị thế của FPT Telecom nói
                riêng và các nhà cung cấp dịch vụ viễn thông Việt Nam nói chung.
              </p>

              <p>Thông tin chi tiết tham khảo tại website: www.fpt.vn!</p>
            </div>
          ) : (
            <div className="introUser__wrapper__body__edit">
              <ReactQuill theme="snow" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
