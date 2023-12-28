import React, { useEffect, useRef, useState } from "react";
import "./heroSlide.scss";
import bg1 from "../../assets/images/gradient1.jpg";
import bg2 from "../../assets/images/gradient2.jpg";
import img from "../../assets/images/heroSlide.png";
import imgVNG from "../../assets/images/vng_logo.png";
import imgVT from "../../assets/images/viettel_logo.png";
import imgTGDD from "../../assets/images/Logo-The-Gioi-Di-Dong.png";
import imgFPT from "../../assets/images/FPT_logo.png";
import { useMode } from "../../context/ModeContext";
import { makeRequest } from "../../axios";
import formatStr from "../../config/formatStr";
import { useNavigate } from "react-router-dom";

export default function HeroSlide() {
  const { darkMode } = useMode();

  return (
    <div className="HeroSlide" style={{ backgroundImage: ` url(${darkMode ? bg2 : bg1})` }}>
      <div className="container">
        <div className="HeroSlide__wrapper row">
          <div className="HeroSlide__wrapper__left col pc-7 t-7 m-12">
            <h4>
              "Khám phá tiềm năng nghề nghiệp cùng JobQuest - Bước đầu cho sự nghiệp tươi sáng!"
            </h4>
            <span>
              Hãy bắt đầu cuộc hành trình tìm kiếm công việc mơ ước của bạn ngay hôm nay tại
              JobQuest - nền tảng đáng tin cậy dành riêng cho cộng đồng người Việt Nam. Với hàng
              nghìn cơ hội việc làm từ khắp mọi nơi, chúng tôi sẽ giúp bạn nắm bắt cơ hội và xây
              dựng sự nghiệp mà bạn luôn mong muốn.
            </span>
            <ul className="HeroSlide__wrapper__left__list-company">
              <li>
                <img loading="lazy" src={imgVNG} alt="" />
              </li>
              <li>
                <img loading="lazy" src={imgTGDD} alt="" />
              </li>
              <li>
                <img loading="lazy" src={imgVT} alt="" />
              </li>
              <li>
                <img loading="lazy" src={imgFPT} alt="" />
              </li>
            </ul>
            <div className="HeroSlide__wrapper__left__search">
              <SearchHeroSlide />
            </div>
          </div>
          <div className="HeroSlide__wrapper__right col pc-5 t-5 m-12">
            <img loading="lazy" src={img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchHeroSlide() {
  const [province, setProvince] = useState([]);
  const [openSearch, setOpenSearch] = useState();
  const { searchHistory, setSearchHistory } = useMode();
  const [openProvince, setOpenProvince] = useState();
  const [keywordSearch, setKeywordSearch] = useState("");
  const [keywordProvince, setKeywordProvince] = useState("");
  const searchRef = useRef();
  const provinceRef = useRef();
  const inputSearchRef = useRef();
  const inputProvinceRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getProvince = async () => {
      try {
        const res = await makeRequest.get("/provinces");
        setProvince(res.data);
      } catch (error) {}
    };
    getProvince();
  }, []);

  useEffect(() => {
    let handleMousedown = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setOpenSearch(false);
      }
      if (!provinceRef.current.contains(e.target)) {
        setOpenProvince(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => {
      document.removeEventListener("mousedown", handleMousedown);
    };
  });

  useEffect(() => {
    if (inputSearchRef) {
      inputSearchRef.current.addEventListener("focus", () => {
        setOpenSearch(true);
      });
    }
  }, []);

  useEffect(() => {
    if (inputProvinceRef) {
      inputProvinceRef.current.addEventListener("focus", () => {
        setOpenProvince(true);
      });
    }
  }, []);

  const goToSearch = () => {
    if (keywordSearch && keywordProvince) {
      navigate(`/tim-kiem/${keywordSearch}?province[]=${keywordProvince}`);
      handleSaveHistory(keywordSearch);
    } else if (keywordSearch) {
      navigate(`/tim-kiem/${keywordSearch}`);
      handleSaveHistory(keywordSearch);
    } else if (keywordProvince) {
      navigate(`/tim-kiem?province[]=${keywordProvince}`);
    }
  };

  const handleSaveHistory = (item) => {
    item = item.trim();
    if (!searchHistory?.includes(item)) {
      const updateHistory = [item, ...searchHistory];
      setSearchHistory(updateHistory?.slice(0, 4));
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
  }, [keywordSearch, keywordProvince]);

  return (
    <div className="searchHeroSlide">
      <div className="searchHeroSlide__wrapper">
        <div
          className="searchHeroSlide__wrapper__item searchHeroSlide__wrapper__item__search"
          ref={searchRef}
        >
          <div className="searchHeroSlide__wrapper__item__input">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              ref={inputSearchRef}
              onChange={(e) => setKeywordSearch(e.target.value)}
              value={keywordSearch}
              type="text"
              name=""
              id=""
              placeholder="Nhập tên công việc..."
            />
            {keywordSearch?.length > 0 && (
              <button className="btn-clear" onClick={() => setKeywordSearch("")}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
          </div>
          <div className={`searchHeroSlide__wrapper__item__list ${openSearch ? "open" : ""}`}>
            <ul>
              {searchHistory?.slice(0, 4).map((item, i) => (
                <li key={i} onClick={() => setKeywordSearch(item)}>
                  <i className="fa-regular fa-clock"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="searchHeroSlide__wrapper__item searchHeroSlide__wrapper__item__province"
          ref={provinceRef}
        >
          <div className="searchHeroSlide__wrapper__item__input">
            <i className="fa-solid fa-location-dot"></i>
            <input
              onChange={(e) => setKeywordProvince(e.target.value)}
              value={keywordProvince}
              ref={inputProvinceRef}
              type="text"
              name=""
              id=""
              placeholder="Nhập tỉnh , thành phố..."
            />
            {keywordProvince?.length > 0 && (
              <button className="btn-clear" onClick={() => setKeywordProvince("")}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
          </div>
          <div className={`searchHeroSlide__wrapper__item__list  ${openProvince ? "open" : ""}`}>
            <ul>
              {province
                ?.filter((asd) => formatStr(asd.name).includes(formatStr(keywordProvince)))
                .map((prov, i) => (
                  <li key={i} onClick={() => setKeywordProvince(prov.name)}>
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{prov.name}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <button className="btn-search" onClick={() => goToSearch()}>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}
