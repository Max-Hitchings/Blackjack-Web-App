import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Box,
  Input,
  Button,
  Heading,
  useColorMode,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { BiMoon, BiSun } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import "../../css/gamePage.css";

export default function JoinGamePage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [gameCode, setgameCode] = useState("");
  const [codeValid, setcodeValid] = useState(false);
  const history = useHistory();

  console.log(codeValid);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: gameCode,
      }),
    };

    console.log(gameCode);
    fetch("/api/verify-game", requestData)
      .then((response) => {
        if (response.ok) {
          history.push(`/game/${gameCode}`);
        } else {
          setcodeValid(false);
        }
      })
      .catch((error) => console.error(error));
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
                <FormControl>
                  <FormLabel>Game Code</FormLabel>
                  <Input
                    type="code"
                    onChange={handleGameCodeChange}
                    value={gameCode}
                    placeholder="*****"
                    maxlength="5"
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
