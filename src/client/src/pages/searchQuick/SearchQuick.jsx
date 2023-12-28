import React, { useEffect, useState } from "react";
import "./searchQuick.scss";
import { makeRequest } from "../../axios";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import RecomKeyword from "../../components/recomKeyword/RecomKeyword";
import Loader from "../../components/loader/Loader";

export default function SearchQuick() {
  const [popular, setPopular] = useState();
  const [provinces, setProvinces] = useState();
  const [fields, setFields] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getFieldsPopular = async () => {
    try {
      const res = await makeRequest.get("fields/type");
      setPopular(res.data);
    } catch (error) {}
  };

  const handleClick = (value) => {
    navigate(`/tim-kiem?field[]=${value}`);
  };

  const groupBy = (arr, key) => {
    return Object.values(
      arr.reduce((acc, item) => {
        const groupKey = item[key];

        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }

        acc[groupKey].push(item);

        return acc;
      }, {})
    );
  };

  const getFields = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("fields/type");
      setFields(groupBy(res.data, "typeField"));
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  function groupArraysByFirstLetter(arrays, key) {
    const groups = arrays.reduce((acc, array) => {
      const firstLetter = array[key][0];
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(array);
      return acc;
    }, {});

    return Object.values(groups);
  }

  const getProvince = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("provinces/type");
      setProvinces(groupArraysByFirstLetter(res.data, "name"));
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    getFieldsPopular();
    getFields();
    getProvince();
    window.scroll(0, 0);
  }, []);

  return (
    <div className="searchQuick">
      <div className="container">
        <div className="searchQuick__wrapper">
          <div className="searchQuick__wrapper__header">
            <h2>Tìm kiếm việc làm nhanh</h2>
          </div>
          <div className="searchQuick__wrapper__content ">
            {loading ? (
              <Loader />
            ) : (
              <div className="row">
                <div className="col pc-9 t-8 m-12">
                  <SearchQuickFields fields={fields} />
                  <SearchQuickProvince provinces={provinces} />
                </div>
                <div className="col pc-3 t-4 m-12">
                  <div className="searchQuick__wrapper__content__popular">
                    <h4 className="header">Ngành nghề phổ biến</h4>
                    <ul className="list">
                      {popular
                        ?.sort((a, b) => b.countJobs - a.countJobs)
                        .slice(0, 10)
                        .map((item, i) => (
                          <li key={i} className="item" onClick={() => handleClick(item?.name)}>
                            <h6>{item.name}</h6>
                            <span>({item.countJobs})</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <RecomKeyword />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchQuickFields({ fields }) {
  const navigate = useNavigate();

  const handleClick = (value) => {
    navigate(`/tim-kiem?field[]=${value}`);
  };

  return (
    <div className="searchQuick__wrapper__content__item">
      <h4>Tìm kiếm việc làm nhanh theo ngành nghề</h4>
      <div className="searchQuick__wrapper__content__item__list">
        {fields?.map((gr, i) => (
          <div key={i} className="searchQuick__wrapper__content__item__list__group">
            <h4 className="header">{gr[0]?.typeField}</h4>
            <div className="list">
              {gr.map((item, i) => (
                <div onClick={() => handleClick(item?.name)} className="item" key={i}>
                  <h6>{item?.name}</h6>
                  <span>({item?.countJobs})</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchQuickProvince({ provinces }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (value) => {
    navigate(`/tim-kiem?province[]=${value}`);
  };

  return (
    <div className="searchQuick__wrapper__content__item province">
      <h4>Tìm kiếm việc làm nhanh theo tỉnh</h4>
      <div className="searchQuick__wrapper__content__item__list">
        {provinces
          ?.sort((a, b) => a[0].name[0].localeCompare(b[0].name[0]))
          .map((gr, i) => (
            <div key={i} className="searchQuick__wrapper__content__item__list__group">
              <h4 className="header">{gr[0]?.name[0]}</h4>
              <div className="list">
                {gr.map((item, i) => (
                  <div onClick={() => handleClick(item?.name)} className="item" key={i}>
                    <h6>{item?.name}</h6>
                    <span>({item?.countJobs})</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
