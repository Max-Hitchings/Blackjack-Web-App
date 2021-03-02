import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

export default function MainMenu() {
  return (
    <div className="MainMenu-Container">
      <Button colorScheme="teal" variant="outline">
        Button
      </Button>
      <div className="MainMenu-Header">BLACKJACK</div>
      <div className="MainMenu-ButtonContainer">
        <button className="MainMenu-Button">Join Game</button>
        <button className="MainMenu-Button">Create Game</button>
      </div>
    </div>
  );
}
