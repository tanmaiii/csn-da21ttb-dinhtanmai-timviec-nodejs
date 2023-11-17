import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sectionCompany.scss";
import ItemCompany from "../itemCompany/ItemCompany";
import { makeRequest } from "../../axios";
import Loader from "../loader/Loader";

export default function SectionCompany({ title }) {
  const [companies, setCompanies] = useState([]);
  const sectionListRef = useRef();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCpn = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("/company?page=1&limit=6");
      setCompanies(res.data.data);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    getCpn()
  },[])

  return (
    <div className="sectionList">
      <div className="sectionList__header">
        <h4>{title}</h4>
      </div>
      <div className="sectionList__body">
        <div ref={sectionListRef} className=" sectionList__body__list row">
          {loading && <Loader/>}
          {companies &&
            companies?.map((company, i) => (
              <ItemCompany
                key={i}
                company={company}
                className="col pc-3 t-6 m-12"
              />
            ))}
        </div>
      </div>
      <Link className="sectionList__btn" to={'/nha-tuyen-dung'}>
        <button className="">
          <span>Xem tất cả</span> <i className="fa-solid fa-chevron-right"></i>
        </button>
      </Link>
    </div>
  );
}
