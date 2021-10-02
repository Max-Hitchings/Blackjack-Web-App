import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu/MainMenu";
import { GamePage } from "./components/GamePage/GamePage";
import JoinGamePage from "./components/JoinGamePage/JoinGamePage.jsx";
import CreateGamePage from "./components/CreateGamePage/CreateGamePage.jsx";

export default function AppRoutes() {
  return (
    //https://reactrouter.com/web/guides/quick-start
    <Router>
      <Switch>
        <Route exact path="/" component={MainMenu} />
        <Route exact path="/create" component={CreateGamePage} />
        <Route exact path="/join" component={JoinGamePage} />
        <Route path="/game/:gameCode" component={GamePage} />
      </Switch>
    </Router>
  );
}
