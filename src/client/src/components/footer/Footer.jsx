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
            <div className="footer__list__col__social">
              <div className="footer__list__col__social__logo">
                <img src={img} alt="" />
                <h2>JobQuest</h2>
              </div>
              <div className="footer__list__col__social__list">
                <h4>Kết nối với chúng tôi</h4>
                <ul>
                  <li>
                    <i class="fa-brands fa-facebook-f"></i>
                  </li>
                  <li>
                    <i class="fa-brands fa-twitter"></i>
                  </li>
                  <li>
                    <i class="fa-brands fa-tiktok"></i>
                  </li>
                  <li>
                    <i class="fa-regular fa-envelope"></i>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer__list__col__form">
              <h4>Đăng ký</h4>
              <span>
                Tham gia danh sách gửi thư của chúng tôi để luôn cập nhật những tin tức tuyển dụng
                mới nhất.
              </span>
              <div className="footer__list__col__form__input">
                <i className="fa-regular fa-envelope"></i>
                <input type="text" placeholder="Địa chỉ Email..." />
                <button>
                  <BiSolidSend />
                </button>
              </div>
            </div>
          </div>
          <div className="footer__list__col col pc-2 t-4 m-12">
            <h4 className="footer__list__col__header">Dành cho ứng viên</h4>
            <ul className="footer__list__col__list">
              <li>
                <Link>Việc làm</Link>
              </li>
              <li>
                <Link>Công ty</Link>
              </li>
              <li>
                <Link>Trang cá nhân</Link>
              </li>
              <li>
                <Link>Công việc yêu thích</Link>
              </li>
              <li>
                <Link>Công ty yêu thích</Link>
              </li>
              <li>
                <Link>Công việc ứng tuyển</Link>
              </li>
            </ul>
          </div>
          <div className="footer__list__col col pc-2 t-4 m-12">
            <h4 className="footer__list__col__header">Dành cho nhà tuyển dụng</h4>
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
            <h4 className="footer__list__col__header">Việc làm theo vị trí</h4>
            <ul className="footer__list__col__list">
              <li>
                <Link>Hà Nội</Link>
              </li>
              <li>
                <Link>Hồ Chí Minh</Link>
              </li>
              <li>
                <Link>Đằ Nẵng</Link>
              </li>
              <li>
                <Link>Cần Thơ</Link>
              </li>
              <li>
                <Link>Bình dương</Link>
              </li>
            </ul>
          </div>
        </div>
        <span className="footer__bottom">@2023 Đinh Tấn Mãi, Tra Vinh University.</span>
      </div>
    </div>
  );
}
