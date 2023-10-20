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
          <div className="footer__list__col col pc-6">
            <div className="footer__list__col__logo">
              <img src={img} alt="" />
              <h2>JobQuest</h2>
            </div>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quis
              iste, sunt eos debitis est impedit ipsam facilis qui rem
              voluptatibus vel officiis saepe, fugiat tempora inventore omnis,
              unde id.
            </span>
            <div className="footer__list__col__input">
              <i class="fa-regular fa-envelope"></i>
              <input type="text" placeholder="Địa chỉ Email..." />
              <button>
                <BiSolidSend />
              </button>
            </div>
          </div>
          <div className="footer__list__col col pc-2">
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
          <div className="footer__list__col col pc-2">
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
          <div className="footer__list__col col pc-2">
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
        <div className="footer__bottom"></div>
      </div>
    </div>
  );
}
