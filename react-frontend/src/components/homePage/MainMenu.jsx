import React from "react";
import { useHistory } from "react-router-dom";

export default function MainMenu() {
  const history = useHistory();

  const handleCreateGame = () => {
    fetch("/api/create-game/", { method: "post" })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((responseJson) => {
        console.log(responseJson);

        history.push(`/game/${responseJson.game_code}`);
      })
      .catch((error) => {});
  };

  const handleJoinGame = () => {
    history.push(`/join`);
  };

  return (
    <div className="MainMenu-Container">
      <div className="MainMenu-Header">BLACKJACK</div>
      <div className="MainMenu-ButtonContainer">
        <button
          className="MainMenu-Button"
          onClick={() => {
            handleJoinGame();
          }}
        >
          Join Game
        </button>
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