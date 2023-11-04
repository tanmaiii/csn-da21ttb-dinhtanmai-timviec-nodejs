import React from "react";
import "./editJob.scss";
import jobs from "../../config/jobs";
import province from "../../config/province";
import career from "../../config/career";
import ReactQuill from "react-quill";

export default function EditJob() {
  return (
    <div className="editJob">
      <div className="container">
        <div className="editJob__wrapper">
          <h2 className="editJob__wrapper__header">
            Chĩnh sửa bài tuyển dụng
          </h2>
          <div className="editJob__wrapper__body">
            {/* thông tin */}
            <div className="editJob__wrapper__body__form">
              <h2 className="editJob__wrapper__body__form__title">
                Thông tin tuyển dụng
              </h2>
              <div className="editJob__wrapper__body__form__content">
                <div className="editJob__wrapper__body__form__content__item">
                  <h6>Chức danh tuyển dụng</h6>
                  <div className="editJob__wrapper__body__form__content__item__input">
                    <input type="text" placeholder="Chức danh" />
                  </div>
                </div>
                <div className="editJob__wrapper__body__form__content__item">
                  <h6>Loại ngành nghề</h6>
                  <div className="editJob__wrapper__body__form__content__item__input">
                    <input type="text" placeholder="Chức danh" />
                  </div>
                </div>
                <div className="editJob__wrapper__body__form__content__item">
                  <h6>Địa chỉ làm việc</h6>
                  <div className="editJob__wrapper__body__form__content__item__input">
                    <input type="text" placeholder="Chức danh" />
                  </div>
                </div>
              </div>
            </div>
            {/* yêu cầu chung */}
            <div className="editJob__wrapper__body__form">
              <h2 className="editJob__wrapper__body__form__title">
                Yêu cầu chung
              </h2>
              <div className="editJob__wrapper__body__form__content">
                <div className="editJob__wrapper__body__form__content__item  editJob__wrapper__body__form__content__item__sex">
                  <h6>Giới tính</h6>
                  <div className="editJob__wrapper__body__form__content__item__input editJob__wrapper__body__form__content__item__sex__input">
                    <div className="editJob__wrapper__body__form__content__item__input__child editJob__wrapper__body__form__content__item__sex__input__item">
                      <input type="radio" placeholder="Chức danh" />
                      <label htmlFor="">Nam/Nữ</label>
                    </div>
                    <div className="editJob__wrapper__body__form__content__item__input__child editJob__wrapper__body__form__content__item__sex__input__item">
                      <input type="radio" placeholder="Chức danh" />
                      <label htmlFor="">Nam</label>
                    </div>
                    <div className="editJob__wrapper__body__form__content__item__input__child editJob__wrapper__body__form__content__item__sex__input__item">
                      <input type="radio" placeholder="Chức danh" />
                      <label htmlFor="">Nữ</label>
                    </div>
                  </div>
                </div>
                <div className="editJob__wrapper__body__form__content__item editJob__wrapper__body__form__content__item__scale">
                  <h6>Mức lương</h6>
                  <div className="editJob__wrapper__body__form__content__item__input editJob__wrapper__body__form__content__item__scale__input">
                    <input type="text" placeholder="Tối thiểu" />
                    <input type="text" placeholder="Tối đa" />
                  </div>
                </div>
                <div className="editJob__wrapper__body__form__content__item  editJob__wrapper__body__form__content__item__typeWork">
                  <h6>Hình thức làm việc</h6>
                  <div className="editJob__wrapper__body__form__content__item__input editJob__wrapper__body__form__content__item__typeWork__input">
                    <div className="editJob__wrapper__body__form__content__item__input__child editJob__wrapper__body__form__content__item__typeWork__input__item">
                      <input type="checkbox" placeholder="Chức danh" />
                      <label htmlFor="">Nhân viên chính thức</label>
                    </div>
                    <div className="editJob__wrapper__body__form__content__item__input__child editJob__wrapper__body__form__content__item__typeWork__input__item">
                      <input type="checkbox" placeholder="Chức danh" />
                      <label htmlFor="">Bán thời gian</label>
                    </div>
                    <div className="editJob__wrapper__body__form__content__item__input__child editJob__wrapper__body__form__content__item__typeWork__input__item">
                      <input type="checkbox" placeholder="Chức danh" />
                      <label htmlFor="">Tự do</label>
                    </div>
                    <div className="editJob__wrapper__body__form__content__item__input__child editJob__wrapper__body__form__content__item__typeWork__input__item">
                      <input type="checkbox" placeholder="Chức danh" />
                      <label htmlFor="">Thực tập</label>
                    </div>
                  </div>
                </div>
                <div className="editJob__wrapper__body__form__content__item">
                  <h6>Bằng cấp</h6>
                  <div className="editJob__wrapper__body__form__content__item__input">
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
            <div className="editJob__wrapper__body__form">
              <h2 className="editJob__wrapper__body__form__title">
                Mô tả công việc
              </h2>
              <div className="editJob__wrapper__body__form__content">
                <ReactQuill theme="snow" />
              </div>
            </div>
            {/* yêu cầu */}
            <div className="editJob__wrapper__body__form">
              <h2 className="editJob__wrapper__body__form__title">
                Yêu cầu công việc
              </h2>
              <div className="editJob__wrapper__body__form__content">
                <ReactQuill theme="snow" />
              </div>
            </div>
            {/* khác */}
            <div className="editJob__wrapper__body__form">
              <h2 className="editJob__wrapper__body__form__title">
                Thông tin khác
              </h2>
              <div className="editJob__wrapper__body__form__content">
                <ReactQuill theme="snow" />
              </div>
            </div>
            <div className="editJob__wrapper__body__button">
              <button>Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
