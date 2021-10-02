import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  FormHelperText,
  Typography,
  Card,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { StyledButton } from "../material-ui/Button/Button.jsx";
import { apiBaseUrl } from "../../util/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "absolute",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    height: "75px",
    display: "flex",
    alignItems: "flex-end",
  },
  card: {
    backgroundColor: "transparent",
  },
  boldText: {
    fontWeight: 700,
  },
  FormHelperText: { fontSize: 20 },
}));

export default function CreateGamePage() {
  const classes = useStyles();
  const history = useHistory();

  const [formValid, setformValid] = useState({
    invalid: false,
    msg: "Invalid Code",
  });
  const [playerNick, setplayerNick] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId: localStorage.getItem("playerId"),
        playerNick: playerNick,
      }),
    };

    if (playerNick !== "") {
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
    } else {
      setformValid({ invalid: true, msg: "Enter a Name" });
    }
  };

  const handlePlayerNickChange = (event) => {
    setplayerNick(event.target.value);
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Card className={classes.card} raised={false}>
          <Box textAlign="center">
            <Typography
              variant="h5"
              component="h1"
              className={classes.boldText}
            >
              Join Game
            </Typography>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleFormSubmit}>
              <FormControl isInvalid={formValid.invalid}>
                <FormLabel className={classes.boldText}>Name</FormLabel>
                <TextField
                  onChange={handlePlayerNickChange}
                  value={playerNick}
                  placeholder="john doe"
                  maxLength="10"
                  style={{ marginBottom: "10px" }}
                />

                {formValid.invalid ? (
                  <FormHelperText
                    disabled={true}
                    error={true}
                    className={classes.FormHelperText}
                  >
                    {formValid.msg}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <div>
                <div className={classes.buttonContainer}>
                  <StyledButton fullWidth="full" type="submit">
                    Create Game
                  </StyledButton>
                </div>
                <StyledButton
                  fullWidth="full"
                  variant="Red"
                  height={35}
                  marginTop="5"
                  href="/"
                >
                  Back
                </StyledButton>
              </div>
            </form>
          </Box>
        </Card>
      </Grid>
    </>
  );
}
