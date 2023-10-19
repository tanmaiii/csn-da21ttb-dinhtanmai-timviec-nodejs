import React from "react";
import "./home.scss";
import HeroSlide from "../../components/heroSlide/HeroSlide";
import SectionCategories from "../../components/sectionCategories/SectionCategories";
import SectionList from "../../components/sectionList/SectionList";
import presont from "../../assets/images/324234234.png";

export default function Home() {
  return (
    <div className="home">
      <HeroSlide />
      <div className="home-body">
        <div className="container">
          <SectionCategories />
          <div className="home__section row" >
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
          <SectionList title={"Công ty hàng đầu"} />
        </div>
      </div>
    </div>
  );
}
