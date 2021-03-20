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

      socket.on("hello", (arg) => {
        console.log(arg); // world
      });

      // handle the event sent with socket.send()
      socket.on("message", (data) => {
        console.log(data);
      });

      // or with emit() and custom event names
    });
  }, []);

  const socketSend = () => {
    console.log("sent");
    socket.emit("salutations", { gameCode: "aaaaa", sessionKey: "bbbbb" });
  };

  return (
    <>
      <Button onClick={socketSend}>hi</Button>
    </>
  );
};
