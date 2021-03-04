import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function GamePage({ ...props }) {
  const gameCode = props.match.params.gameCode;
  const history = useHistory();

  useEffect(() => {
    console.log("sent");

    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: gameCode,
      }),
    };

    fetch("/api/verify-game", requestData)
      .then((response) => {
        console.log(response);
        if (response.status !== 200) {
          alert("Sorry game no longer exists :(");
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [gameCode, history]);

  return (
    <div>
      <div>You are in a game with the code {gameCode}</div>
    </div>
  );
}
