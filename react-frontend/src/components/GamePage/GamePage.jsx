import React from "react";
import { useEffect } from "react";
//import { useHistory } from "react-router-dom";
import io from "socket.io-client";
require("dotenv").config();
const socket = io(process.env.SOCKETIO_PORT);

export default function GamePage({ ...props }) {
  const gameCode = props.match.params.gameCode;
  //const history = useHistory();
  useEffect(() => {
    console.log(props);
    return () => {
      console.log("bye");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`
      Websocket connected!

      Connected with id: ${socket.id}
      `);

      socket.on("connect_error", () => {
        setTimeout(() => {
          socket.connect();
        }, 1000);
      });
    });
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
