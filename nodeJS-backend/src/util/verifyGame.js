const fetch = require("node-fetch");
import "dotenv/config";

export const verifyGame = () => {
  URL = "http://127.0.0.1:8000/api/verify-game";

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
};
