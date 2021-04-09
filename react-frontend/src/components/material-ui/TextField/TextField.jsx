import React from "react";

import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const InputField = () => <input></input>;

const useStyles = makeStyles({
  root: {
    background: "rgba(51, 189, 120, 0.6)",
    color: "#FFFFFF",
    font: "30px",
    fontWeight: 900,
    borderRadius: 20,
    width: (props) => (props.widthFull === true ? "100%" : ""),
  },
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
});

export const StyledTextField = () => {
  const classes = useStyles();

  return <TextField InputProps={{ classes }}></TextField>;
};

// styles = {
//   root: {},
// };

// export const StyledTextField = withStyles(styles)(TextField);
// styled
