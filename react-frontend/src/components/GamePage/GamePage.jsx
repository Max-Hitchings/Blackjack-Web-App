import React from "react";
import { useEffect } from "react";

export default function GamePage({ ...props }) {
  const gameCode = props.match.params.gameCode;

  useEffect(() => console.log(gameCode), []);

  return (
    <div>
      <div>You are in a game with the code {gameCode}</div>
    </div>
  );
}
