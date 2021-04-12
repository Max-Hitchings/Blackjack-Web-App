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
    alignItems: "center",
  },
  card: {
    backgroundColor: "transparent",
  },
  boldText: {
    fontWeight: 700,
  },
}));

export default function JoinGamePage() {
  const classes = useStyles();
  const history = useHistory();

  const [gameCode, setgameCode] = useState("");
  const [codeValid, setcodeValid] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameCode: gameCode,
        playerId: localStorage.getItem("playerId"),
      }),
    };

    const response = await fetch(
      `${process.env.EXPRESSJS_URL}/api/join-game`,
      requestData
    );
    if (response.ok) {
      history.push({
        pathname: `/game/${gameCode}`,
      });
    } else {
      setcodeValid(true);
    }
  };

  const handleGameCodeChange = (event) => {
    setgameCode(event.target.value);
  };

  useEffect(() => {
    return () => {
      console.log("bye");
    };
  }, []);

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
              <FormControl isInvalid={codeValid}>
                <FormLabel className={classes.boldText}>Game Code</FormLabel>
                <TextField
                  type="code"
                  onChange={handleGameCodeChange}
                  value={gameCode}
                  placeholder="*****"
                  maxLength="5"
                />
                {codeValid ? (
                  <FormHelperText disabled={true} error={true}>
                    Invalid Code
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <div>
                <div className={classes.buttonContainer}>
                  <StyledButton fullWidth="full" type="submit">
                    Join Game
                  </StyledButton>
                </div>
              </div>
            </form>
          </Box>
        </Card>
      </Grid>
    </>
  );
}
