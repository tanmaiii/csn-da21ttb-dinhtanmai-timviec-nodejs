import React, { useEffect, useState } from "react";
import "./company.scss";
import ItemCompany from "../../components/itemCompany/ItemCompany";
import Pagination from "../../components/pagination/Pagination";
import { makeRequest } from "../../axios";
import {scale} from '../../config/data'


export default function Company() {
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const limit = 6;
  const [companies, setCompanies] = useState();
  const [provinces, setProvinces] = useState();
  const [search, setSearch] = useState("");

  const getCompany = async () => {
    try {
      const res = await makeRequest.get(`/company?page=${paginate}&limit=${limit}&search=${search}`);
      setCompanies(res.data.data);
      setTotalPage(res.data.pagination.totalPage);
    } catch (error) {}
  };

  const getProvinces = async () => {
    try {
      const res = await makeRequest.get(`/provinces`);
      setProvinces(res.data);
    } catch (error) {}
  };

  const submitSearch = () => {
    console.log(search);
    getCompany();
  }

  useEffect(() => {
    getProvinces()
  },[])

  useEffect(() => {
    getCompany();
    window.scroll(0,0)
  }, [paginate]);

  return (
    <div className="company">
      <div className="container">
        <div className="company__wrapper">
          <div className="company__wrapper__header">
            <h4>Nhà tuyển dụng hàng đầu</h4>
            <div className="company__wrapper__header__search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input value={search} type="text" placeholder="Tìm công ty" onChange={(e) => setSearch(e.target.value)}/> 
              <button onClick={()=> submitSearch()}>Tìm</button>
            </div>
          </div>
          <div className="company__wrapper__main row">
            <div className="col pc-3 t-3 m-0">
              <div className="company__wrapper__main__filter">
                <div className="company__wrapper__main__filter__address">
                  <h6>Địa chỉ</h6>
                  <div className="company__wrapper__main__filter__address__list">
                    {provinces
                      ?.sort((a, b) => a.name.localeCompare(b.name))
                      ?.map((item, i) => (
                        <label
                          key={i}
                          className="company__wrapper__main__filter__address__list__item"
                        >
                          <input type="checkbox" />
                          <span>{item.name}</span>
                        </label>
                      ))}
                  </div>
                </div>
                <div className="company__wrapper__main__filter__scale">
                  <h6>Quy mô</h6>
                  <div className="company__wrapper__main__filter__scale__list">
                    {scale.map((item, i) => (
                      <div
                        key={i}
                        className="company__wrapper__main__filter__scale__list__item"
                      >
                        <input type="checkbox" />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col pc-9 t-9 m-12">
              <div className="company__wrapper__main__list">
                {companies?.map((company, i) => (
                  <ItemCompany
                    company={company}
                    key={i}
                    className={"col pc-4 t-6 m-12"}
                  />
                ))}
              </div>
              <Pagination
                totalPage={totalPage}
                limit={limit}
                paginate={paginate}
                setPaginate={setPaginate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
