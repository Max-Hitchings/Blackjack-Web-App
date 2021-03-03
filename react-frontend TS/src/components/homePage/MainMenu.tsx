import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import history from "../../history";

export default function MainMenu() {
  const handleCreateGame = () => {
    fetch("/api/create-game/", { method: "post" })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.data);
        //return history.push("/game/hi");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="MainMenu-Container">
      <Button colorScheme="teal" variant="outline">
        Button
      </Button>
      <div className="MainMenu-Header">BLACKJACK</div>
      <div className="MainMenu-ButtonContainer">
        <button className="MainMenu-Button">Join Game</button>
        <button
          className="MainMenu-Button"
          onClick={() => {
            handleCreateGame();
          }}
        >
          Create Game
        </button>
      </div>
    </div>
  );
}
