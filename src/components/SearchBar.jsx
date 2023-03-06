import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#402712",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#402712",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#402712",
    },
    "&": {
      borderRadius: "30px",
      font: "normal 400 16px/30px 'Montserrat', sans-serif",
    },
  },
});

export default function SearchBar({ onChange, value }) {
  return (
    <Box
      sx={{
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "20px",
        position: "relative",
      }}
    >
      <CssTextField
        fullWidth
        label="Search"
        id="fullWidth"
        value={value}
        onChange={onChange}
      />
      <SearchIcon className="searchIcon" />
    </Box>
  );
}
