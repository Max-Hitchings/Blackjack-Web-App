import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
// import image from "./4.png";
//import images from "./images";
require("dotenv").config();

export function GamePage({ ...props }) {
  const gameCode = props.match.params.gameCode;
  const location = useLocation();
  const socket = io(process.env.EXPRESSJS_URL);

  try {
    var initHost = location.state.userHost;
    initHost = initHost === undefined || initHost === false ? false : true;
  } catch {
    window.location.replace("http://127.0.0.1:3000");
  }

  const [userHost] = useState(initHost);
  const [currentCardImage, setcurrentCardImage] = useState("./4.png");

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

    socket.on("send-card", (res) => console.log(res));

    return () => {
      socket.emit("leave-game", { gameCode: gameCode });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickupCard = async () => {
    console.log("sent");
    const queryStart = Date.now();
    await socket.emit("pickup", { gameCode: gameCode }, (res) => {
      console.log("sent", res);
      setcurrentCardImage(`/images/cards/${res.Suit}/${res.Value}.png`);
      console.log(`total query time: ${Date.now() - queryStart}`);
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
      <button onClick={pickupCard}>Pickup card</button>
      <img src={currentCardImage} alt="" width="200" height="350" />
      <div>cards: {}</div>
    </div>
  );
}
