import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { StyledButton } from "../material-ui/Button/Button.jsx";
import { apiBaseUrl } from "../../util/constants";
import ButtonGroup from "./ButtonGroup.jsx";
import { makeStyles } from "@material-ui/core/styles";

require("dotenv").config();

export function GamePage({ ...props }) {
  const gameCode = props.match.params.gameCode;
  const location = useLocation();
  const classes = useStyles();

  const socket = io(apiBaseUrl);

  const [gameState, setGameState] = useState("holding");
  const [players, setPlayers] = useState([]);
  const [activePlayer, setActivePlayer] = useState("");
  const [host, setHost] = useState(false);
  const [currentCardImage, setcurrentCardImage] = useState(
    "/images/cards/cardBack.png"
  );
  const [myPlayerId] = useState(localStorage.getItem("playerId"));
  const [myTurn, setmyTurn] = useState(true);
  const [doubleDownEnabled, setdoubleDownEnabled] = useState(true);
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

    const response = await fetch(`${apiBaseUrl}/api/verify-game`, requestData);
    if (!response.ok) {
      window.location.replace(`http://${window.location.host}`);
    }
  }, []);

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

      socket.on("updatePlayers", ({ players, hostId, activePlayerId }) => {
        console.log(
          `update players activeplayer:${activePlayerId} players:${players}`
        );
        setPlayers([...players]);
        setActivePlayer(activePlayerId);
        if (hostId === localStorage.getItem("playerId")) {
          setHost(true);
        }

        if (activePlayerId === myPlayerId) {
          setmyTurn(true);
          console.log("match");
          console.log(activePlayerId);
        } else {
          setmyTurn(false);
          console.log("no match");
          console.log(activePlayerId);
        }
      });

      socket.on("gameStarted", async () => {
        // console.log("pickup");
        // socket.emit("pickupCard", { gameCode, playerId }, (res) => {
        //   socket.emit("pickupCard", { gameCode, playerId });
        // });
        setdoubleDownEnabled(true);
        await setGameState("running");
      });

      socket.on("gameEnded", () => {
        setGameState("holding");
        setcurrentCardImage("/images/cards/cardBack.png");
      });

      socket.on("disconnected", () => {
        socket.emit("leave-game", { gameCode, playerId: myPlayerId });
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

    const res = await fetch(`${apiBaseUrl}/api/leave-game`, requestData);
    if (res.ok) {
      window.location.replace(`http://${window.location.host}`);
    }
  };

  const pickupCard = () => {
    socket.emit("pickupCard", { gameCode, playerId: myPlayerId }, (res) => {
      setcurrentCardImage(`/images/cards/${res.Suit}/${res.Value}.png`);
    });
  };

  const startGame = () => {
    console.log("start game");
    socket.emit("startGame", { gameCode, playerId: myPlayerId });
  };

  const endGame = () => {
    console.log("end game");
    socket.emit("endGame", { gameCode, playerId: myPlayerId });
  };

  const hit = () => {
    socket.emit("hit", { gameCode, myPlayerId }, (res) => {
      setdoubleDownEnabled(false);
      console.log("shusuhsds");
      console.log(doubleDownEnabled);
      console.log(myTurn);
      console.log(myTurn && doubleDownEnabled);
    });
  };

  const stand = () => {
    // socket.emit("stand", { gameCode, myPlayerId }, (res) => {
    //   socket.emit("endTurn", { gameCode, myPlayerId });
    // });
    console.log("end turn");
    socket.emit("endTurn", { gameCode, myPlayerId });
  };

  const doubleDown = () => {
    socket.emit("doubleDown", { gameCode, myPlayerId }, (res) => {});
  };

  const HoldingScreen = () => {
    return (
      <>
        <h1>holding screen</h1>
        <h1>code: {gameCode}</h1>
        {players.map((player) => (
          <h3>{player.playerNick}</h3>
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
      {host ? (
        <StyledButton onClick={() => endGame()}>END GAME</StyledButton>
      ) : null}

      <img src={currentCardImage} alt="" width="200" height="350" />
      <div style={{ marginTop: "20px" }}>
        <StyledButton variant="Red" onClick={leaveGame}>
          Leave Game
        </StyledButton>
      </div>
      <ButtonGroup
        myTurn={myTurn}
        hit={hit}
        stand={stand}
        doubleDown={doubleDown}
        doubleDownEnabled={doubleDownEnabled}
      />
      {players.map((player) => {
        return (
          <div
            className={
              player.playerId === activePlayer ? classes.activeTurn : ""
            }
          >
            <h3>{player.playerNick}</h3>
            {player.cards.map((card) => (
              <img
                src={`/images/cards/${card.Suit}/${card.Value}.png`}
                width="100"
                height="175"
              />
            ))}
          </div>
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

const useStyles = makeStyles((theme) => ({
  root: {},
  activeTurn: {
    backgroundColor: "yellow",
  },
}));
