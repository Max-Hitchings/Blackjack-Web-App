import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:4040");

export const Websocket = () => {
  useEffect(() => {
    socket.on("new-remote-operations", ({ editorId, ops }) => {
      console.log("Socket connected");
    });
  }, []);

  return <div>hi</div>;
};
