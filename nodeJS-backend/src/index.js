const { verifyGame } = require("./util/verifyGame");
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

  socket.join("some room");

  socket.on("join-game", ({ gameCode, userHost }) => {
    console.log({ gameCode, userHost });
  });

  socket.on("test", ({ payload }) => {
    console.log(payload);
  });
  /*
  socket.on("salutations", ({ gameCode, sessionKey }) => {
    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: "D77E9",
      }),
    };

    fetch("http://127.0.0.1:8000/api/verify-game", requestData)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  });

  socket.on("init", (socket, payload) => {
    console.log("Checking room");

    if (typeof payload.gameCode === "undefined") {
      console.log("has property");
    } else {
      console.log("undifined");
    }
    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: gameCode,
      }),
    };

    fetch("http://127.0.0.1:8000/api/verify-game", requestData)
      .then((response) => {
        //console.log(response);
        socket.emit("init-response", response);
      })
      .catch((error) => console.error(error));
  });
  */

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

const PORT = 4040;

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
