import React, { useEffect, useState } from "react";
import "./company.scss";
import ItemCompany from "../../components/itemCompany/ItemCompany";
import Pagination from "../../components/pagination/Pagination";
import { makeRequest } from "../../axios";
import { scale } from "../../config/data";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Loader from "../../components/loader/Loader";
import { motion, AnimatePresence } from "framer-motion";
import companies from "../../config/companies";

export default function Company() {
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const limit = 1;
  const [loading, setLoading] = useState(false);
  const [companiesAll, setCompaniesAll] = useState();
  const [companiesFilter, setCompaniesFilter] = useState();
  const [err, setErr] = useState();
  const location = useLocation();
  const { keyword } = useParams();

  const getCompany = async () => {
    setLoading(true);
    setErr();
    try {
      let res;
      if (keyword !== undefined) {
        res = await makeRequest.get(
          `/company?page=${paginate}&limit=${limit}&search=${keyword}`
        );
      } else {
        res = await makeRequest.get(`/company?page=${paginate}&limit=${limit}`);
      }
      setCompaniesFilter(res.data.data);
      setCompaniesAll(res.data.data);
      setTotalPage(res.data.pagination.totalPage);
      setLoading(false);
    } catch (error) {
      setErr("Không tìm thấy");
    }
    setLoading(false);
  };

  useEffect(() => {
    getCompany();
    window.scroll(0, 0);
  }, [paginate, keyword]);

  return (
    <div className="company">
      <div className="container">
        <div className="company__wrapper">
          <div className="company__wrapper__header">
            <h4>Nhà tuyển dụng hàng đầu</h4>
            <SearchCompany keyword={keyword} />
          </div>
          <div className="company__wrapper__main row">
            <div className="col pc-3 t-3 m-0">
              <FilterCompany
                companiesAll={companiesAll}
                setCompaniesFilter={setCompaniesFilter}
              />
            </div>
            <div className="col pc-9 t-9 m-12">
              <motion.div className="company__wrapper__main__list">
                <AnimatePresence>
                  {loading ? (
                    <Loader />
                  ) : err ? (
                    <div>{err}</div>
                  ) : (
                    companiesFilter?.map((company, i) => (
                      <ItemCompany
                        company={company}
                        key={i}
                        className={"col pc-4 t-6 m-12"}
                      />
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
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

function SearchCompany({ props }) {
  const [keyword, setKeyword] = useState(props?.keyword ? props.keyword : "");
  const navigate = useNavigate();

  const goToSearch = () => {
    if (keyword.trim().length > 0) {
      navigate(`/nha-tuyen-dung/search/${keyword}`);
    } else {
      navigate(`/nha-tuyen-dung`);
    }
  };

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword]);

  return (
    <div className="company__wrapper__header__search">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        value={keyword}
        type="text"
        placeholder="Tìm công ty"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={() => goToSearch()}>Tìm</button>
    </div>
  );
}

function FilterCompany(props) {
  const { companiesAll, setCompaniesFilter } = props;
  const [provinces, setProvinces] = useState();
  const [filterProvince, setFilterProvince] = useState([]);

  const getProvinces = async () => {
    try {
      const res = await makeRequest.get(`/provinces`);
      setProvinces(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getProvinces();
  }, []);

  const handleClickProvice = (e, name) => {
    if (filterProvince.includes(name)) {
      const newFilter = [...filterProvince];
      newFilter.splice(filterProvince.indexOf(name), 1);
      setFilterProvince(newFilter);
    } else {
      setFilterProvince((current) => [...current, name]);
    }
  };

  const FilterCompany = () => {
    if (filterProvince.length === 0) {
      setCompaniesFilter(companiesAll);
      return;
    }
    const companiesFilter = companiesAll?.filter((company) => {
      return filterProvince?.includes(company?.province);
    });
    setCompaniesFilter(companiesFilter);
  };

  useEffect(() => {
    FilterCompany();
  }, [filterProvince]);

  return (
    <div className="company__wrapper__main__filter">
      <div className="company__wrapper__main__filter__address">
        <h6>Địa chỉ</h6>
        <div className="company__wrapper__main__filter__address__list">
          {provinces
            ?.sort((a, b) => a?.name?.localeCompare(b?.name))
            ?.map((item, i) => (
              <label
                key={i}
                className="company__wrapper__main__filter__address__list__item"
              >
                <input
                  type="checkbox"
                  onClick={(e) => handleClickProvice(e, item?.name)}
                />
                <span>{item?.name}</span>
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
              <span>{item?.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
