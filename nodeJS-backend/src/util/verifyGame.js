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
  console.log(verified.ok);
  //.then((response) => {
  //  if (response.ok) {
  //    console.log(response);
  //    return "response";
  //  } else {
  //    console.log(response);
  //    return "response";
  //  }
  //  console.log("response.ok");
  //})
  //.catch((error) => error);
  return verified.ok;
};
