import React, { useEffect } from "react";
import io from "socket.io-client";
import { Button } from "@chakra-ui/react";
const socket = io("http://localhost:4040");

export const Websocket = () => {
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

      return () => {};
    });
  }, []);

  const socketSend = () => {
    console.log("sent");
    //socket.emit("salutations", { gameCode: "aaaaa", sessionKey: "bbbbb" });
    socket.emit(
      "join-game",
      { gameCode: "27D3C", userHost: true },
      (response) => {
        console.log(response.status);
      }
    );
  };

  const leaveGame = () => {
    socket.emit("leave-game", { gameCode: "27D3C" });
  };
  return (
    <>
      <Button onClick={socketSend}>hi</Button>
      <Button onClick={leaveGame}>Leave</Button>
    </>
  );
};
