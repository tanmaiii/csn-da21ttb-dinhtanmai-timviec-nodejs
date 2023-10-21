import React, { useState } from "react";
import "./previewJob.scss";
import img from "../../assets/images/Microsoft_logo.png";

export default function PreviewJob() {
  const [save, setSave] = useState(false);

  return (
    <div className="previewJob">
      <div className="previewJob__image">
        <img src={img} alt="" />
        <div className="previewJob__image__name">
          <h4>IT - Thực tập sinh kiểm thử phần mềm.</h4>
          <span>Microsoft Việt Nam</span>
        </div>
      </div>
      <div className="previewJob__button">
        <button className="btn_apply">Ứng tuyển</button>
        <button className="btn_save" onClick={() => setSave(!save)}>
          {save ? (
            <>
              <i class="fa-solid fa-heart"></i>
              <span>Đã Lưu</span>
            </>
          ) : (
            <>
              <i class="fa-regular fa-heart"></i>
              <span>Lưu</span>
            </>
          )}
        </button>
      </div>
      <div className="previewJob__info__main">
        <div className="previewJob__info__main__col col pc-6">
          <div className="item">
            <div className="header">
              <i class="fa-solid fa-location-dot"></i>
              <h4>Địa điểm</h4>
            </div>
            <div className="content">
              <span>IT - Phần mềm</span>
            </div>
          </div>
          <div className="item">
            <div className="header">
              <i class="fa-solid fa-briefcase"></i>
              <h4>Ngành nghề</h4>
            </div>
            <div className="content">
              <span>IT - Phần mềm</span>
            </div>
          </div>
          <div className="item">
            <div className="header">
              <i class="fa-solid fa-dollar-sign"></i>
              <h4>Lương</h4>
            </div>
            <div className="content">
              <span>20.000.000 - 30.000.000 VNĐ</span>
            </div>
          </div>
        </div>
        <div className="previewJob__info__main__col col pc-6">
          <div className="item">
            <div className="header">
              <i class="fa-solid fa-suitcase"></i>
              <h4>Kinh nghiệm</h4>
            </div>
            <div className="content">
              <span>IT - Phần mềm</span>
            </div>
          </div>
          <div className="item">
            <div className="header">
              <i class="fa-solid fa-chart-gantt"></i>
              <h4>Cấp bậc</h4>
            </div>
            <div className="content">
              <span>IT - Phần mềm</span>
            </div>
          </div>
          <div className="item">
            <div className="header">
              <i class="fa-regular fa-clock"></i>
              <h4>Hạn ứng tuyển</h4>
            </div>
            <div className="content">
              <span>IT - Phần mềm</span>
            </div>
          </div>
        </div>
      </div>
      <div className="previewJob__desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ad esse
        repudiandae iure, placeat nam officia, vero pariatur rem ut nemo atque
        eum, tenetur magni qui quos. Corporis, eum temporibus. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Illo ad esse repudiandae iure,
        placeat nam officia, vero pariatur rem ut nemo atque eum, tenetur magni
        qui quos. Corporis, eum temporibus. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Illo ad esse repudiandae iure, placeat nam
        officia, vero pariatur rem ut nemo atque eum, tenetur magni qui quos.
        Corporis, eum temporibus. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Illo ad esse repudiandae iure, placeat nam officia,
        vero pariatur rem ut nemo atque eum, tenetur magni qui quos. Corporis,
        eum temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Illo ad esse repudiandae iure, placeat nam officia, vero pariatur rem ut
        nemo atque eum, tenetur magni qui quos. Corporis, eum temporibus. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Illo ad esse
        repudiandae iure, placeat nam officia, vero pariatur rem ut nemo atque
        eum, tenetur magni qui quos. Corporis, eum temporibus. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Illo ad esse repudiandae iure,
        placeat nam officia, vero pariatur rem ut nemo atque eum, tenetur magni
        qui quos. Corporis, eum temporibus. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Illo ad esse repudiandae iure, placeat nam
        officia, vero pariatur rem ut nemo atque eum, tenetur magni qui quos.
        Corporis, eum temporibus. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Illo ad esse repudiandae iure, placeat nam officia,
        vero pariatur rem ut nemo atque eum, tenetur magni qui quos. Corporis,
        eum temporibus.
      </div>
    </div>
  );
}
