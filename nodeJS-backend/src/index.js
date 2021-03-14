const { response } = require("express");
const fetch = require("node-fetch");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.emit("hello", "hello world from NodeJS");

  socket.on("salutations", ({ gameCode, sessionKey }) => {
    console.log(gameCode, sessionKey);

    const rooms = io.of("/").adapter.rooms;
    console.log(rooms);

    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: "D6D06",
      }),
    };

    fetch("http://127.0.0.1:8000/api/verify-game", requestData)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  });

  io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
  });

  socket.on("init", (socket, { gameCode }) => {
    console.log("Checking room");

    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: gameCode,
      }),
    };

    fetch("http://127.0.0.1:8000/api/verify-game", requestData)
      .then((response) => {
        console.log(response);
        socket.emit("init-response", response);
      })
      .catch((error) => console.error(error));
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

PORT = 4000;

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
