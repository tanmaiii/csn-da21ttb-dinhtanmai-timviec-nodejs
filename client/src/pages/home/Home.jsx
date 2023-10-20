import React from "react";
import "./home.scss";
import HeroSlide from "../../components/heroSlide/HeroSlide";
import SectionCategories from "../../components/sectionCategories/SectionCategories";
import SectionCompany from "../../components/sectionCompany/SectionCompany";
import SectionJobs from "../../components/sectionJobs/SectionJobs";
import presont from "../../assets/images/324234234.png";

// import SvgInterview from '../../assets/svg/SvgInterview'
// import SvgRegister from '../../assets/svg/SvgRegister'
// import SvgUploadInfo from '../../assets/svg/SvgUploadInfo'

import iconRegister from "../../assets/icon/log-in.png";
import iconUploadInfo from "../../assets/icon/register.png";
import iconInterview from "../../assets/icon/interview.png";

export default function Home() {
  return (
    <div className="home">
      <HeroSlide />
      <div className="home-body">
        <div className="container">
          <SectionCategories />
          <div className="home__section row">
            <div className="home__section__left col pc-6">
              <img src={presont} alt="" />
            </div>
            <div className="home__section__right col pc-6">
              <i class="fa-solid fa-briefcase home__section__right__logo"></i>
              <h2>Cổng thông tin việc làm đánh tin cậy và phổ biến.</h2>
              <span>
                Tìm công việc mơ ước của bạn từ hàng ngàn vị trí tuyển dụng được
                cập nhật hằng ngày. Tìm việc làm tốt nhất trên các trang web ở
                Việt Nam. Tìm kiếm việc làm ngay hôm nay !
              </span>
              <div className="home__section__right__btn">
                <button>
                  <span>Tìm việc làm</span>
                  <i class="fa-solid fa-arrow-right-long"></i>
                </button>
                <button>
                  <span>Đăng việc làm</span>
                  <i class="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
            </div>
          </div>
          <SectionCompany title={"Công ty hàng đầu"} />
          <div className="home__section_procedure">
            <div className="home__section_procedure__header">
              <h2>Quy trình Ứng Tuyển</h2>
            </div>
            <div className="home__section_procedure__body row">
              <div className="col pc-4 home__section_procedure__body__item home__section_procedure__body__item-1">
                <div className="icon">
                  <img src={iconRegister} alt="" />
                </div>
                <div className="content">
                  <h4>Tạo tài khoản</h4>
                </div>
              </div>
              <div className="col pc-4 home__section_procedure__body__item home__section_procedure__body__item-2">
                <div className="icon">
                  <img src={iconUploadInfo} alt="" />
                </div>
                <div className="content">
                  <h4>Tạo tài khoản</h4>
                </div>
              </div>
              <div className="col pc-4 home__section_procedure__body__item home__section_procedure__body__item-3">
                <div className="icon">
                  <img src={iconInterview} alt="" />
                </div>
                <div className="content">
                  <h4>Tạo tài khoản</h4>
                </div>
              </div>
            </div>
            <button>
              <span>Ứng tuyển ngay</span>
            </button>
          </div>
          <SectionJobs title={"Gợi ý việc làm"} />
        </div>
      </div>
    </div>
  );
}
