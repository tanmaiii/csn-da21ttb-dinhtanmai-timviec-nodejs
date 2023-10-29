import React, { useState } from "react";
import "./detailCandidate.scss";
import Select from "../select/Select";

const options = [
  {
    value: "Chưa xem",
    label: "Chưa xem"
  },
  {
    value: "Đã xem",
    label: "Đã xem"
  },
  {
    value: "Chấp nhận",
    label: "Chấp nhận"
  },
  {
    value: "Từ chối",
    label: "Từ chối"
  },
]

export default function DetailCandidate({ candidate }) {

  return (
    candidate && (
      <div className="detailCandidate">
        <div className="detailCandidate__wrapper">
          <div className="detailCandidate__wrapper__control">
            <h4 className="detailCandidate__wrapper__control__title">
              Trạng thái hồ sơ
            </h4>
            <div className="detailCandidate__wrapper__control__select">
              <Select options={options} />
            </div>
          </div>
          <div className="detailCandidate__wrapper__group">
            <h4 className="detailCandidate__wrapper__group__title">
              Thông tin người ứng tuyển
            </h4>
            <div className="detailCandidate__wrapper__group__content">
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Họ tên: </h6>
                <span>{candidate.name}</span>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Email: </h6>
                <span>{candidate.email}</span>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>SDT: </h6>
                <span>{candidate.phone}</span>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Công việc: </h6>
                <span>{candidate.nameJob}</span>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Ngày nộp: </h6>
                <span>{candidate.date}</span>
              </div>
            </div>
          </div>
          <div className="detailCandidate__wrapper__group">
            <h4 className="detailCandidate__wrapper__group__title">
              Thư xin việc
            </h4>
            <div className="detailCandidate__wrapper__group__content">
              <div className="detailCandidate__wrapper__group__content__item__letters">
                <span>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                  illo architecto perferendis praesentium nobis explicabo nemo
                  vel temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil! Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Hic illo
                  architecto perferendis praesentium nobis explicabo nemo vel
                  temporibus ea repellendus, necessitatibus eius dolores
                  similique, doloremque totam, eum minus distinctio nihil!
                </span>
              </div>
            </div>
          </div>
          <div className="detailCandidate__wrapper__group">
            <h4 className="detailCandidate__wrapper__group__title">
              Liên kết cv
            </h4>
            <div className="detailCandidate__wrapper__group__content">
              <div className="detailCandidate__wrapper__group__content__item__cv">
                <a href="https://drive.google.com/file/d/12YACDCDYGxxk-hMVwJxzD1s7HvwvZNAm/view?usp=sharing">
                    Truy cập
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
