import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { StyledButton } from "../material-ui/Button/Button.jsx";
import { apiBaseUrl } from "../../util/constants";
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    transform: "translateY(-75%)",
    backgroundColor: "rgba(58, 58, 58, 0.5)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
  },
  header: {
    fontWeight: 700,
    color: "#38a169",
    textShadow: "5px 5px black",
    fontSize: "45px",
    margin: "0  50px 0 50px",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    position: "relative",
    marginTop: "30px",
    marginBottom: "20px",
  },
}));

export default function MainMenu() {
  console.log(apiBaseUrl);

  const classes = useStyles();
  const history = useHistory();

  const handleCreateGame = () => {
    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId: localStorage.getItem("playerId"),
      }),
    };

    fetch(`${apiBaseUrl}/api/create-game/`, requestData)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((responseJson) => {
        console.log(responseJson);

        history.push({
          pathname: `/game/${responseJson.gameCode}`,
        });
      })
      .catch((error) => console.error(error));
  };

  const handleJoinGame = () => {
    history.push(`/join`);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.header}>BLACKJACK</div>
        <div className={classes.buttonWrapper}>
          <StyledButton
            textColor="black"
            onClick={() => {
              handleJoinGame();
            }}
          >
            JOIN GAME
          </StyledButton>
          <StyledButton
            textColor="black"
            onClick={() => {
              handleCreateGame();
            }}
          >
            CREATE GAME
          </StyledButton>
        </div>
      </Card>
    </div>
  );
}
