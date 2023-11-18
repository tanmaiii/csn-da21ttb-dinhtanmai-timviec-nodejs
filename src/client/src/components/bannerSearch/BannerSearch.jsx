import React,{useEffect, useState, useRef} from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import img from "../../assets/images/bannerSearch.jpg";

import './bannerSearch.scss'
import DropdownItem from '../dropdownItem/DropdownItem'
import { makeRequest } from "../../axios";
import queryString from "query-string";
import { typeWorks, experienceJob, educationJob } from "../../config/data";

export default function BannerSearch() {
  const [province, setProvince] = useState();
  const [field, setField] = useState();
  const [qtyFilter, setQtyFilter] = useState(0);
  const [btnDelete, setBtnDelete] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const params = queryString.parse(location.search, {
    arrayFormat: "bracket-separator",
    arrayFormatSeparator: "|",
  });

  const [optionActiveProvince, setOptionActiveProvince] = useState(
    params?.province || []
  );
  const [optionActiveField, setOptionActiveField] = useState(
    params?.field || []
  );
  const [optionActiveTypeWork, setOptionActiveTypeWork] = useState(
    params?.typeWork || []
  );
  const [optionActiveExperience, setOptionActiveExperience] = useState(
    params?.exp || []
  );
  const [optionActiveEducation, setOptionActiveEducation] = useState(
    params?.edu || []
  );
  const [salaryFilter, setSalaryFilter] = useState(params?.salary || []);

  useEffect(() => {
    let params = "";
    if (optionActiveProvince.length > 0) {
      const filter = optionActiveProvince.join("|");
      params += `&province[]=${filter}`;
    }
    if (optionActiveTypeWork.length > 0) {
      const filter = optionActiveTypeWork.join("|");
      params += `&typeWork[]=${filter}`;
    }
    if (optionActiveField.length > 0) {
      const filter = optionActiveField.join("|");
      params += `&field[]=${filter}`;
    }
    if (optionActiveExperience.length > 0) {
      const filter = optionActiveExperience.join("|");
      params += `&exp[]=${filter}`;
    }
    if (optionActiveEducation.length > 0) {
      const filter = optionActiveEducation.join("|");
      params += `&edu[]=${filter}`;
    }
    if (salaryFilter.length > 0) {
      const filter = salaryFilter.join("|");
      params += `&salary[]=${filter}`;
    }

    navigate(`?${params}`);
  }, [
    optionActiveProvince,
    optionActiveField,
    optionActiveTypeWork,
    optionActiveExperience,
    optionActiveEducation,
    salaryFilter,
  ]);

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const res = await makeRequest.get("provinces/");
        setProvince(res.data);
      } catch (error) {}
    };
    getProvinces();
  }, []);

  useEffect(() => {
    const getField = async () => {
      try {
        const res = await makeRequest.get("fields/");
        setField(res.data);
      } catch (error) {}
    };
    getField();
  }, []);

  const handleDeleteFilter = () => {
    setOptionActiveProvince([]);
    setOptionActiveField([]);
    setOptionActiveTypeWork([]);
    setOptionActiveExperience([]);
    setOptionActiveEducation([]);
    setSalaryFilter([]);
    location.search = null;
  };

  useEffect(() => {
    setQtyFilter(
      optionActiveProvince.length +
        optionActiveField.length +
        optionActiveTypeWork.length +
        optionActiveExperience.length +
        optionActiveEducation.length +
        salaryFilter.length
    );

    if (
      optionActiveProvince.length > 0 ||
      optionActiveField.length > 0 ||
      optionActiveTypeWork.length > 0 ||
      optionActiveExperience.length > 0 ||
      optionActiveEducation.length > 0 ||
      salaryFilter.length > 0
    ) {
      setBtnDelete(true);
    } else {
      setBtnDelete(false);
    }
  }, [
    optionActiveProvince,
    optionActiveField,
    optionActiveTypeWork,
    optionActiveExperience,
    optionActiveEducation,
    salaryFilter,
  ]);

  return (
    <div className="search__banner">
      <div
        className="search__banner__wrapper"
        style={{ backgroundImage: `url(${img})` }}
      >
        <InputSearch />
        <div className="search__banner__wrapper__filter">
          <button
            className="button-filter"
            onClick={() => setOpenFilter(!openFilter)}
          >
            <i class="fa-solid fa-filter"></i>
          </button>
          <div
            className={`search__banner__wrapper__filter__list ${
              openFilter && "open"
            }`}
          >
            <DropdownItem
              name={"province"}
              icon={<i className="fa-solid fa-location-dot"></i>}
              title={"Tỉnh thành"}
              option={province}
              optionActive={optionActiveProvince}
              setOptionActive={setOptionActiveProvince}
              search={true}
            />
            <DropdownItem
              name={"field"}
              icon={<i className="fa-solid fa-briefcase"></i>}
              title={"Ngành nghề"}
              option={field}
              optionActive={optionActiveField}
              setOptionActive={setOptionActiveField}
              search={true}
            />
            <DropdownItem
              icon={<i className="fa-solid fa-dollar-sign"></i>}
              title={"Mức lương"}
              salary={true}
              salaryFilter={salaryFilter}
              setSalaryFilter={setSalaryFilter}
            />
            <DropdownItem
              icon={<i className="fa-solid fa-chart-gantt"></i>}
              title={"loại công việc"}
              option={typeWorks}
              optionActive={optionActiveTypeWork}
              setOptionActive={setOptionActiveTypeWork}
            />
            <DropdownItem
              icon={<i className="fa-solid fa-business-time"></i>}
              title={"Kinh nghiệm"}
              option={experienceJob}
              optionActive={optionActiveExperience}
              setOptionActive={setOptionActiveExperience}
            />
            <DropdownItem
              icon={<i className="fa-solid fa-graduation-cap"></i>}
              title={"Học vấn"}
              option={educationJob}
              optionActive={optionActiveEducation}
              setOptionActive={setOptionActiveEducation}
            />
            {btnDelete && (
              <button
                className="button-delete-filter"
                onClick={() => handleDeleteFilter()}
              >
                <i class="fa-regular fa-trash-can"></i>
                <span>Xóa lọc ({qtyFilter})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function InputSearch() {
  const [keyword, setKeyWord] = useState(useParams().keyword || undefined) ;
  const [searchHistory, setSearchHistory] = useState([]);
  const [openHistory, setOpenHistory] = useState(false);
  const inputRef = useRef();
  const inputSearchRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

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

  const goToSearch = () => {
    setOpenHistory(false);
    if (keyword?.trim().length > 0) {
      navigate(`/tim-kiem/${keyword.trim()}${location.search}`);
      handleSaveHistory(keyword.trim());
    } else {
      navigate(`/tim-kiem`);
    }
  };

  const handleSaveHistory = (item) => {
    item = item.trim();
    if (!searchHistory?.includes(item)) {
      const updateHistory = [item, ...searchHistory.slice(0, 4)];
      setSearchHistory(updateHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updateHistory));
    }
  };

  const handleSubmitHistory = (item) => {
    setKeyWord(item);
    setOpenHistory(false);
    navigate(`/tim-kiem/${item}`);
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    let handleMousedown = (e) => {
      if (!inputSearchRef.current.contains(e.target)) {
        setOpenHistory(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => {
      document.removeEventListener("mousedown", handleMousedown);
    };
  });

  useEffect(() => {
    if (inputRef) {
      inputRef.current.addEventListener("focus", () => {
        setOpenHistory(true);
      });
    }
  }, []);

  return (
    <div className="inputSearch" ref={inputSearchRef}>
      <div className="inputSearch__input">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Tên công ty, công việc..."
          onChange={(e) => setKeyWord(e.target.value)}
          value={keyword}
          ref={inputRef}
        />
        <button
          className={`inputSearch__input__btn-search`}
          onClick={() => goToSearch()}
        >
          <span>Tìm kiếm</span>
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {searchHistory && (
        <div className={`inputSearch__history  ${openHistory ? "active" : ""}`}>
          <ul>
            {searchHistory?.map((item, i) => (
              <li onClick={() => handleSubmitHistory(item)}>
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
