import React from "react";
import { Link } from "react-router-dom";

export default function Test() {
  return (
    <div>
      Am i here?
      <Link to="./">
        <button color="secondary"></button>
      </Link>
    </div>
  );
}
