import React, { useEffect, useState } from "react";
import "./detailJob.scss";
import img from "../../assets/images/Google__Logo.png";
import ListJobCol from "../../components/listJobCol/ListJobCol";
import Modal from "../../components/modal/Modal";
import ApplyJob from "../../components/applyJob/ApplyJob";
import Loader from "../../components/loader/Loader";

export default function DetailJob({job}) {
  const [openModal, setOpenModal] = useState(false);
  const [save, setSave] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // if(!job){
  //   return <Loader/>
  // }

  return (
    <>
      <div className="detailJob">
        <div className="container">
          <div className="detailJob__wrapper row">
            <div className="detailJob__wrapper__main col pc-9">
              <div className="detailJob__wrapper__main__image">
                <img src={img} alt="" />
                <div className="detailJob__wrapper__main__image__name">
                  <h4>IT - Thực tập sinh kiểm thử phần mềm.</h4>
                  <span>Microsoft Việt Nam</span>
                </div>
              </div>
              <div className="detailJob__wrapper__main__button">
                <button
                  className="btn_apply"
                  onClick={() => setOpenModal(true)}
                >
                  Ứng tuyển
                </button>
                <button className="btn_save" onClick={() => setSave(!save)}>
                  {save ? (
                    <>
                      <i class="fa-solid fa-heart"></i>
                      <span>Đã Lưu</span>
                    </>
                  ) : (
                    <>
                      <i class="fa-regular fa-heart"></i>
                      <span>Lưu</span>
                    </>
                  )}
                </button>
              </div>
              <div className={`detailJob__wrapper__main__important`}>
                <div className="detailJob__wrapper__main__important__col col pc-6">
                  <div className="item">
                    <div className="header">
                      <i class="fa-solid fa-location-dot"></i>
                      <h4>Địa điểm</h4>
                    </div>
                    <div className="content">
                      <span>IT - Phần mềm</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="header">
                      <i class="fa-solid fa-briefcase"></i>
                      <h4>Ngành nghề</h4>
                    </div>
                    <div className="content">
                      <span>IT - Phần mềm</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="header">
                      <i class="fa-solid fa-dollar-sign"></i>
                      <h4>Lương</h4>
                    </div>
                    <div className="content">
                      <span>20.000.000 - 30.000.000 VNĐ</span>
                    </div>
                  </div>
                </div>
                <div className="detailJob__wrapper__main__important__col col pc-6">
                  <div className="item">
                    <div className="header">
                      <i class="fa-solid fa-suitcase"></i>
                      <h4>Kinh nghiệm</h4>
                    </div>
                    <div className="content">
                      <span>IT - Phần mềm</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="header">
                      <i class="fa-solid fa-chart-gantt"></i>
                      <h4>Cấp bậc</h4>
                    </div>
                    <div className="content">
                      <span>IT - Phần mềm</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="header">
                      <i class="fa-regular fa-clock"></i>
                      <h4>Hạn ứng tuyển</h4>
                    </div>
                    <div className="content">
                      <span>IT - Phần mềm</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="detailJob__wrapper__main__content">
                <div className="detailJob__wrapper__main__content__item previewJob__content__desctribe">
                  <div className="detailJob__wrapper__main__content__item__header">
                    <h4>MÔ TẢ CÔNG VIỆC</h4>
                  </div>
                  <div className="detailJob__wrapper__main__content__item__body">
                    <ul>
                      <li>-Quản lý các vấn đề kỹ thuật CNTT của Công ty</li>
                      <li>- Quản lý hệ thống mạng, thiết bị mạng, phần cứng</li>
                      <li>
                        - Hỗ trợ người dùng sử dụng phần mềm ứng dụng, các dịch
                        vụ mạng, thiết bị mạng, máy tính,... trong Công ty.
                      </li>
                      <li>
                        - Xây dựng và duy trì chiến lược công nghệ, đề xuất áp
                        dụng các giải pháp
                      </li>
                      <li>
                        - Xây dựng và triển khai kế hoạch thực hiện các dự án
                        công nghệ thông tin. Quản lý các dự án CNTT
                      </li>
                      <li>
                        - Lập kế hoạch phát triển hệ thống ứng dụng đáp ứng nhu
                        cầu theo từng giai đoạn
                      </li>
                      <li>
                        - Chuẩn hóa các quy trình trước khi áp dụng các hệ thống
                        CNTT
                      </li>
                      <li>
                        - Duy trì các hệ thống CNTT hoạt động ổn định, bảo mật,
                        an toàn dữ liệu
                      </li>
                      <li>
                        - Nghiên cứu phát triển áp dụng CNTT vào Công ty một
                        cách hiệu quả.
                      </li>
                      <li>
                        - Thiết kế, xây dựng kiến trúc cơ sở hạ tầng công nghệ
                      </li>
                      <li>
                        - Định hướng, quản lý hoạt động và phát triển nguồn lực
                        nhân viên Phòng IT.
                      </li>
                      <li>- Xây dựng quy định liên quan đến hệ thống CNTT</li>
                      <li>
                        - Chi tiết công việc sẽ trao đổi rõ hơn trong buổi Phỏng
                        vấn.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="detailJob__wrapper__main__content__item previewJob__content__request">
                  <div className="detailJob__wrapper__main__content__item__header">
                    <h4>YÊU CẦU CÔNG VIỆC</h4>
                  </div>
                  <div className="detailJob__wrapper__main__content__item__body">
                    <ul>
                      <li>Giới tính: Không yêu cầu</li>
                      <li>
                        Sinh viên hoặc mới tốt nghiệp ngành quản trị kinh doanh,
                        logistics hoặc ngành có liên quan.
                      </li>
                      <li>Tư duy phân tích và ghi chép tốt.</li>
                      <li>Kiến thức cơ bản về logistics và chuỗi cung ứng.</li>
                      <li>Kỹ năng giao tiếp và thuyết phục.</li>
                      <li>
                        Tinh thần học hỏi và mong muốn phát triển nghề nghiệp
                        trong lĩnh vực Sales Logistic.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="detailJob__wrapper__main__content__item previewJob__content__other">
                  <div className="detailJob__wrapper__main__content__item__header">
                    <h4>THÔNG TIN KHÁC</h4>
                  </div>
                  <div className="detailJob__wrapper__main__content__item__body">
                    <ul>
                      <li>Bằng cấp: Đại học</li>
                      <li>Thời gian thử việc: 2 tháng</li>
                      <li>Độ tuổi: 30 - 45</li>
                      <li>
                        Thời gian làm việc: Thứ 2 đến Thứ 6 (8h–18h), Nghỉ trưa
                        (12h–13h)
                      </li>
                      <li>Lương: Cạnh tranh</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="detailJob__wrapper__side col pc-3">
              <ListJobCol name={"Công việc liên quan"} />
            </div>
          </div>
        </div>
      </div>
      <Modal title={"Ứng tuyển"} openModal={openModal} setOpenModal={setOpenModal}>
        <ApplyJob />
      </Modal>
    </>
  );
}
