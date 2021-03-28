import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Box,
  Input,
  Button,
  Heading,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import "../../css/gamePage.css";

export default function JoinGamePage() {
  const [gameCode, setgameCode] = useState("");
  const [codeValid, setcodeValid] = useState(false);
  const history = useHistory();

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
      <div className="pokerBackground joinGamePage-Background">
        <Flex
          width="full"
          height="100vh"
          justifyContent="center"
          alignSelf="center"
        >
          <Box
            style={{
              position: "absolute",
              top: "225px",
            }}
          >
            <Box textAlign="center">
              <Heading>Join Game</Heading>
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
                  <FormErrorMessage>Invalid Code </FormErrorMessage>
                </FormControl>
                <Button width="full" mt={4} type="submit">
                  Join Game
                </Button>
              </form>
            </Box>
          </Box>
        </Flex>
      </div>
    </>
  );
}
