const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

// module.exports = (app) => {
//   app.use(createProxyMiddleware("/api", { target: process.env.REACT_APP_EXPRESSJS_URL }));
//   app.use(
//     createProxyMiddleware("/socket.io", { target: process.env.REACT_APP_EXPRESSJS_URL })
//   );
// };

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_EXPRESSJS_URL,
      changeOrigin: true,
    })
  );

  app.use(
    "/socket.io",
    createProxyMiddleware({
      target: process.env.REACT_APP_EXPRESSJS_URL,
      changeOrigin: true,
    })
  );
};
