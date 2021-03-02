import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { request } from "http";
import axios from "axios";

export default function MainMenu() {
  const handleCreateGame = () => {
    axios
      .post("http://127.0.0.1:8000/api/create-game/")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

    //axios
    //  .post("http://127.0.0.1:8000/api/create-game/")
    //  .then((response) => {
    //    console.log(response);
    //  })
    //  .catch((error) => {
    //    console.error(error);
    //  });
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
