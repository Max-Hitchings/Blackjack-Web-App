import React from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Box,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";

export default function JoinGamePage() {
  return (
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
            <Button width="full" mt={4} type="submit">
              Join Game
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
