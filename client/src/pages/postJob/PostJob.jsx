import React, { useEffect } from "react";
import "./postJob.scss";
import jobs from "../../config/jobs";
import province from "../../config/province";
import career from "../../config/career";
import ReactQuill from "react-quill";

export default function PostJob() {

  useEffect(() => {
    window.scroll(0, 0);
  })
  return (
    <div className="postJob">
      <div className="container">
        <div className="postJob__wrapper">
          <h2 className="postJob__wrapper__header">
            Đăng bài tuyển dụng
          </h2>
          <div className="postJob__wrapper__body">
            {/* thông tin */}
            <div className="postJob__wrapper__body__form">
              <h2 className="postJob__wrapper__body__form__title">
                Thông tin tuyển dụng
              </h2>
              <div className="postJob__wrapper__body__form__content">
                <div className="postJob__wrapper__body__form__content__item">
                  <h6>Chức danh tuyển dụng</h6>
                  <div className="postJob__wrapper__body__form__content__item__input">
                    <input type="text" placeholder="Chức danh" />
                  </div>
                </div>
                <div className="postJob__wrapper__body__form__content__item">
                  <h6>Loại ngành nghề</h6>
                  <div className="postJob__wrapper__body__form__content__item__input">
                    <input type="text" placeholder="Chức danh" />
                  </div>
                </div>
                <div className="postJob__wrapper__body__form__content__item">
                  <h6>Địa chỉ làm việc</h6>
                  <div className="postJob__wrapper__body__form__content__item__input">
                    <input type="text" placeholder="Chức danh" />
                  </div>
                </div>
              </div>
            </div>
            {/* yêu cầu chung */}
            <div className="postJob__wrapper__body__form">
              <h2 className="postJob__wrapper__body__form__title">
                Yêu cầu chung
              </h2>
              <div className="postJob__wrapper__body__form__content">
                <div className="postJob__wrapper__body__form__content__item  postJob__wrapper__body__form__content__item__sex">
                  <h6>Giới tính</h6>
                  <div className="postJob__wrapper__body__form__content__item__input postJob__wrapper__body__form__content__item__sex__input">
                    <div className="postJob__wrapper__body__form__content__item__input__child postJob__wrapper__body__form__content__item__sex__input__item">
                      <input type="radio" placeholder="Chức danh" />
                      <label htmlFor="">Nam/Nữ</label>
                    </div>
                    <div className="postJob__wrapper__body__form__content__item__input__child postJob__wrapper__body__form__content__item__sex__input__item">
                      <input type="radio" placeholder="Chức danh" />
                      <label htmlFor="">Nam</label>
                    </div>
                    <div className="postJob__wrapper__body__form__content__item__input__child postJob__wrapper__body__form__content__item__sex__input__item">
                      <input type="radio" placeholder="Chức danh" />
                      <label htmlFor="">Nữ</label>
                    </div>
                  </div>
                </div>
                <div className="postJob__wrapper__body__form__content__item postJob__wrapper__body__form__content__item__scale">
                  <h6>Mức lương</h6>
                  <div className="postJob__wrapper__body__form__content__item__input postJob__wrapper__body__form__content__item__scale__input">
                    <input type="text" placeholder="Tối thiểu" />
                    <input type="text" placeholder="Tối đa" />
                    <div className="postJob__wrapper__body__form__content__item__input__child">
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Thảo thuận</label>
                    </div>
                  </div>
                </div>
                <div className="postJob__wrapper__body__form__content__item  postJob__wrapper__body__form__content__item__typeWork">
                  <h6>Hình thức làm việc</h6>
                  <div className="postJob__wrapper__body__form__content__item__input postJob__wrapper__body__form__content__item__typeWork__input">
                    <div className="postJob__wrapper__body__form__content__item__input__child postJob__wrapper__body__form__content__item__typeWork__input__item">
                      <input type="checkbox" placeholder="Chức danh" />
                      <label htmlFor="">Nhân viên chính thức</label>
                    </div>
                    <div className="postJob__wrapper__body__form__content__item__input__child postJob__wrapper__body__form__content__item__typeWork__input__item">
                      <input type="checkbox" placeholder="Chức danh" />
                      <label htmlFor="">Bán thời gian</label>
                    </div>
                    <div className="postJob__wrapper__body__form__content__item__input__child postJob__wrapper__body__form__content__item__typeWork__input__item">
                      <input type="checkbox" placeholder="Chức danh" />
                      <label htmlFor="">Tự do</label>
                    </div>
                    <div className="postJob__wrapper__body__form__content__item__input__child postJob__wrapper__body__form__content__item__typeWork__input__item">
                      <input type="checkbox" placeholder="Chức danh" />
                      <label htmlFor="">Thực tập</label>
                    </div>
                  </div>
                </div>
                <div className="postJob__wrapper__body__form__content__item">
                  <h6>Bằng cấp</h6>
                  <div className="postJob__wrapper__body__form__content__item__input">
                    <select name="" id="">
                      <option value="">Không yêu cầu</option>
                      <option value="">Đại học</option>
                      <option value="">Cao đẳng</option>
                      <option value="">Đại học</option>
                      <option value="">Đại học</option>
                      <option value="">Đại học</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* mô tả */}
            <div className="postJob__wrapper__body__form">
              <h2 className="postJob__wrapper__body__form__title">
                Mô tả công việc
              </h2>
              <div className="postJob__wrapper__body__form__content">
                <ReactQuill theme="snow" />
              </div>
            </div>
            {/* yêu cầu */}
            <div className="postJob__wrapper__body__form">
              <h2 className="postJob__wrapper__body__form__title">
                Yêu cầu công việc
              </h2>
              <div className="postJob__wrapper__body__form__content">
                <ReactQuill theme="snow" />
              </div>
            </div>
            {/* khác */}
            <div className="postJob__wrapper__body__form">
              <h2 className="postJob__wrapper__body__form__title">
                Thông tin khác
              </h2>
              <div className="postJob__wrapper__body__form__content">
                <ReactQuill theme="snow" />
              </div>
            </div>
            <div className="postJob__wrapper__body__button">
              <button>Đăng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
