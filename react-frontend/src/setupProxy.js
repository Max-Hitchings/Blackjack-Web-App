const proxy = require("http-proxy-middleware");
require("dotenv").config();

module.exports = (app) => {
  app.use(proxy("/api", { target: process.env.DJANGO_PORT }));
  app.use(proxy("/socket.io", { target: process.env.SOCKETIO_PORT }));
};
