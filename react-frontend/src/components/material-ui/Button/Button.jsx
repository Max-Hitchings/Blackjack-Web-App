// import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    background: (props) =>
      props.variant === "Secondary"
        ? "linear-gradient(-45deg, #27e7ee 10%, #35bdc2 60%)"
        : props.variant === "Red"
        ? "linear-gradient(-45deg, #f32121 10%, #bd3333 60%)"
        : "linear-gradient(-45deg, #21f38a 10%, #33bd78 60%)",
    border: 0,
    borderRadius: 20,
    boxShadow: (props) =>
      props.variant === "Secondary"
        ? "0 3px 5px 2px rgba(105, 225, 255, .3)"
        : props.variant === "Red"
        ? "0 3px 5px 2px rgba(199, 71, 71, 0.3)"
        : "0 3px 5px 2px rgba(75, 199, 71, .3)",
    color: (props) => props.textColor,
    height: 48,
    padding: (props) => `0 ${props.p}px`,
    margin: (props) => `${props.m}px`,
    fontWeight: "700",
    width: (props) => (props.fullWidth ? "100%" : ""),
  },
};

Button.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(["Primary", "Secondary", "Red"]),
  textColor: PropTypes.string,
  borderRadius: PropTypes.number,
  fontSize: PropTypes.string,
  height: PropTypes.number,
  margin: PropTypes.number,
};

Button.defaultProps = {
  p: "30",
  m: "0",
  textColor: "white",
  borderRadius: 20,
  variant: "Primary",
};

export const StyledButton = withStyles(styles)(Button);
