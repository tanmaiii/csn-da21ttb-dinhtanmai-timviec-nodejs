import React from "react";
import "./heroSlide.scss";
import bg1 from "../../assets/images/gradient1.jpg";
import bg2 from "../../assets/images/gradient2.jpg";
import img from "../../assets/images/heroSlide.png";
import SearchHeroSlide from "../searchHeroSlide/SearchHeroSlide";

import imgGG from "../../assets/images/Google__Logo.png";
import imgVNG from "../../assets/images/vng_logo.png";
import imgVT from "../../assets/images/viettel_logo.png";
import imgVNM from "../../assets/images/Vinamilk_logo.png";
import imgTGDD from "../../assets/images/Logo-The-Gioi-Di-Dong.png";
import imgFPT from "../../assets/images/FPT_logo.png";
import { useMode } from "../../context/ModeContext";

export default function HeroSlide() {
  const {darkMode} = useMode();

  return (
    <div className="HeroSlide" style={{ backgroundImage: `url(${darkMode ? bg2 : bg1})` }}>
      <div className="container">
        <div className="HeroSlide__wrapper row">
          <div className="HeroSlide__wrapper__left col pc-7 t-7 m-12">
            <h6></h6>
            <h4>
              "Khám phá tiềm năng nghề nghiệp cùng JobQuest - Bước đầu cho sự
              nghiệp tươi sáng!"
            </h4>
            <span>
              Hãy bắt đầu cuộc hành trình tìm kiếm công việc mơ ước của bạn ngay
              hôm nay tại JobQuest - nền tảng đáng tin cậy dành riêng cho cộng
              đồng người Việt Nam. Với hàng nghìn cơ hội việc làm từ khắp mọi
              nơi, chúng tôi sẽ giúp bạn nắm bắt cơ hội và xây dựng sự nghiệp mà
              bạn luôn mong muốn.
            </span>
            <ul>
              <li>
                <img src={imgVNG} alt="" />
              </li>
              <li>
                <img src={imgTGDD} alt="" />
              </li>
              <li>
                <img src={imgVT} alt="" />
              </li>
              <li>
                <img src={imgFPT} alt="" />
              </li>
            </ul>
            <div className="HeroSlide__wrapper__left__search">
              <SearchHeroSlide />
            </div>
          </div>
          <div className="HeroSlide__wrapper__right col pc-5 t-5 m-12">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
