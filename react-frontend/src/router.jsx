import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { homePage } from "./components/homePage/homePage";
import GamePage from "./components/GamePage/GamePage";
import JoinGamePage from "./components/JoinGamePage/JoinGamePage.jsx";

export default function AppRoutes() {
  return (
    //https://reactrouter.com/web/guides/quick-start
    <Router>
      <Switch>
        <Route exact path="/" component={homePage} />
        <Route exact path="/create" component={homePage} />
        <Route exact path="/join" component={JoinGamePage} />
        <Route path="/game/:gameCode" component={GamePage} />
      </Switch>
    </Router>
  );
}
