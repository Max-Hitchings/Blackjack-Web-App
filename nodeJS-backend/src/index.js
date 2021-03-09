const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.emit("hello", "world");

  socket.on("salutations", ({ gameCode, sessionKey }) => {
    console.log(gameCode, sessionKey); // world
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

io.onmessage = (data) => {
  console.log(data);
};

PORT = 4000;

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
