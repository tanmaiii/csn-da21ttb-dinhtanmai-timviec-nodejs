import React from "react";
import "./candidate.scss";
import ItemCandidate from "../../components/itemCandidate/ItemCandidate";

export default function Candidate() {
  return (
    <div className="candidate">
      <div className="container">
        <div className="candidate__wrapper">
          <h2 className="candidate__wrapper__header">Đơn xin việc đã nhận</h2>
          <div className="candidate__wrapper__body">
            <div className="candidate__wrapper__body__control">
              <h4>Tên công việc :</h4>
              <select name="" id="">
                <option value="">Tất cả</option>
                <option value="">Ui de</option>
                <option value="">Tất cả</option>
                <option value="">Tất cả</option>
                <option value="">Tất cả</option>
                <option value="">Tất cả</option>
              </select>
            </div>
            <div className="candidate__wrapper__body__list">
                <table>
                    <thead></thead>
                    <tbody></tbody>
                </table>
                <ItemCandidate/>
                <ItemCandidate/>
                <ItemCandidate/>
                <ItemCandidate/>
                <ItemCandidate/>
                <ItemCandidate/>
                <ItemCandidate/>
                <ItemCandidate/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
