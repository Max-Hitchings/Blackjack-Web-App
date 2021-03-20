import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//import { useEffect } from "react";
//import { useHistory } from "react-router-dom";
import io from "socket.io-client";
require("dotenv").config();
const socket = io(process.env.SOCKETIO_PORT);

export default function GamePage({ ...props }) {
  const gameCode = props.match.params.gameCode;
  const location = useLocation();

  let initHost = location.state.userHost;
  initHost = initHost === undefined || initHost === false ? false : true;

  const [userHost] = useState(initHost);
  //const history = useHistory();
  useEffect(() => {
    console.log("user is host:", userHost);
  }, [userHost]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`
      Websocket connected!

      Connected with id: ${socket.id}
      `);

      socket.emit("init", { gameCode: userHost });
      socket.on("init-response", ({ game_code }) => console.log(game_code));

      socket.on("connect_error", () => {
        setTimeout(() => {
          socket.connect();
        }, 1000);
      });
    });
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
