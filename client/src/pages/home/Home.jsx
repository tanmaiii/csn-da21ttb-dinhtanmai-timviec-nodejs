import React from "react";
import "./home.scss";
import HeroSlide from "../../components/heroSlide/HeroSlide";
import SectionCategories from "../../components/sectionCategories/SectionCategories";
import SectionList from "../../components/sectionList/SectionList";

export default function Home() {
  return (
    <div className="home">
      <HeroSlide />
      <div className="home-body">
        <div className="container">
          <SectionCategories />
          <SectionList title={"Công ty hàng đầu"}/>
        </div>
      </div>
    </div>
  );
}
