import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    custom: {
      main: "#736D4F",
      contrastText: "#fff",
    },
  },
});

export default function PaginationBar(props) {
  const { onChange, currentPage, totalPages } = props;

  function handleChange(e, value) {
    window.scroll({
      top: 600,
      behavior: "smooth",
    });
    setTimeout(() => {
      onChange(value);
    }, 500);
  }
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Pagination
          count={totalPages || 10}
          page={currentPage || 1}
          onChange={handleChange}
          size="small"
          color="custom"
          showFirstButton
          showLastButton
          siblingCount={0}
        />
      </Stack>
    </ThemeProvider>
  );
}
