require("dotenv").config();
const fetch = require("node-fetch");

export const verifyGame = async (gameCode) => {
  const DJANGO_URL = process.env.DJANGO_URL || "http://127.0.0.1:8000";

  const requestData = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: gameCode,
    }),
  };

  let verified = await fetch(`${DJANGO_URL + "/api/verify-game"}`, requestData);
  return verified.ok;
};
