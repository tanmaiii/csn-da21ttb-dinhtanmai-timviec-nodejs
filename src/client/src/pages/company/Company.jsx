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
  const limit = 6;
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState();
  const [filterProvince, setFilterProvince] = useState([]);
  const [filterScale, setFilterScale] = useState([]);

  const [err, setErr] = useState();
  const location = useLocation();
  const { keyword } = useParams();

  const getCompany = async () => {
    setLoading(true);
    setErr();
    try {
      let url = `/company?page=${paginate}&limit=${limit}`;

      if (keyword !== undefined) {
        url += `&search=${keyword}`;
      }

      if (filterProvince !== undefined) {
        filterProvince.map((province) => {
          url += `&province[]=${province}`;
        });
      }

      if (filterScale !== undefined) {
        filterScale.map((scale) => {
          url += `&scale[]=${scale}`;
        });
      }

      const res = await makeRequest.get(url);

      setCompanies(res.data.data);
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
  }, [paginate, keyword, filterProvince, filterScale]);

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
                filterProvince={filterProvince}
                setFilterProvince={setFilterProvince}
                filterScale={filterScale}
                setFilterScale={setFilterScale}
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
                    companies?.map((company, i) => (
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
    if (keyword.trim()?.length > 0) {
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
  const { filterProvince, setFilterProvince, setFilterScale, filterScale } =
    props;
  const [provinces, setProvinces] = useState();

  const getProvinces = async () => {
    try {
      const res = await makeRequest.get(`/provinces`);
      setProvinces(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getProvinces();
  }, []);

  const handleClickProvice = (name) => {
    if (filterProvince.includes(name)) {
      const newFilter = [...filterProvince];
      newFilter.splice(filterProvince.indexOf(name), 1);
      setFilterProvince(newFilter);
    } else {
      setFilterProvince((current) => [...current, name]);
    }
  };

  const handleClickScale = (name) => {
    if (filterScale.includes(name)) {
      const newFilter = [...filterScale];
      newFilter.splice(filterScale.indexOf(name), 1);
      setFilterScale(newFilter);
    } else {
      setFilterScale((current) => [...current, name]);
    }
  };

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
                  onClick={() => handleClickProvice(item?.name)}
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
            <label
              key={i}
              className="company__wrapper__main__filter__scale__list__item"
            >
              <input
                type="checkbox"
                onClick={() => handleClickScale(item?.name)}
              />
              <span>{item?.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
