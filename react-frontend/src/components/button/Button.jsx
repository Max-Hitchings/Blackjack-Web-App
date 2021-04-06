import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const useStyles = {
  root: {
    background: (props) =>
      props.color === "red"
        ? "linear-gradient(45deg, #FE6B8B 10%, #FF8E53 60%)"
        : "linear-gradient(45deg, #2196F3 10%, #21CBF3 60%)",
    border: 0,
    borderRadius: 3,
    boxShadow: (props) =>
      props.color === "red"
        ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
        : "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: (props) => props.textColor,
    height: 48,
    padding: (props) => `0 ${props.p}px`,
    margin: (props) => `${props.m}px`,
    "&:hover": {
      background: (props) =>
        props.color === "red"
          ? "linear-gradient(45deg, #FE6B8B 50%, #FF8E53 90%)"
          : "linear-gradient(45deg, #2196F3 50%, #21CBF3 90%)",
    },
    transition: "background 3s ease-out 1000ms",
  },
};

export function MyBaseComponent(props) {
  const { classes, color, ...other } = props;
  return <button className={classes.root} {...other} />;
}

MyBaseComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["blue", "red"]).isRequired,
};

MyBaseComponent.defaultProps = {
  textColor: "white",
  p: "30",
  m: "0",
  hoverColor: "red",
};

export const StyledButton = withStyles(useStyles)(MyBaseComponent);
