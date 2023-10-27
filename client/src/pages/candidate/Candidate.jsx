import React, { useState } from "react";
import "./candidate.scss";
import ItemCandidate from "../../components/itemCandidate/ItemCandidate";
import TableCandidate from "../../components/tableCandidate/TableCandidate";
import dataCandidate from "../../config/dataCandidate";
import Pagination from "../../components/pagination/Pagination";


export default function Candidate() {
  const [data, setData] = useState(dataCandidate);
  const [paginate, setPaginate] = useState(0);

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
              {data && <TableCandidate data={data} limit={10} paginate={paginate}/>}
            </div>
            <Pagination
              totalItem={data?.length}
              limit={10}
              paginate={paginate}
              setPaginate={setPaginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
