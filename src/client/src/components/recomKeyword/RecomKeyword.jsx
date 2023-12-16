import React from "react";
import "./recomKeyword.scss";
import { useNavigate } from "react-router-dom";

const tuKhoaTimViec = [
  "Nhân sự",
  "Phát triển",
  "Quản lý",
  "Kế toán",
  "Kỹ thuật",
  "Thiết kế",
  "Marketing",
  "Bán hàng",
  "Hỗ trợ",
  "Tư vấn",
  "IT",
  "Nghiên cứu",
  "Y tế",
  "Luật",
  "Sản xuất",
  "Dịch vụ",
  "Nghệ thuật",
  "Xây dựng",
  "Giáo dục",
  "Nông nghiệp",
];

export default function RecomKeyword() {
  const navigate = useNavigate();
  
  return (
    <div className="recomKeyword">
      <div className="recomKeyword__wrapper">
        <div className="recomKeyword__wrapper__header">
          <h4>Gợi ý từ khóa</h4>
        </div>
        <div className="recomKeyword__wrapper__body">
          {tuKhoaTimViec.map((key, i) => (
            <button key={i} onClick={() => navigate(`/tim-kiem/${key}`)} className="item">
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
