import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Typography,
  Card,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { StyledButton } from "../button/Button.jsx";

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
      }),
    };

    const response = await fetch("/api/verify-game", requestData);
    if (response.ok) {
      history.push({
        pathname: `/game/${gameCode}`,
        state: { userHost: false },
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
            <Typography>Join Game</Typography>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleFormSubmit}>
              <FormControl isInvalid={codeValid}>
                <FormLabel>Game Code</FormLabel>
                <Input
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
