import React from "react";
import { Link } from "react-router-dom";
import "../../css/homePage.css";
import MainMenu from "./MainMenu";

interface homePageProps {}

export const homePage: React.FC<homePageProps> = () => {
  return (
    <div className="homePageWrapper pokerBackground">
      <MainMenu />
    </div>
  );
};
