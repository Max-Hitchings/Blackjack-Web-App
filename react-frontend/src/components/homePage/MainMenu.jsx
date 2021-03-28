import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export default function MainMenu() {
  const history = useHistory();

  const handleCreateGame = () => {
    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/create-game/", requestData)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((responseJson) => {
        console.log(responseJson);

        history.push({
          pathname: `/game/${responseJson.gameCode}`,
          state: { userHost: true },
        });
      })
      .catch((error) => console.error(error));
  };

  const handleJoinGame = () => {
    history.push(`/join`);
  };

  return (
    <div className="MainMenu-Container">
      <div className="MainMenu-Header">BLACKJACK</div>
      <div className="MainMenu-ButtonContainer">
        <Button
          colorScheme="green"
          color="black"
          className="MainMenu-Button"
          onClick={() => {
            handleJoinGame();
          }}
        >
          Join Game
        </Button>
        <Button
          colorScheme="green"
          color="black"
          className="MainMenu-Button"
          onClick={() => {
            handleCreateGame();
          }}
        >
          Create Game
        </Button>
      </div>
    </div>
  );
}
