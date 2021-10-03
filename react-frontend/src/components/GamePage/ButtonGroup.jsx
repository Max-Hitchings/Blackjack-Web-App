import React from "react";
import { StyledButton } from "../material-ui/Button/Button.jsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  ButtonGroup: {
    position: "absolute",
    bottom: 100,
    right: 100,
    display: "flex",
    height: "300px",
    width: "300px",
  },
  LeftSide: {
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  RightSide: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  roundButton: {
    height: "110px",
    width: "110px",
    fontWeight: 400,
    borderRadius: "100px",
    // background: "linear-gradient(-45deg, #21f38a 10%, #33bd78 60%)",
    // fontSize: "30px",
    color: "black",
    fontFamily: "'Black And White Picture', sans-serif",
    lineHeight: 1,
  },
}));

export default function ButtonGroup({
  myTurn,
  hit,
  stand,
  doubleDown,
  doubleDownEnabled,
}) {
  const classes = useStyles();

  var doubleDownEnabledCalc = true;
  // if (!myTurn) {
  //   console.log("okay bud");
  // }
  // if (!doubleDownEnabled) {
  //   if (!myTurn) {
  //     doubleDownEnabledCalc = true;
  //   }
  // }

  return (
    <div className={classes.ButtonGroup}>
      <div className={classes.LeftSide}>
        <StyledButton
          className={classes.roundButton}
          p={0}
          variant="Secondary"
          fontSize="70px"
          disabled={!myTurn}
          onClick={hit}
        >
          HIT
        </StyledButton>
      </div>
      <div className={classes.RightSide}>
        <StyledButton
          className={classes.roundButton}
          p={0}
          variant="Red"
          fontSize="35px"
          disabled={!doubleDownEnabledCalc}
          onClick={doubleDown}
        >
          Double Down
        </StyledButton>
        <StyledButton
          className={classes.roundButton}
          p={0}
          fontSize="45px"
          disabled={!myTurn}
          onClick={stand}
        >
          Stand
        </StyledButton>
      </div>
    </div>
  );
}
