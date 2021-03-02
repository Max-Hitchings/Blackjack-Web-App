import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { homePage } from "./components/homePage/homePage";

export default function AppRoutes() {
  return (
    //https://reactrouter.com/web/guides/quick-start
    <Router>
      <Switch>
        <Route exact path="/" component={homePage}></Route>
        <Route exact path="/create" component={homePage}></Route>
        <Route exact path="/join" component={homePage}></Route>
      </Switch>
    </Router>
  );
}
