import React, { useEffect } from "react";
import "./detailCompany.scss";
import img from "../../assets/images/FPT_logo.png";
import ItemJob from "../../components/itemJob/ItemJob";

import jobs from "../../config/jobs";

export default function DetailCompany() {
  
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="detailCompany">
      <div className="container">
        <div className="detailCompany__wrapper">
          <div className="detailCompany__wrapper__header">
            <div className="detailCompany__wrapper__header__main">
              <div className="detailCompany__wrapper__header__main__image">
                <img src={img} alt="" />
              </div>
              <div className="detailCompany__wrapper__header__main__text">
                <h4 className="detailCompany__wrapper__header__main__text__name">
                  FPT Telecom
                </h4>
                <div className="detailCompany__wrapper__header__main__text__address">
                  <i class="fa-solid fa-location-dot"></i>
                  <span>TP.Hồ Chí Minh</span>
                </div>
                <div className="detailCompany__wrapper__header__main__text__scale">
                  <i class="fa-solid fa-users"></i>
                  <span>5.000 - 10.00 nhân viên</span>
                </div>
                <div className="detailCompany__wrapper__header__main__text__web">
                  <i class="fa-solid fa-link"></i>
                  <span>fpttelecom.vn</span>
                </div>
              </div>
            </div>
            <div className="detailCompany__wrapper__header__button">
              <span>123 lượt theo dõi</span>
              <button>Theo dõi</button>
            </div>
          </div>
          <div className="detailCompany__wrapper__body row">
            <div className=" col pc-9">
              <div className="detailCompany__wrapper__body__left">
                <h6 className="detailCompany__wrapper__body__left__header">
                  Giới thiệu về công ty
                </h6>
                <div className="detailCompany__wrapper__body__left__intro">
                  <p>
                    Được thành lập ngày 31/01/1997, Công ty Cổ phần Viễn thông
                    FPT (FPT Telecom) khởi đầu từ Trung tâm Dịch vụ Trực tuyến
                    với 4 thành viên sáng lập cùng sản phẩm mạng Intranet đầu
                    tiên của Việt Nam mang tên “Trí tuệ Việt Nam – TTVN”. Sau 21
                    năm hoạt động, FPT Telecom đã trở thành một trong những nhà
                    cung cấp dịch vụ viễn thông và Internet hàng đầu khu vực với
                    gần 14 000 nhân viên, 2 công ty thành viên, 59 chi nhánh
                    trong và ngoài nước. Hiện nay, FPT Telecom đang cung cấp các
                    sản phẩm, dịch vụ chính bao gồm:
                  </p>
                  <p>- Dịch vụ Internet</p>
                  <p>
                    - Kênh thuê riêng, Tên miền, Email, Lưu trữ web, Trung tâm
                    dữ liệu
                  </p>
                  <p>
                    - Các dịch vụ giá trị gia tăng trên Internet: Truyền hình
                    internet (FPT play HD), Điện thoại cố định (VoIP), Giám sát
                    từ xa(IP Camera), Chứng thực chữ ký số (CA), Điện toán đám
                    mây (Cloud computing),...
                  </p>
                  <p>
                    Với phương châm “Mọi dịch vụ trên một kết nối”, FPT Telecom
                    luôn không ngừng nghiên cứu và triển khai tích hợp ngày càng
                    nhiều các dịch vụ giá trị gia tăng trên cùng một đường
                    truyền Internet nhằm đem lại lợi ích tối đa cho khách hàng
                    sử dụng. Đồng thời, việc đẩy mạnh hợp tác với các đối tác
                    viễn thông lớn trên thế giới, xây dựng các tuyến cáp quang
                    quốc tế là những hướng đi được triển khai mạnh mẽ để đưa các
                    dịch vụ tiếp cận với thị trường toàn cầu, nâng cao hơn nữa
                    vị thế của FPT Telecom nói riêng và các nhà cung cấp dịch vụ
                    viễn thông Việt Nam nói chung.
                  </p>

                  <p>Thông tin chi tiết tham khảo tại website: www.fpt.vn!</p>
                </div>
                <h6 className="detailCompany__wrapper__body__left__header">
                  Công việc đang tuyển (2 việc làm).
                </h6>
                <div className="detailCompany__wrapper__body__left__list-job">
                  {jobs.slice(0, 4).map((job) => (
                    <ItemJob job={job} className={"col pc-12"} />
                  ))}
                </div>
              </div>
            </div>
            <div className="col pc-3">
              <div className="detailCompany__wrapper__body__right">
                <h6>Website</h6>
                <div className="detailCompany__wrapper__body__right__web">
                  <a href="https://www.facebook.com/">
                    https://www.facebook.com/
                  </a>
                </div>
                <h6>Theo dõi</h6>
                <div className="detailCompany__wrapper__body__right__list">
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
