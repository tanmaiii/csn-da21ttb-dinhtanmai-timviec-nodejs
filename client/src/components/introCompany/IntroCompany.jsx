import React, { useState } from "react";
import "./introCompany.scss";
import ReactQuill from "react-quill";

export default function IntroCompany() {
  const [edit, setEdit] = useState(false);

  return (
    <div className="introCompany">
      <div className="introCompany__wrapper">
        <div className="introCompany__wrapper__header">
          <h4>Về công ty</h4>
          <div className="introCompany__wrapper__header__edit">
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
        <div className="introCompany__wrapper__body">
          {!edit ? (
            <div className="introCompany__wrapper__body__content">
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
            <div className="introCompany__wrapper__body__edit">
              <ReactQuill theme="snow" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
