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
  FormHelperText,
} from "@chakra-ui/react";
import { BiMoon, BiSun } from "react-icons/bi";
import { useHistory } from "react-router-dom";

export default function JoinGamePage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [gameCode, setgameCode] = useState();
  const [codeValid, setcodeValid] = useState(false);
  const history = useHistory();

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
      <Box textAlign="right" py={4} mr={12}>
        <IconButton
          colorScheme={colorMode === "light" ? "blue" : "red"}
          icon={colorMode === "light" ? <BiMoon /> : <BiSun />}
          onClick={toggleColorMode}
          variant="ghost"
        />
        <IconButton
          colorScheme={colorMode === "light" ? "blue" : "red"}
          icon={colorMode === "light" ? <BiMoon /> : <BiSun />}
          onClick={() => history.push("/")}
        />
      </Box>
      <Flex
        width="full"
        height="80vh"
        align="center"
        justifyContent="center"
        alignSelf="center"
      >
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Join Game</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleFormSubmit}>
              <FormControl isValid={codeValid}>
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
    </>
  );
}
