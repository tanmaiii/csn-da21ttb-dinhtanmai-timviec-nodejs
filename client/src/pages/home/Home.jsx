import React from "react";
import "./home.scss";
import HeroSlide from "../../components/heroSlide/HeroSlide";
import SectionCategories from "../../components/sectionCategories/SectionCategories";

export default function Home() {
  return (
    <div className="home">
      <HeroSlide />
      <div className="home-body">
        <div className="container">
        <SectionCategories/>
        </div>
      </div>
    </div>
  );
}
