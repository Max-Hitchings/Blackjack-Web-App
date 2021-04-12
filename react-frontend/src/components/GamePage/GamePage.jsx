import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { StyledButton } from "../material-ui/Button/Button.jsx";

require("dotenv").config();

export function GamePage({ ...props }) {
  const gameCode = props.match.params.gameCode;
  const location = useLocation();

  const EXPRESSJS_URL = process.env.EXPRESSJS_URL || "http://localhost:6001/";
  const socket = io(EXPRESSJS_URL);

  const [gameState, setGameState] = useState("holding");
  const [players, setPlayers] = useState([]);
  const [host, setHost] = useState(false);
  // const socket = io(http://127.0.0.1:4040/");

  const checkHost = () => {};

  useEffect(async () => {
    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId: localStorage.getItem("playerId"),
        gameCode: gameCode,
      }),
    };

    const response = await fetch("/api/verify-game", requestData);
    if (!response.ok) {
      window.location.replace(`http://${window.location.host}`);
    }
  }, []);

  const [currentCardImage, setcurrentCardImage] = useState(
    "/images/cards/cardBack.png"
  );
  const [playerId, setplayerId] = useState(localStorage.getItem("playerId"));

  useEffect(() => {
    console.log(host);
  }, [host]);

  useEffect(() => {
    console.log("connecting");
    socket.on("connect", () => {
      console.log(`
      Websocket connected!

      Connected with id: ${socket.id}
      `);

      socket.emit("joinGame", { gameCode });

      socket.on("updatePlayers", ({ players, hostId }) => {
        setPlayers([...players]);
        if (hostId === localStorage.getItem("playerId")) {
          setHost(true);
        }
      });

      socket.on("gameStarted", () => {
        setGameState("running");
      });

      socket.on("disconnected", () => {
        socket.emit("leave-game", { gameCode, playerId });
      });

      socket.on("connect_error", () => {
        setTimeout(() => {
          socket.connect();
        }, 1000);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leaveGame = async () => {
    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId: localStorage.getItem("playerId"),
        gameCode: gameCode,
      }),
    };

    const res = await fetch("/api/leave-game", requestData);
    if (res.ok) {
      window.location.replace(`http://${window.location.host}`);
    }
  };

  const pickupCard = () => {
    socket.emit("pickupCard", { gameCode, playerId }, (res) => {
      setcurrentCardImage(`/images/cards/${res.Suit}/${res.Value}.png`);
    });
  };

  const startGame = () => {
    console.log("start game");
    socket.emit("startGame", { gameCode });
  };

  const HoldingScreen = () => {
    return (
      <>
        <h1>holding screen</h1>
        <h1>code: {gameCode}</h1>
        {players.map((player) => (
          <h3>{player.playerId}</h3>
        ))}
        {host ? (
          <StyledButton onClick={startGame}>Start Game</StyledButton>
        ) : (
          ""
        )}
        <StyledButton variant="Red" onClick={leaveGame}>
          Leave Game
        </StyledButton>
      </>
    );
  };

  const Game = () => (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "50px",
          fontWeight: "bold",
        }}
      >
        You are in a game with the code {gameCode}
      </div>
      <StyledButton onClick={pickupCard}>Pickup card</StyledButton>

      <img src={currentCardImage} alt="" width="200" height="350" />
      <div style={{ marginTop: "20px" }}>
        <StyledButton variant="Red" onClick={leaveGame}>
          Leave Game
        </StyledButton>
      </div>
      {players.map((player) => {
        return (
          <>
            <h3>{player.playerId}</h3>
            {player.cards.map((card) => (
              <img
                src={`/images/cards/${card.Suit}/${card.Value}.png`}
                width="100"
                height="175"
              />
            ))}
          </>
        );
      })}
    </div>
  );

  return gameState === "holding" ? (
    <HoldingScreen />
  ) : gameState === "running" ? (
    <Game />
  ) : null;
}
