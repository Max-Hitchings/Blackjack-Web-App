import React from "react";
import { Link } from "react-router-dom";

interface homePageProps {}

export const homePage: React.FC<homePageProps> = () => {
  return (
    <div>
      <div className="font-bold text-6xl">HELLO WORLD</div>
      <Link to="/test">
        <button color="secondary"></button>
      </Link>
    </div>
  );
};
