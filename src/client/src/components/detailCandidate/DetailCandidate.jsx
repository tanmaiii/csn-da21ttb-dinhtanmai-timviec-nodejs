import React, { useEffect, useState, useRef } from "react";
import "./detailCandidate.scss";
import { makeRequest } from "../../axios.js";
import moment from "moment";
import { useQuery } from "react-query";
import { apiCv } from "../../axios.js";
import PropTypes from "prop-types";

export default function DetailCandidate({ idApply }) {
  const [candidate, setCandidate] = useState();

  const getApply = async () => {
    try {
      const res = await makeRequest.get("/apply/detail/" + idApply);
      setCandidate(res.data);
    } catch (error) {}
  };

  const {} = useQuery(["apply", idApply], () => {
    return getApply();
  });

  return (
    candidate && (
      <div className="detailCandidate">
        <div className="detailCandidate__wrapper">
          <div className="detailCandidate__wrapper__group">
            <h4 className="detailCandidate__wrapper__group__title">Thông tin ứng viên</h4>
            <div className="detailCandidate__wrapper__group__content">
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Họ tên: </h6>
                <span>{candidate.name}</span>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Giới tính: </h6>
                <span>{candidate.sex || "Không có"}</span>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Email: </h6>
                <a href={`mailto:${candidate.email}`}>
                  <span>{candidate.email}</span>
                </a>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>SDT: </h6>
                <a href={`tel:${candidate?.phone}`}>
                  <span>{candidate?.phone}</span>
                </a>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Công việc: </h6>
                <span>{candidate.nameJob}</span>
              </div>
              <div className="detailCandidate__wrapper__group__content__item">
                <h6>Ngày nộp: </h6>
                <span>{moment(candidate?.createdAt).format("DD/MM/YYYY")}</span>
              </div>
            </div>
          </div>
          <div className="detailCandidate__wrapper__group">
            <h4 className="detailCandidate__wrapper__group__title">Thư xin việc</h4>
            <div className="detailCandidate__wrapper__group__content">
              <div
                className="detailCandidate__wrapper__group__content__item__letters"
                dangerouslySetInnerHTML={{ __html: candidate?.letter }}
              ></div>
            </div>
          </div>
          <div className="detailCandidate__wrapper__group">
            <h4 className="detailCandidate__wrapper__group__title">Cv của ứng viên</h4>
            <div className="detailCandidate__wrapper__group__content">
              {candidate?.cv ? (
                <div className="file">
                  <div className="file__name">
                    <i class="fa-regular fa-file-lines"></i>
                    <a href={`${apiCv + candidate?.cv}`} download >{candidate?.cv}</a>
                  </div>
                  <a href={`${apiCv + candidate?.cv}`} download>
                    <button className="file__button">
                      <i class="fa-regular fa-circle-down"></i>
                      <span>Tải xuống</span>
                    </button>
                  </a>
                </div>
              ) : (
                <span>Không có</span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

DetailCandidate.propTypes = {
  idApply: PropTypes.number,
};
