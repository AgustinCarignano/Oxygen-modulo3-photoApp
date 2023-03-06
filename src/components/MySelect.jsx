import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#402712",
      contrastText: "#fff",
    },
  },
});

export default function MySelect({ optionValue, onChange }) {
  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
        <InputLabel id="inputSelect">Oder by</InputLabel>
        <Select
          labelId="inputSelect"
          id="inputSelect"
          value={optionValue}
          label="Order by"
          onChange={(e) => onChange(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"dateAdded"}>Date</MenuItem>
          <MenuItem value={"width"}>Width</MenuItem>
          <MenuItem value={"height"}>Height</MenuItem>
          <MenuItem value={"likes"}>Likes</MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}
