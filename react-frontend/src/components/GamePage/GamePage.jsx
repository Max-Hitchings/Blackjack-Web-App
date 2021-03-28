import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
require("dotenv").config();
const socket = io(process.env.EXPRESSJS_URL);

export default function GamePage({ ...props }) {
  const gameCode = props.match.params.gameCode;
  const location = useLocation();

  try {
    var initHost = location.state.userHost;
    initHost = initHost === undefined || initHost === false ? false : true;
  } catch {
    window.location.replace("http://127.0.0.1:3000");
  }

  const [userHost] = useState(initHost);

  useEffect(() => {
    console.log("user is host:", userHost);
  }, [userHost]);

  useEffect(() => {
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

    return () => {
      socket.emit("leave-game", { gameCode: gameCode });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </div>
  );
}
