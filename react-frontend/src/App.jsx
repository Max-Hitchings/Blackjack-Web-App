import React, { useEffect } from "react";
import "./css/main.css";
import AppRoutes from "./router.jsx";
import IdController from "./util/idController.jsx";

const App = () => (
  <>
    <div className="App">
      <AppRoutes />
    </div>
    <IdController />
  </>
);

export default App;
