import React from "react";
import "../../css/homePage.css";
import MainMenu from "./MainMenu";

export const homePage = () => {
  return (
    <div className="homePageWrapper pokerBackground">
      <MainMenu />
    </div>
  );
};
