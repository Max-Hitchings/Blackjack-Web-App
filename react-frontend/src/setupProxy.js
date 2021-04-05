const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

module.exports = (app) => {
  app.use(createProxyMiddleware("/api", { target: process.env.EXPRESSJS_URL }));
  app.use(
    createProxyMiddleware("/socket.io", { target: process.env.EXPRESSJS_URL })
  );
};
