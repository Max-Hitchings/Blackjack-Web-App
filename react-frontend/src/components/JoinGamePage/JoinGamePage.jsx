import React from "react";
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
} from "@chakra-ui/react";

import { BiMoon, BiSun } from "react-icons/bi";

export default function JoinGamePage() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box textAlign="right" py={4} mr={12}>
        <IconButton
          colorScheme={colorMode === "light" ? "blue" : "red"}
          icon={colorMode === "light" ? <BiMoon /> : <BiSun />}
          onClick={toggleColorMode}
          variant="ghost"
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
            <form>
              <FormControl>
                <FormLabel>Game Code</FormLabel>
                <Input type="code" placeholder="*****" maxlength="5" />
              </FormControl>
              <Button width="full" mt={4} isActive="true" type="submit">
                Join Game
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
