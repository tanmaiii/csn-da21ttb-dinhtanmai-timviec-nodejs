import React, { useEffect, useState } from "react";
import "./company.scss";
import ItemCompany from "../../components/itemCompany/ItemCompany";
import Pagination from "../../components/pagination/Pagination";
import { makeRequest } from "../../axios";
import { scale } from "../../config/data";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { motion, AnimatePresence } from "framer-motion";
import NotFoundData from "../../components/notFoundData/NotFoundData";
import queryString from "query-string";

export default function Company() {
  const [paginate, setPaginate] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 6;
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState();
  const [filterMobile, setFilterMobile] = useState(false);
  const [err, setErr] = useState();
  const location = useLocation();
  const { keyword } = useParams();

  const getCompany = async () => {
    const params = queryString.parse(location.search, {
      arrayFormat: "bracket",
    });

    setLoading(true);
    setErr();
    try {
      let url = `/company?page=${paginate}&limit=${limit}`;

      if (keyword !== undefined) {
        url += `&search=${keyword}`;
      }

      if (params?.province?.length > 0) {
        params?.province?.map((province) => {
          url += `&province[]=${province}`;
        });
      }

      if (params?.scale?.length > 0) {
        params.scale.map((scale) => {
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
  }, [paginate, location]);

  useEffect(() => {
    setPaginate(1);
  }, [location]);

  return (
    <div className="company">
      <div className="container">
        <div className="company__wrapper">
          <div className="company__wrapper__header">
            <h4>Nhà tuyển dụng hàng đầu</h4>
            <div>
              <SearchCompany />
              <button className="button-filter" onClick={() => setFilterMobile(!filterMobile)}>
                <i class="fa-solid fa-filter"></i>
              </button>
            </div>
          </div>
          <div className="company__wrapper__main row">
            <div className="col pc-3 t-3 m-0">{!filterMobile && <FilterCompany />}</div>
            <div className="col pc-9 t-9 m-12">
              <motion.div className="company__wrapper__main__list">
                <AnimatePresence>
                  {loading ? (
                    <Loader />
                  ) : err ? (
                    <NotFoundData />
                  ) : (
                    companies?.map((company, i) => (
                      <ItemCompany company={company} key={i} className={"col pc-4 t-6 m-12"} />
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
      <div className={`company__modal__filter ${filterMobile && "active"}`}>
        <button className="button__close__filter" onClick={() => setFilterMobile(false)}>
          <i class="fa-solid fa-xmark"></i>
        </button>
        {filterMobile && <FilterCompany />}
      </div>
    </div>
  );
}

function SearchCompany() {
  const [keyword, setKeyword] = useState(useParams().keyword || undefined);
  const navigate = useNavigate();
  const location = useLocation();

  const goToSearch = () => {
    if (keyword.trim()?.length > 0) {
      navigate(`/nha-tuyen-dung/search/${keyword}${location.search}`);
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

function FilterCompany() {
  const [filterProvince, setFilterProvince] = useState([]);
  const [filterScale, setFilterScale] = useState([]);
  const [provinces, setProvinces] = useState();
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    let params = ``;

    if (filterProvince.length > 0) {
      filterProvince.map((province) => {
        params += `&province[]=${province}`;
      });
    }

    if (filterScale.length > 0) {
      filterScale.map((province) => {
        params += `&scale[]=${province}`;
      });
    }

    navigate(`?${params}`);
  }, [filterProvince, filterScale]);

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
        <div className="company__wrapper__main__filter__address__header">
          <h6>Địa chỉ</h6>
          {filterProvince.length > 0 && (
            <button onClick={() => setFilterProvince([])}>Xóa lọc ({filterProvince.length})</button>
          )}
        </div>
        <div className="company__wrapper__main__filter__address__list">
          {provinces
            ?.sort((a, b) => a?.name?.localeCompare(b?.name))
            ?.map((item, i) => (
              <div key={i} className="company__wrapper__main__filter__address__list__item">
                <input
                  id={`filterProvince-${item?.name}`}
                  checked={filterProvince.includes(item?.name)}
                  type="checkbox"
                  onChange={() => handleClickProvice(item?.name)}
                />
                <label htmlFor={`filterProvince-${item?.name}`}>{item?.name}</label>
              </div>
            ))}
        </div>
      </div>
      <div className="company__wrapper__main__filter__scale">
        <div className="company__wrapper__main__filter__scale__header">
          <h6>Quy mô</h6>
          {filterScale.length > 0 && (
            <button onClick={() => setFilterScale([])}>Xóa lọc ({filterScale.length})</button>
          )}
        </div>
        <div className="company__wrapper__main__filter__scale__list">
          {scale.map((item, i) => (
            <div key={i} className="company__wrapper__main__filter__scale__list__item">
              <input
                id={`filterScale-${item?.name}`}
                checked={filterScale.includes(item?.name)}
                type="checkbox"
                onChange={() => handleClickScale(item?.name)}
              />
              <label htmlFor={`filterScale-${item?.name}`}>{item?.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
