import React from "react";
import "./footer.scss";
import img from "../../assets/images/logoJobQuest.png";
import { BiSolidSend } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__list row">
          <div className="footer__list__col col pc-6 t-12 m-12">
            <div className="footer__list__col__logo">
              <img src={img} alt="" />
              <h2>JobQuest</h2>
            </div>
            <span>
              "Hãy bắt đầu cuộc hành trình tìm kiếm công việc mơ ước của bạn
              ngay hôm nay tại JobQuest - nền tảng đáng tin cậy dành riêng cho
              việc làm bằng tiếng Anh. Với hàng nghìn cơ hội việc làm từ khắp
              mọi nơi, chúng tôi sẽ giúp bạn nắm bắt cơ hội và xây dựng sự
              nghiệp mà bạn luôn mong muốn. Dễ dàng tạo hồ sơ cá nhân, tìm kiếm
              việc làm phù hợp, và nhận lời khuyên từ chuyên gia tại JobQuest.
              Hãy tự tin và bước vào thế giới việc làm với niềm tin rằng công
              việc mơ ước của bạn đang đợi ở đây. Đừng để cơ hội trôi qua - hãy
              tham gia JobQuest ngay để bắt đầu sự nghiệp của bạn!"
            </span>
            <div className="footer__list__col__input">
              <i className="fa-regular fa-envelope"></i>
              <input type="text" placeholder="Địa chỉ Email..." />
              <button>
                <BiSolidSend />
              </button>
            </div>
          </div>
          <div className="footer__list__col col pc-2 t-4 m-12">
            <h4 className="footer__list__col__header">About Us</h4>
            <ul className="footer__list__col__list">
              <li>
                <Link>Việc làm</Link>
              </li>
              <li>
                <Link>Công ty</Link>
              </li>
              <li>
                <Link>Việc làm</Link>
              </li>
              <li>
                <Link>Việc làm</Link>
              </li>
              <li>
                <Link>Việc làm</Link>
              </li>
            </ul>
          </div>
          <div className="footer__list__col col pc-2 t-4 m-12">
            <h4 className="footer__list__col__header">About Us</h4>
            <ul className="footer__list__col__list">
              <li>
                <Link>Việc làm</Link>
              </li>
              <li>
                <Link>Công ty</Link>
              </li>
              <li>
                <Link>Việc làm</Link>
              </li>
              <li>
                <Link>Việc làm</Link>
              </li>
              <li>
                <Link>Việc làm</Link>
              </li>
            </ul>
          </div>
          <div className="footer__list__col col pc-2 t-4 m-12">
            <h4 className="footer__list__col__header">About Us</h4>
            <ul className="footer__list__col__list">
              <li>
                <Link>Việc làm</Link>
              </li>
              <li>
                <Link>Công ty</Link>
              </li>
              <li>
                <Link>Việc làm</Link>
              </li>
              <li>
                <Link>Việc làm</Link>
              </li>
              <li>
                <Link>Việc làm</Link>
              </li>
            </ul>
          </div>
        </div>
        <span className="footer__bottom">
          @2023 Đinh Tấn Mãi, Tra Vinh University.
        </span>
      </div>
    </div>
  );
}
