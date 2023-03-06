import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const MyPersonalButton = styled(Button)({
  boxShadow:
    "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
  textTransform: "none",
  width: 140,
  margin: "0 10px",
  height: 42,
  borderRadius: 20,
  fontSize: 14,
  padding: 8,
  border: "1px solid #736D4F",
  lineHeight: 1.5,
  backgroundColor: "#736D4F",
  fontFamily: '"Montserrat", sans-serif',
  "&:hover": {
    backgroundColor: "#736d4ecc",
  },
});

export default function MyButton(props) {
  return (
    <MyPersonalButton
      variant="contained"
      onClick={props.onClick && props.onClick}
      sx={{ marginBottom: props.margin.btm, marginTop: props.margin.top }}
    >
      {props.text}
    </MyPersonalButton>
  );
}
