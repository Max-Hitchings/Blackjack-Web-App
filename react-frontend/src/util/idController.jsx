import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function IdController() {
  const findPlayerId = () => {
    const playerId = localStorage.getItem("playerId", "test");
    if (playerId === null) {
      return createPlayerId();
    }
    return playerId;
  };

  const createPlayerId = () => {
    localStorage.setItem("playerId", uuidv4());
    return localStorage.getItem("playerId");
  };

  useEffect(() => {
    console.log("playerId:", findPlayerId());
  }, []);
  return null;
}
