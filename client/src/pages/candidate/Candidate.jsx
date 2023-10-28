import React, { useEffect, useState } from "react";
import "./candidate.scss";
import TableCandidate from "../../components/tableCandidate/TableCandidate";
import dataCandidate from "../../config/dataCandidate";
import Pagination from "../../components/pagination/Pagination";
import Select from "../../components/select/Select";

const options = ["Tất cả", "UI UX", "backend"]

export default function Candidate() {
  const [data, setData] = useState(dataCandidate);
  const [paginate, setPaginate] = useState(0);
  const [optionActive, setOptionActive] = useState(0)

  useEffect(() => {
      window.scroll(0, 0);
  },[])

  return (
    <div className="candidate">
      <div className="container">
        <div className="candidate__wrapper">
          <h2 className="candidate__wrapper__header">Đơn xin việc đã nhận</h2>
          <div className="candidate__wrapper__body">
            <div className="candidate__wrapper__body__control">
              <h4>Tên công việc :</h4>
              <Select options={options} optionActive={optionActive} setOptionActive={setOptionActive}/>
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
