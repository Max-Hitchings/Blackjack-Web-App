import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { StyledButton } from "../material-ui/Button/Button.jsx";

require("dotenv").config();

export function GamePage({ ...props }) {
  const gameCode = props.match.params.gameCode;
  const location = useLocation();
  const socket = io("http://192.168.0.15:4040/");
  // const socket = io(http://127.0.0.1:4040/");

  try {
    var initHost = location.state.userHost;
    initHost = initHost === undefined || initHost === false ? false : true;
  } catch {
    window.location.replace("http://127.0.0.1:3000");
  }

  const [userHost] = useState(initHost);
  const [currentCardImage, setcurrentCardImage] = useState(
    "/images/cards/cardBack.png"
  );
  const [playerId, setplayerId] = useState();

  useEffect(() => {
    console.log("user is host:", userHost);
  }, [userHost]);

  useEffect(() => {
    console.log("connecting");
    socket.on("connect", () => {
      console.log(`
      Websocket connected!

      Connected with id: ${socket.id}
      `);

      socket.emit("join-game", { gameCode: gameCode });
      socket.on("init-response", ({ game_code }) => console.log(game_code));

      socket.on("connect_error", () => {
        setTimeout(() => {
          socket.connect();
        }, 1000);
      });
    });

    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      console.log("shushuhuhuhuh");
      return leaveGame();
    });

    return () => {
      window.removeEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        console.log("shushuhuhusss11111111111111111huh");
        return leaveGame();
      });
      console.log("leaveing");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leaveGame = () => {
    socket.emit("leave-game", { gameCode: gameCode });
  };

  const pickupCard = () => {
    socket.emit("pickupCard", { gameCode }, (res) => {
      setcurrentCardImage(`/images/cards/${res.Suit}/${res.Value}.png`);
    });
  };

  return (
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
    </div>
  );
}
