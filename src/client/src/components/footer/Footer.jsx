import React, { useState } from "react";
import "./footer.scss";
import img from "../../assets/images/logoJobQuest.png";
import { BiSolidSend } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { toast } from "sonner";

export default function Footer() {
  const { currentUser, currentCompany } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSumbitEmail = async () => {
    setLoading(true);
    try {
      await makeRequest.post("signupEmail", { email });
      toast.success("Đăng ký danh sách nhập thư thành công !");
      setLoading(false);
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setLoading(false);
  };

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
                    <a href="https://www.facebook.com/tanmai2003">
                      <i class="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.x.com">
                      <i class="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.douyin.com/">
                      <i class="fa-brands fa-tiktok"></i>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:jobquestofficial@gmail.com">
                      <i class="fa-regular fa-envelope"></i>
                    </a>
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
              {loading ? (
                <button className="btn-loading">
                  <div className="loading"></div>
                </button>
              ) : (
                <div className="footer__list__col__form__input">
                  <i className="fa-regular fa-envelope"></i>
                  <input
                    type="text"
                    placeholder="Địa chỉ Email..."
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={handleSumbitEmail}>
                    <BiSolidSend />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="footer__list__col col pc-2 t-4 m-12">
            <h4 className="footer__list__col__header">Dành cho ứng viên</h4>
            <ul className="footer__list__col__list">
              <li>
                <Link to={"/tim-kiem"}>Việc làm</Link>
              </li>
              <li>
                <Link to={"/nha-tuyen-dung"}>Nhà tuyển dụng</Link>
              </li>
              <li>
                <Link
                  to={`${
                    currentUser ? "/nguoi-dung/" + currentUser?.id : "/dang-nhap/nguoi-dung"
                  } `}
                >
                  Trang cá nhân
                </Link>
              </li>
              <li>
                <Link
                  to={`${
                    currentUser
                      ? "/nguoi-dung/" + currentUser?.id + "/companies"
                      : "/dang-nhap/nguoi-dung"
                  } `}
                >
                  Công việc yêu thích
                </Link>
              </li>
              <li>
                <Link
                  to={`${
                    currentUser
                      ? "/nguoi-dung/" + currentUser?.id + "/jobs"
                      : "/dang-nhap/nguoi-dung"
                  } `}
                >
                  Công ty yêu thích
                </Link>
              </li>
              <li>
                <Link
                  to={`${
                    currentUser
                      ? "/nguoi-dung/" + currentUser?.id + "/apply"
                      : "/dang-nhap/nguoi-dung"
                  } `}
                >
                  Công việc ứng tuyển
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__list__col col pc-2 t-4 m-12">
            <h4 className="footer__list__col__header">Dành cho nhà tuyển dụng</h4>
            <ul className="footer__list__col__list">
              <li>
                <Link
                  to={`${
                    currentCompany
                      ? "/nha-tuyen-dung/" + currentCompany?.id
                      : "/dang-nhap/nha-tuyen-dung"
                  } `}
                >
                  Trang cá nhân
                </Link>
              </li>
              <li>
                <Link
                  to={`${
                    currentCompany ? "/nha-tuyen-dung/dang-bai" : "/dang-nhap/nha-tuyen-dung"
                  } `}
                >
                  Đăng việc làm
                </Link>
              </li>
              <li>
                <Link
                  to={`${
                    currentCompany ? "/nha-tuyen-dung/ung-vien" : "/dang-nhap/nha-tuyen-dung"
                  } `}
                >
                  Đơn ứng tuyển
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__list__col col pc-2 t-4 m-12">
            <h4 className="footer__list__col__header">Việc làm theo vị trí</h4>
            <ul className="footer__list__col__list">
              <li>
                <Link to={`/tim-kiem/Hà%20Nội`}>Hà Nội</Link>
              </li>
              <li>
                <Link to={`/tim-kiem/Hồ%20Chí%20Minh`}>Hồ Chí Minh</Link>
              </li>
              <li>
                <Link to={`/tim-kiem/Đà%20Nẵng`}>Đà Nẵng</Link>
              </li>
              <li>
                <Link to={`/tim-kiem/Cần%20Thơ`}>Cần Thơ</Link>
              </li>
              <li>
                <Link to={`/tim-kiem/Bình%20Dương`}>Bình Dương</Link>
              </li>
            </ul>
          </div>
        </div>
        <span className="footer__bottom">@2023 Đinh Tấn Mãi, Tra Vinh University.</span>
      </div>
    </div>
  );
}
