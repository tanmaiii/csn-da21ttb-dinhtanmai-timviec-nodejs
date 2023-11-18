import React, { useEffect, useState } from "react";
import "./searchQuick.scss";
import { makeRequest } from "../../axios";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function SearchQuick() {
  const [popular, setPopular] = useState();
  const navigate = useNavigate();

  const getFields = async () => {
    try {
      const res = await makeRequest.get("fields/type");
      setPopular(res.data);
    } catch (error) {}
  };

  const handleClick = (value) => {
    navigate(`/tim-kiem?field[]=${value}`)
  };

  useEffect(() => {
    getFields();
  }, []);


  return (
    <div className="searchQuick">
      <div className="searchQuick__wrapper">
        <div className="container">
          <div className="searchQuick__wrapper__header">
            <h2>Tìm kiếm việc làm nhanh</h2>
          </div>
          <div className="searchQuick__wrapper__content row">
            <div className="col pc-9 t-8 m-12">
              <SearchQuickFields />
              <SearchQuickProvince />
            </div>
            <div className="col pc-3 t-4 m-0">
              <div className="searchQuick__wrapper__content__popular">
                <h4 className="header">Ngành nghề phổ biến</h4>
                <ul className="list">
                  {popular
                    ?.sort((a, b) => b.countJobs - a.countJobs)
                    .slice(0, 10)
                    .map((item, i) => (
                        <li className="item" onClick={() => handleClick(item?.name)}>
                          <h6>{item.name}</h6>
                          <span>({item.countJobs})</span>
                        </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchQuickFields() {
  const [fields, setFields] = useState();
  const navigate = useNavigate();
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
    try {
      const res = await makeRequest.get("fields/type");
      setFields(groupBy(res.data, "typeField"));
    } catch (error) {}
  };

  const handleClick = (value) => {
    navigate(`/tim-kiem?field[]=${value}`)
  };

  useEffect(() => {
    getFields();
  }, []);

  return (
    <div className="searchQuick__wrapper__content__item">
      <h4>Tìm kiếm việc làm nhanh theo ngành nghề</h4>
      <div className="searchQuick__wrapper__content__item__list">
        {fields?.map((gr, i) => (
          <div className="searchQuick__wrapper__content__item__list__group">
            <h4 className="header">{gr[0]?.typeField}</h4>
            <div className="list">
              {gr.map((item, i) => (
                <div
                  onClick={() => handleClick(item?.name)}
                  className="item"
                  key={i}
                >
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

function SearchQuickProvince() {
  const [provinces, setProvinces] = useState();
  const navigate = useNavigate();

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
    try {
      const res = await makeRequest.get("provinces/type");
      setProvinces(groupArraysByFirstLetter(res.data, "name"));
    } catch (error) {}
  };

  
  const handleClick = (value) => {
    navigate(`/tim-kiem?province[]=${value}`)
  };

  useEffect(() => {
    getProvince();
  }, []);

  return (
    <div className="searchQuick__wrapper__content__item province">
      <h4>Tìm kiếm việc làm nhanh theo tỉnh</h4>
      <div className="searchQuick__wrapper__content__item__list">
        {provinces
          ?.sort((a, b) => a[0].name[0].localeCompare(b[0].name[0]))
          .map((gr, i) => (
            <div
              key={i}
              className="searchQuick__wrapper__content__item__list__group"
            >
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
